import { Render } from "../module/Render.js";
import { PaginationHandler } from "./PaginationHandler.js";

export class SearchFilters {
    constructor(divName) {
        this.$divName = $(divName); // guardamos el contenedor como objeto jQuery
        this.render = new Render();
        this.pHandler = new PaginationHandler();
        this.$btnSearchByAuthorYears = this.$divName.find(".btnSearchByAuthorYears");
        this.$btnSearchByAuthorName = this.$divName.find(".btnSearchByAuthorName");
        this.$btnReset = this.$divName.find(".btnReset");
        this.$btnSearchByTopic = this.$divName.find(".btnSearchByTopic");
        this.$searchSections = this.$divName.find(
            ".divFilterLanguage, .divFilterCopyRight, .divFilterYears, .divFilterName, .divFilterTopic"
        );
    }

    LockSections(disabled, activeSection = null) {
        this.$searchSections.each((_, section) => {
            const $section = $(section);
            $section.find("input, button").each((_, el) => {
                if (activeSection && $section.is(activeSection)) {
                    $(el).prop("disabled", false); // el filtro actual sigue activo
                } else {
                    $(el).prop("disabled", disabled);
                }
            });
        });
    }

    AddBehaviorToAside = () => {
        const $inputs = this.$divName.find(".input");
        const $elements = $inputs.add([
            this.$btnSearchByAuthorYears[0],
            this.$btnSearchByAuthorName[0],
            this.$btnSearchByTopic[0],
        ]);

        $elements.each((_, el) => {
            const $el = $(el);
            const eventType = $el.is("input") ? "change" : "click";
            $el.on(eventType, () => {
                const $section = $el.closest("div");
                this.LockSections(true, $section);
            });
        });
    };

    AddEventListenerBtnReset = () => {
        this.$btnReset.on("click", () => {
            this.$divName.find(".input").val("");
            this.$divName.find('input[type="checkbox"]').prop("checked", false).prop("disabled", false);
            this.LockSections(false);
            this.pHandler.LoadPage(1);
            this.pHandler.ChangePaginationAtributtes("auto", "", "");
        });
    };

    AddEventListenerToBtnSearchByYears = () => {
        this.$btnSearchByAuthorYears.on("click", () => {
            const inpMinYear = this.$divName.find("#inpMinYear").val();
            const inpMaxYear = this.$divName.find("#inpMaxYear").val();
            this.render.RenderBooksFilteredByYears(inpMinYear, inpMaxYear);
            this.pHandler.ChangePaginationAtributtes("none", "gray", "none");
        });
    };

    AddEventListenerToBtnSearchByAuthorName = () => {
        this.$btnSearchByAuthorName.on("click", () => {
            const inpAuthorName = this.$divName.find("#inpAuthorName").val().trim();
            const encodedAuthor = encodeURIComponent(inpAuthorName);
            this.render.RenderBooksFilteredByAuthorName(encodedAuthor);
            this.pHandler.ChangePaginationAtributtes("none", "gray", "none");
        });
    };

    AddEventListenerToBtnSearchByTopic = () => {
        this.$btnSearchByTopic.on("click", () => {
            const inpTopic = this.$divName.find("#inpTopic").val();
            this.render.RenderBooksFilteredByTopic(inpTopic);
            this.pHandler.ChangePaginationAtributtes("none", "gray", "none");
        });
    };

    AddEventListenerToInpCopyright = () => {
        const $checkboxYes = this.$divName.find("#inpTrue");
        const $checkboxNo = this.$divName.find("#inpFalse");

        $checkboxYes.on("change", () => {
            if ($checkboxYes.is(":checked")) {
                $checkboxNo.prop("disabled", true);
                this.render.RenderBooksFilteredByCopyrights("true");
            }
            this.pHandler.ChangePaginationAtributtes("none", "gray", "none");
        });

        $checkboxNo.on("change", () => {
            if ($checkboxNo.is(":checked")) {
                $checkboxYes.prop("disabled", true);
                this.render.RenderBooksFilteredByCopyrights("false");
            }
            this.pHandler.ChangePaginationAtributtes("none", "gray", "none");
        });
    };

    AddEventListenerToInpLanguage = () => {
        const $inpsLanguages = this.$divName.find(".divFilterLanguage .input");

        $inpsLanguages.on("change", (e) => {
            const $input = $(e.target);
            if ($input.is(":checked")) {
                this.render.RenderBooksFilteredByLanguage($input.val());
                $inpsLanguages.not($input).prop("disabled", true);
            }
            this.pHandler.ChangePaginationAtributtes("none", "gray", "none");
        });
    };

    Init() {
        this.AddBehaviorToAside();
        this.AddEventListenerBtnReset();
        this.AddEventListenerToBtnSearchByYears();
        this.AddEventListenerToBtnSearchByAuthorName();
        this.AddEventListenerToBtnSearchByTopic();
        this.AddEventListenerToInpCopyright();
        this.AddEventListenerToInpLanguage();
    }
}