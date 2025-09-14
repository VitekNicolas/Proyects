import { Render } from "../module/Render.js";
import { PaginationHandler } from "./PaginationHandler.js";

export class SearchFilters {
    constructor(divName) {
        this.divName = divName;
        this.render = new Render();
        this.pHandler = new PaginationHandler();
        this.btnSearchByAuthorYears = this.divName.querySelector(".btnSearchByAuthorYears");
        this.btnSearchByAuthorName = this.divName.querySelector(".btnSearchByAuthorName");
        this.btnReset = this.divName.querySelector(".btnReset");
        this.inpMinYear = this.divName.querySelector("#inpMinYear").value;
        this.inpMaxYear = this.divName.querySelector("#inpMaxYear").value;
    }

    AddEventListenerBtnReset = () => {
        this.btnReset.addEventListener("click", () => {
            this.divName.querySelectorAll(".input").forEach((input) => { input.value = "" });
            this.divName.querySelectorAll('input[type="checkbox"]').forEach((input) => { input.checked = false });
            this.pHandler.loadPage(1);
            this.pHandler.ChangePaginationAtributtes("auto", "", "");
        })
    }


    AddEventListenerToBtnSearchByYears = () => {
        this.btnSearchByAuthorYears.addEventListener("click", () => {
            this.render.RenderBooksFilteredByYears(this.inpMinYear, this.inpMaxYear);
            this.pHandler.ChangePaginationAtributtes("none", "gray", "none");
        })
    }
    AddEventListenerToBtnSearchByAuthorName = () => {
        this.btnSearchByAuthorName.addEventListener("click"), () => {
            this.pHandler.ChangePaginationAtributtes("none", "gray", "none");
        }
    }

    CheckInputs = () => {
        const hasValue =
            (this.inpMinYear?.value || "").trim() !== "" ||
            (this.inpMaxYear?.value || "").trim() !== "";

        this.btnSearchByAuthorYears.disabled = !hasValue;
    };

    AddBeheaviorToBtnSearchByYears = () => {
        [this.inpMinYear, this.inpMaxYear].forEach(inp => {
            if (inp) inp.addEventListener("input", this.CheckInputs);
        });
        this.CheckInputs();
    };
}