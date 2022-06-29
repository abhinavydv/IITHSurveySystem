import Survey from "../models/surveyModel.js";
import fs from "fs";

// export const getAllSurveys = async (req, res) => {
//   try {
//     const surveys = await Survey.findAll();
//     res.json(surveys);
//   } catch (error) {
//     res.json({ message: error.message });
//   }
// };

export const getAllSurveys = async (req, res) => {
  try {
    // console.log(req.session.user);
    const survey = await Survey.findAll({
      where: {
        Creator: req.session.user.UID,
      },
    });
    res.json(survey);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getSurveyBySID = async (req, res) => {
  try {
    const survey = await Survey.findAll({
      where: {
        SID: req.params.sid,
      },
    });

    fs.readFile(
      "./data/surveys/" + req.params.sid + ".json",
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
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const newSurvey = async (req, res) => {
  try {
    const date = new Date();
    const sid = "S" + Object.keys(Survey.findAll()).length + 1;
    await Survey.create({
      SID: sid,
      Creator: req.body.uid,
      CreatedAt:
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
      OpenTill: req.body.openTill,
    });

    // write json file to disk
    const data = JSON.stringify(req.body.data);
    fs.writeFile("./data/surveys/" + sid + ".json", data, (err) => {
      if (err) {
        throw err;
      }
    });

    // TODO: Send Link
    res.json({
      message: "Survey Created",
      SID: sid,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
