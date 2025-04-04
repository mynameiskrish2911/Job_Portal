import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyjob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";

const router=express.Router();


router.route("/apply/:id").get(isAuthenticated,applyjob);
//for user
router.route("/get").get(isAuthenticated,getAppliedJobs);
//for admin
router.route("/:id/applicants").get(isAuthenticated,getApplicants);
router.route("/status/:id/update").post(isAuthenticated,updateStatus);
export default router;