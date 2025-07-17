import {analizeText} from "../services/fetch.js";
import { processKeyValues } from "./ProcessKeyValues.js";

export const callAnalizeText=()=>{
    let text = document.getElementById("inpText").value;
    analizeText(text, processKeyValues);
}