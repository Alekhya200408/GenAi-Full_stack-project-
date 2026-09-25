import "dotenv/config";
import {GoogleGenAI} from "@google/genai"

console.log("GEMINI KEY:", process.env.GOOGLE_GENAI_API_KEY);

const ai=new GoogleGenAI({
    apiKey:process.env.GOOGLE_GENAI_API_KEY
})

const invokeGeminiAI=async () => {
    const response=await ai.models.generateContent({
        model:"gemini-3.6-flash",
        contents:"Hello Gemini!Explain What is Interview"
    })

    console.log(response.text);
    
}

export default invokeGeminiAI