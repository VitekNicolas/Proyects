import { registerClient } from "../services/fetch.js"

export const submitClient=()=>{
    let name=document.getElementById("inpName").value;
    let lastName=document.getElementById("inpLastName").value;
    let userName=document.getElementById("userName").value;
    let city=document.getElementById("inpCity").value;
    let state=document.getElementById("inpState").value;
    let zipCode=document.getElementById("inpZipCode").value;
    registerClient(name,lastName,userName,city,state,zipCode);
}