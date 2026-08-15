import { analizeText } from "../services/fetch.js";
import { processKeyValues } from "./ProcessKeyValues.js";

export const callAnalizeText = async () => {
    let text = document.getElementById("inpText").value;
    await analizeText(text, processKeyValues);
}