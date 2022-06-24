import express from "express";
import { getAllResponses, getResponseByRID, getResponsesBySID, newResponse } from "../controllers/Response.js";
import {
  getAllSurveys,
  getSurveyBySID,
  getSurveysByUID,
  newSurvey
} from "../controllers/Survey.js";
import { getUserByUID, newUser } from "../controllers/User.js";
const router = express.Router();
router.get('/surveys/', getAllSurveys);
router.get('/surveys/:uid', getSurveysByUID);
router.get('/survey/:sid', getSurveyBySID);
router.post('survey/create', newSurvey);
router.get('responses', getAllResponses);
router.get('responses/:sid', getResponsesBySID);
router.get('response/:rid', getResponseByRID);
router.post('response, newResponse', newResponse);
router.get('user/:uid', getUserByUID);
router.post('user', newUser);
router.post('login')
// router.patch('/:id', updateProduct);
// router.delete('/:id', deleteProduct);
export default router;