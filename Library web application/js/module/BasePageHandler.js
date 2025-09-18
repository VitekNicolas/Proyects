import { LocalStorageHandler } from "../component/LocalStorageHandler.js";
import { Render } from "./Render.js";
export class BasePageHandler {

    constructor() {
        this.aside = document.querySelector(".aside");
        this.divFilterContainer = document.querySelector(".divFilterContainer");
        this.divAdContainer = document.querySelector(".divAdContainer");
        this.liCatalogPage = document.getElementById("liCatalogPage");
        this.divPagination = document.querySelector(".divPagination");
        this.divBookCartContainer = document.querySelector(".divBookCartContainer");
        this.localStorageHandler = new LocalStorageHandler();
        this.render=new Render();
    }

    AddEventHandler = () => { this.ShowPage();}
    ShowPage = () => { throw new Error("You must implement requiredMethod() in the child class");}
}