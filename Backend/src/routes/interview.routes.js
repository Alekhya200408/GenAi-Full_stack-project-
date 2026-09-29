import express, { Router } from 'express'
import authMiddleware from '../middleware/auth.middleware.js'
import interviewControllers from '../controllers/interview.controllers.js'
import upload from '../middleware/file.middleware.js'



const InterviewRouter=Router()

InterviewRouter.post('/',authMiddleware.authUser,upload.single('resume'),interviewControllers.generateInterviewreportController)


export default InterviewRouter

