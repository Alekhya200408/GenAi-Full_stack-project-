import { PDFParse } from "pdf-parse"
import generateInterviewReport from '../services/ai.services.js'
import InterviewReportModel from "../model/InterviewReport.model.js"

const generateInterviewreportController=async (req,res) => {
    
    const ResumeContent= await (new PDFParse(Uint8Array.from(req.file.buffer))).getText()


    const {JobDescription,SelfDescription}=req.body

    const interviewReportByAI=await generateInterviewReport({
        resume:ResumeContent.text,
        SelfDescription,
        JobDescription
    })

    const interviewReport=await InterviewReportModel.create({
        user:req.user.id,
        resume:ResumeContent.text,
        SelfDescription,
        JobDescription,
        ...interviewReportByAI
    })

    res.status(201).json({
        message:"Interview report Generated Successfully",
        interviewReport
    })
}


export default {generateInterviewreportController}