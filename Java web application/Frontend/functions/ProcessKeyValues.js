import { SaveKeyValues } from "../component/SaveKeyValues.js";
import { PrintKeyValues } from "../component/printKeyValues.js";
import { translateKeyValues } from "../component/translateKeyValues.js"

export const processKeyValues=(json)=>{
    let translator=new translateKeyValues(json);
    let translatedValues = translator.getTranslatedValues();  
    let container = document.getElementById("txtResult");
    SaveKeyValues.execute(translatedValues);
    PrintKeyValues.execute(translatedValues, container);
}