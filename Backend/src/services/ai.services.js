import "dotenv/config";
import { GoogleGenAI } from "@google/genai"
import * as z from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

// console.log("GEMINI KEY:", process.env.GOOGLE_GENAI_API_KEY);

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

const interviewReportSchema = z.object({
    matchScore: z.number()
    .int()
    .min(0)
    .max(100)
    .describe(
        "Calculate the candidate's match percentage for the job. " +
        "The candidate has strong matches including JavaScript, HTML, CSS, React.js, " +
        "Node.js, Express.js, MongoDB, REST APIs, JWT authentication, Git and GitHub. " +
        "The job is a Full Stack Developer role. " +
        "Return a realistic integer percentage between 1 and 100. " +
        "Do not return 0 when the candidate has relevant skills."
    ),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum(["low", "medium", "high"]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated"),
})

const generateInterviewReport = async (Resume, SelfDescription, JobDescription) => {

    const prompt = `Generate an interview report for a candidate.

Candidate Resume:
${Resume}

Candidate Self Description:
${SelfDescription}

Job Description:
${JobDescription}

Instructions:
- Analyze the candidate's resume and self-description against the job description.
- Calculate matchScore as an integer from 0 to 100.
- The matchScore must represent how well the candidate's skills, experience, education and projects match the job requirements.
- Consider both required skills and good-to-have skills.
- A candidate who matches most of the required skills should receive a correspondingly high score.
- Do not automatically give a score of 0 unless the candidate has essentially no relevant match.
- Identify realistic skill gaps based on the job requirements.
- Generate relevant technical and behavioral interview questions.
- Generate a practical day-wise preparation plan.
`;
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3.1-flash-lite",
            contents: prompt,
            config: {

                responseMimeType: "application/json",
                responseSchema: zodToJsonSchema(interviewReportSchema)

            }
        })

    //     console.log("RAW GEMINI TEXT:");
    // console.log(response.text);


        const report = JSON.parse(response.text);

    // console.log("===== GEMINI RESPONSE =====");
    // console.log(report);
    // console.log("GEMINI MATCH SCORE:", report.matchScore);

    return report;


    } catch (error) {
        if (error.status === 503) {
            console.log("Gemini is temporarily busy. Please try again.");
            return null;
        }

        console.error("Gemini API error:", error);
        return null;
    }

}

// const invokeGeminiAI=async () => {
//     const response=await ai.models.generateContent({
//         model:"gemini-3.6-flash",
//         contents:"Hello Gemini!Explain What is Interview"
//     })

//     console.log(response.text); 
// }

export default generateInterviewReport