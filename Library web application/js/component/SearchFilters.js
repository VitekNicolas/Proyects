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
        this.btnSearchByTopic = this.divName.querySelector(".btnSearchByTopic");
        this.searchSections = this.divName.querySelectorAll(
            ".divFilterLang, .divFilterCopyRight, .divFilterYears, .divFilterName, .divFilterTopic"
        );
    }
    LockSections(disabled, activeSection = null) {
        this.searchSections.forEach((section) => {
            if (section !== activeSection) {
                section.querySelectorAll("input, button").forEach((el) => {
                    el.disabled = disabled;
                });
            }
        });
    }

    AddBehaviorToAside = () => {
        const inpunts = this.divName.querySelectorAll("#input");
        const elements = [
            this.btnSearchByAuthorYears,
            this.btnSearchByAuthorName,
            this.btnSearchByTopic,
        ];
        inpunts.forEach((input) => {
            elements.push(input);
        })
        elements.forEach((btn) => {
            const eventType = btn.tagName === "INPUT" ? "change" : "click";
            btn.addEventListener(eventType, () => {
                const section = btn.closest("div");
                this.LockSections(true, section);
            });
        });
    };


    AddEventListenerBtnReset = () => {
        this.btnReset.addEventListener("click", () => {
            this.divName.querySelectorAll(".input").forEach((input) => { input.value = "" });
            this.divName.querySelectorAll('input[type="checkbox"]').forEach((input) => {
                input.checked = false;
            });
            this.LockSections(false);
            this.pHandler.LoadPage(1);
            this.pHandler.ChangePaginationAtributtes("auto", "", "");
        })
    }

    AddEventListenerToBtnSearchByYears = () => {
        this.btnSearchByAuthorYears.addEventListener("click", () => {
            const inpMinYear = this.divName.querySelector("#inpMinYear").value;
            const inpMaxYear = this.divName.querySelector("#inpMaxYear").value;
            this.render.RenderBooksFilteredByYears(inpMinYear, inpMaxYear);
            this.pHandler.ChangePaginationAtributtes("none", "gray", "none");
        })
    }
    AddEventListenerToBtnSearchByAuthorName = () => {
        this.btnSearchByAuthorName.addEventListener("click", () => {
            const inpAuthorName = this.divName.querySelector("#inpAuthorName").value.trim();
            const encodedAuthor = encodeURIComponent(inpAuthorName);
            this.render.RenderBooksFilteredByAuthorName(encodedAuthor);
            this.pHandler.ChangePaginationAtributtes("none", "gray", "none");
        })
    }

    AddEventListenerToBtnSearchByTopic = () => {
        this.btnSearchByTopic.addEventListener("click", () => {
            const inpTopic = this.divName.querySelector("#inpTopic").value;
            this.render.RenderBooksFilteredByTopic(inpTopic);
            this.pHandler.ChangePaginationAtributtes("none", "gray", "none");
        })
    }

    AddEventListenerToInpCopyright = () => {
        const checkboxYes = document.querySelector(".inptTrue");
        const checkboxNo = document.querySelector(".inpFalse");
        checkboxYes.addEventListener("change", () => {
            if (checkboxYes.checked) {
                checkboxNo.disabled = true;
                this.render.RenderBooksFilteredByCopyrights("true");
                this.LockSections(true, section);
            }
            this.pHandler.ChangePaginationAtributtes("none", "gray", "none");
        });
        checkboxNo.addEventListener("change", () => {
            if (checkboxNo.checked) {
                checkboxYes.disabled = true;
                this.render.RenderBooksFilteredByCopyrights("false");
            }
            this.pHandler.ChangePaginationAtributtes("none", "gray", "none");
        });
        
    }

    AddEventListenerToInpLanguage = () => {
        const inpsLanguages = document.querySelectorAll(".inpLanguage");
        inpsLanguages.forEach(input => {
            input.addEventListener("change", () => {
                if (input.checked) {
                    this.render.RenderBooksFilteredByLanguage(input.value);
                    inpsLanguages.forEach(sib => {
                        if (sib !== input) sib.disabled = true;
                    });
                }
                this.pHandler.ChangePaginationAtributtes("none", "gray", "none");
            });
        });
    }
}