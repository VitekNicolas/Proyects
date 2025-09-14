import { Render } from "../module/Render.js";

export class SearchFilters {
    constructor(divName) {
        this.divName = divName;
        this.render = new Render();
        this.inputs = this.divName.querySelectorAll(".input");
        this.btnSearchByAuthorYears = this.divName.querySelector(".btnSearchByAuthorYears");
        this.inpMinYear = this.divName.querySelector("#inpMinYear").value;
        this.inpMaxYear = this.divName.querySelector("#inpMaxYear").value;
    }
    AddEventListenerToBtnSearchByYears = () => {
        this.btnSearchByAuthorYears.addEventListener("click", () => {
            this.render.RenderBooksFilteredByYears(this.inpMinYear, this.inpMaxYear);
            console.log(inpMaxYear == "");
        })
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