import Response from "../models/responseModel.js";
import fs from 'fs'


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

    fs.readFile(
      "./data/responses/" + req.params.rid + ".json",
      "utf-8",
      (err, data) => {
        if (err) {
          throw err;
        }
        res.json({
          metadata: survey[0],
          data: data,
        });
      }
    );

    res.json(response[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const newResponse = async (req, res) => {
  try {
    const rid = "R" + Object.keys(Response.findAll()).length + 1;
    const date = new Date();
    await Response.create({
      RID: rid,
      Respondant: req.body.uid,
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
      SID: req.body.sid,
    });

    const data = JSON.stringify(req.body.data);
    fs.writeFile("./data/responses/" + rid + ".json", data, (err) => {
      if (err) {
        throw err;
      }
    });

    res.json({ message: "Response recorded" });
  } catch (error) {
    res.json({ message: error.message });
  }
};
