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

    if (survey.length > 0)
      fs.readFile(
        "./data/surveys/" + req.params.sid + ".json",
        "utf-8",
        (err, data) => {
          if (err) {
            throw err;
          }
          res.json({
            metadata: survey[0],
            data: JSON.parse(data),
          });
        }
      );
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const newSurvey = async (req, res) => {
  // console.log("H");
  try {
    // console.log("here");
    const date = new Date();
    const surveys = await Survey.findAll();
    console.log(surveys);
    const sid = req.session.user.UID + "_S" + (surveys.length + 1);
    console.log("SID ", sid);
    const metadata = req.body.metadata;
    await Survey.create({
      SID: sid,
      Creator: metadata.uid,
      Title: req.body.data[0].title.text,
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
      UpdatedAt:
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
      OpenFrom: metadata.openFrom,
      OpenTill: metadata.openTill,
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
    throw error;
  }
};

export const editSurvey = async (req, res) => {
  try {
    // console.log("here");
    const date = new Date();
    // console.log(req.body);
    const metadata = req.body.metadata;
    const sid = metadata.sid;
    await Survey.update(
      {
        Title: req.body.data[0].title.text,
        UpdatedAt:
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
        OpenFrom: metadata.openFrom,
        OpenTill: metadata.openTill,
      },
      {
        where: {
          SID: sid,
        },
      }
    );

    // write json file to disk
    const data = JSON.stringify(req.body.data);
    fs.writeFile("./data/surveys/" + sid + ".json", data, (err) => {
      if (err) {
        res.json(err);
        throw err;
      }
    });

    // TODO: Send Link
    res.json({
      message: "Survey Updated",
      SID: sid,
    });
  } catch (error) {
    res.json({ message: error.message, error: error, req_data: req.data });
  }
};
