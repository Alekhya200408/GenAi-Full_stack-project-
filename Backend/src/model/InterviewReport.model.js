import {mongoose,Schema} from "mongoose";

/* 
*job description schema:String
*Resume text:String 
*Self description:String
*
* MatchScore:Number
* Technical Questions:[]
* Behavbioral Questions:[]
* Skill gaps:[]
* preparation plans:[{},{}]
* 
*/

const TechnicalQuestionScheema=new Schema({
    question:{
        type:String,
        required:[true,"Technical Question is Required"]
    },
    intention:{
        type:String,
        required:[true,"Intention is Required"]
    },
    answer:{
       type:String,
        required:[true,"answer is Required"] 
    }
},{
    _id:false
})
const BehavioralQuestionScheema=new Schema({
    question:{
        type:String,
        required:[true,"Technical Question is Required"]
    },
    intention:{
        type:String,
        required:[true,"Intention is Required"]
    },
    answer:{
       type:String,
        required:[true,"answer is Required"] 
    }
},{
    _id:false
})

const SkillGapSchema=new Schema({
    skill:{
        type:String,
        required:[true,"Skill is required"]
    },
    severity:{
        type:String,
        enum:['low','medium','high'],
        required:[true,"Severity is Required"]
    }
},{
    _id:false
})

const PreparationPlanSchema=new Schema({
    day:{
        type:Number,
        required:[true,"day is required"]
    },
    focus:{
        type:String,
        required:[true,'focus is required']
    },
    tasks:{
        type:String,
        required:[true,"Task is required"]
    }
})

const InterviewReportSchema=new Schema({
    JobDescription:{
        type:String,
        required:[true,"Job Description is Required"]
    },
    Resume:{
        type:String
    },
    SelfDescription:{
        type:String
    },

    MatchScore:{
        type:Number,
        min:0,
        max:100
    },
    technicalQuestions:[TechnicalQuestionScheema],
    behavioralQuestions:[BehavioralQuestionScheema],
    skillgaps:[SkillGapSchema],
    preparationplan:[PreparationPlanSchema]
},{
    timestamps:true
})


const InterviewReportModel=mongoose.model('Interview',InterviewReportSchema)

export default InterviewReportModel

