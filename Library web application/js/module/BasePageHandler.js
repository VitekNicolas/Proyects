import { LocalStorageHandler } from "../component/LocalStorageHandler.js";
import { Render } from "./Render.js";
export class BasePageHandler {

    constructor() {
        this.containerCatalog = document.querySelector(".containerCatalog");
        this.divFilterContainer = document.querySelector(".divFilterContainer");
        this.carousel = document.querySelector(".carousel");
        this.divFilterContainer = document.querySelector(".divFilterContainer");
        this.divAdContainer = document.querySelector(".divAdContainer");
        this.liCatalogPage = document.getElementById("liCatalogPage");
        this.divPagination = document.querySelector(".divPagination");
        this.divBookCartContainer = document.querySelector(".divBookCartContainer");
        this.containerForm = document.querySelector(".containerForm");
        this.containerHome = document.querySelector(".containerHome");
        this.localStorageHandler = new LocalStorageHandler();
        this.render = new Render();
    }

    ShowPage = () => { throw new Error("You must implement requiredMethod() in the child class"); }
    ShowPageAfterForm = () => { throw new Error("You must implement requiredMethod() in the child class"); }
    AddEventHandler = () => { throw new Error("You must implement requiredMethod() in the child class"); }
}