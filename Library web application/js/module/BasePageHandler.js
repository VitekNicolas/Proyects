import { LocalStorageHandler } from "../component/LocalStorageHandler.js";
import { Render } from "./Render.js";

export class BasePageHandler {

    constructor() {
        this.containerCatalog = $(".containerCatalog");
        this.divFilterContainer = $(".divFilterContainer");
        this.containerBookDescription = $(".containerBookDescription");
        this.carousel = $(".carousel");
        this.divAdContainer = $(".divAdContainer");
        this.liCatalogPage = $("#liCatalogPage");
        this.divPagination = $(".divPagination");
        this.divBookCartContainer = $(".divBookCartContainer");
        this.containerForm = $(".containerForm");
        this.containerHome = $(".containerHome");

        this.localStorageHandler = new LocalStorageHandler();
        this.render = new Render();
    }

    ShowPage = () => { throw new Error("You must implement requiredMethod() in the child class"); }
    ShowPageAfterForm = () => { throw new Error("You must implement requiredMethod() in the child class"); }
    AddEventHandler = () => { throw new Error("You must implement requiredMethod() in the child class"); }

    DisplayContainer = (divsToShow) => {
        const divs = $(".containerHome, .containerCatalog, .containerBookDescription, .containerForm, .divBookCartContainer");
        divs.each((_, div) => {
            if (divsToShow.some(d => d[0] === div)) {
                $(div).removeAttr("hidden");
            } else {
                $(div).attr("hidden", "");
            }
        });
    }

}
