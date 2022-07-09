import Survey from "../models/surveyModel.js";
import fs from "fs";
import Response from "../models/responseModel.js";

export const generateSummary = async (sid) => {
  const surveyMeta = await Survey.findOne({ where: { SID: sid } });
  if (surveyMeta == null)
    return {
      success: false,
      message: "No survey with SID '" + sid + "' found",
    };
  const responses = await Response.findAll({ where: { SID: sid } });
  if (responses == null)
    return {
      success: false,
      message: "No responses with SID '" + sid + "' found",
    };

  var survey = [];

  fs.readFile("./data/surveys/" + sid + ".json", "utf-8", (err, data) => {
    if (err) {
      throw err;
    }
    survey = JSON.parse(data);
    // console.log(survey);

    const summary = JSON.parse(JSON.stringify(survey));

    summary.forEach((qn) => {
      if (
        qn.type == "MultipleChoiceSingleCorrect" ||
        qn.type == "MultipleChoiceMultipleCorrect"
      ) {
        qn.options.forEach((op) => {
          op.count = 0;
        });
      } else if (qn.type == "Rating") {
        qn.averageRating = 0;
      }
    });

    var response = [];

    const num = responses.length;
    responses.forEach((r, k) => {
      fs.readFile(
        "./data/responses/" + r.RID + ".json",
        "utf-8",
        (err, data) => {
          if (err) {
            throw err;
          }
          response = JSON.parse(data);

          response.forEach((s, i) => {
            if (s.type == "MultipleChoiceSingleCorrect") {
              s.options.forEach((o, j) => {
                if (o.oid == s.chosen) {
                  summary[i].options[j].count++;
                }
              });
              // console.log(summary[i].options);
            } else if (s.type == "MultipleChoiceMultipleCorrect") {
              s.options.forEach((o, j) => {
                if (o.checked) {
                  summary[i].options[j].count++;
                }
              });
              // console.log(s.options, s.chosen);
            } else if (s.type == "Rating") {
              summary[i].averageRating += s.rating / num;
              // console.log(summary[i]);
            }
          });
          if (k == num - 1) {
            fs.writeFile(
              "./data/summaries/" + sid + ".json",
              JSON.stringify(summary),
              (err) => {
                if (err) {
                  throw err;
                }
              }
            );
          }
        }
      );
    });
  });
};

export const getSummary = async (req, res) => {
  if (req.session.user) {
    fs.readFile(
      "./data/summaries/" + req.params.sid + ".json",
      "utf-8",
      (err, data) => {
        if (err) {
          res.json({
            success: false,
            message: "No summary found!",
            err: err,
          });
        } else {
          res.json({
            data: JSON.parse(data),
            success: true,
          });
        }
      }
    );
  } else {
    res.json({ error: "User not logged in!" });
  }
};
