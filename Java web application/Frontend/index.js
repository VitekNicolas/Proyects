import { FormForTextAnalyzed } from "./component/FormForTextAnalyzed.js";
import { InscriptionForm } from "./component/InscriptionForm.js";
import { callAnalizeText } from "./functions/AnalizeText.js";
import { submitClient } from "./functions/SubmitClient.js";
import { submitResult } from "./functions/SubmitResulst.js";

const divInscription=document.querySelector(".divInscription");
const divResult=document.querySelector(".divResult");

window.submitResult=submitResult;

document.addEventListener("DOMContentLoaded", function () {
  InscriptionForm.addForm(divInscription);
  document.querySelector("#btnSubmit").addEventListener("click",(event) => {
    event.preventDefault();
    submitClient();
    InscriptionForm.callDisableFormElements(1);
  });
  document.querySelector("#btnAnalize").addEventListener("click",(event) => {
    event.preventDefault();
    FormForTextAnalyzed.addForm(divResult);
    callAnalizeText()
    InscriptionForm.callDisableFormElements(2);
  });
});