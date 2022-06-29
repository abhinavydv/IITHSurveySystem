import express from "express";
import {
  getAllResponses,
  getResponseByRID,
  getResponsesBySID,
  newResponse,
} from "../controllers/Response.js";
import {
  getAllSurveys,
  getSurveyBySID,
  newSurvey,
} from "../controllers/Survey.js";
import {
  newUser,
  getLoggedInUser,
  loginUser,
  logoutUser,
} from "../controllers/User.js";
const router = express.Router();
router.get("/surveys/", getAllSurveys);
// router.get("/surveys/:uid", getSurveysByUID);
router.get("/survey/:sid", getSurveyBySID);
router.post("/survey/create", newSurvey);
router.get("/responses", getAllResponses);
router.get("/responses/:sid", getResponsesBySID);
router.get("/response/:rid", getResponseByRID);
router.post("/response", newResponse);
router.post("/register", newUser);
router.get("/login", getLoggedInUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
export default router;
