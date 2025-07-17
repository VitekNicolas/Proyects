import { registerResult } from "../services/fetch.js";

export const submitResult=()=>{
    let translatedValues = JSON.parse(localStorage.getItem("valores"))
    let score_tag=translatedValues.score_tag;
    let irony=translatedValues.irony;
    let subjectivity=translatedValues.subjectivity;
    let agreement=translatedValues.agreement;
    let confidence=translatedValues.confidence;
    let userName=document.querySelector("#userName").value;
    registerResult(userName,score_tag,irony,subjectivity,agreement,confidence);
}