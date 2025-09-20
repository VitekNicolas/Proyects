import { CatalogPageHandler } from "../module/CatalogPageHandler.js";
import { HomePageHandler } from "../module/HomePageHandler.js";
import { BasePageHandler } from "../module/BasePageHandler.js";

export class AlertModal {
    Create = () => {
        return `
            <div class="cancelModal">
                <div class="modal-content">
                    <p class="modal-text">¿Seguro que deseas cancelar la encuesta?</p>
                    <div class="modal-actions">
                        <button id="confirmYes" class="btn btn-yes">Sí, deseo volver a la página anterior</button>
                        <button id="confirmNo" class="btn btn-no">No</button>
                    </div>
                </div>
            </div>
        `;
    }
    Append = () => {
        $("body").append(this.Create());
    }

    AssignEventHandler = () => {
        $(document).on("click", "#confirmNo", () => {
            $(".cancelModal").remove();
        });
        $(document).on("click", "#confirmYes", () => {
            const currentPage = sessionStorage.getItem("currentPage");
            let basePageHandler;
            $(".cancelModal").remove();
            if (currentPage === "home") {
                basePageHandler = new HomePageHandler();
            } else if (currentPage === "catalog") {
                basePageHandler = new CatalogPageHandler();
            }
            basePageHandler.ShowPageAfterForm();
        });

    }
}