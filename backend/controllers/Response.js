import Response from "../models/responseModel.js";
import fs from "fs";
import { generateSummary } from "./Summary.js";

export const getAllResponses = async (req, res) => {
  try {
    const responses = await Response.findAll();
    res.json(responses);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getResponsesBySID = async (req, res) => {
  try {
    const responses = await Response.findAll({
      where: {
        SID: req.params.sid,
      },
    });
    res.json(responses);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getResponseByRID = async (req, res) => {
  try {
    const response = await Response.findAll({
      where: {
        RID: req.params.rid,
      },
    });

    if (response.length > 0)
      fs.readFile(
        "./data/responses/" + req.params.rid + ".json",
        "utf-8",
        (err, data) => {
          if (err) {
            throw err;
          }
          res.json({
            metadata: response[0],
            data: JSON.parse(data),
          });
        }
      );

    // res.json(response[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const newResponse = async (req, res) => {
  try {
    // console.log("called newResponse");
    // const rid = req.session.user.UID +  "R" + Object.keys(Response.findAll()).length + 1;
    const rid = req.body.metadata.uid + "_" + req.body.metadata.sid;
    const date = new Date();
    if (
      (await Response.findOne({
        where: {
          RID: rid,
        },
      })) == null
    ) {
      await Response.create({
        RID: rid,
        Respondant: req.body.metadata.uid,
        RespondedAt:
          date.getFullYear() +
          "-" +
          date.getMonth() +
          "-" +
          date.getDate() +
          " " +
          date.getHours() +
          ":" +
          date.getMinutes() +
          ":" +
          date.getSeconds(),
        SID: req.body.metadata.sid,
      });
    } else {
      await Response.update(
        {
          RID: rid,
          Respondant: req.body.metadata.uid,
          RespondedAt:
            date.getFullYear() +
            "-" +
            date.getMonth() +
            "-" +
            date.getDate() +
            " " +
            date.getHours() +
            ":" +
            date.getMinutes() +
            ":" +
            date.getSeconds(),
          SID: req.body.metadata.sid,
        },
        {
          where: {
            RID: rid,
          },
        }
      );
    }

    const data = JSON.stringify(req.body.response);
    fs.writeFile("./data/responses/" + rid + ".json", data, (err) => {
      if (err) {
        throw err;
      }
    });

    await generateSummary(req.body.metadata.sid);

    res.json({ message: "Response recorded" });
  } catch (error) {
    res.json({ message: error.message });
  }
};
