import { LocalStorageHandler } from "../component/LocalStorageHandler.js";
import { Render } from "./Render.js";
export class BasePageHandler {

    constructor() {
        this.container = document.querySelector(".container");
        this.aside = document.querySelector(".aside");
        this.carousel = document.querySelector(".carousel");
        this.divFilterContainer = document.querySelector(".divFilterContainer");
        this.divAdContainer = document.querySelector(".divAdContainer");
        this.liCatalogPage = document.getElementById("liCatalogPage");
        this.divPagination = document.querySelector(".divPagination");
        this.divBookCartContainer = document.querySelector(".divBookCartContainer");
        this.divFormContainer = document.querySelector(".divForm");
        this.localStorageHandler = new LocalStorageHandler();
        this.render = new Render();
    }

    ShowPage = () => { this.AddEventHandler(); }
    AddEventHandler = () => { throw new Error("You must implement requiredMethod() in the child class"); }
}