export class HomePageHandler {
    
    constructor() {
        this.liHomePage = document.getElementById("liHomePage");
        this.aside = document.querySelector(".aside");
        this.divFilterContainer = document.querySelector(".divFilterContainer");
        this.divAdContainer = document.querySelector(".divAdContainer");
        this.divPagination = document.querySelector(".divPagination");
        this.divBookCartContainer = document.querySelector(".divBookCartContainer");
    }
    AddEventHandler = () => {
        this.liHomePage.addEventListener("click", () => {
            this.divFilterContainer.setAttribute("hidden", "");  
            this.divPagination.setAttribute("hidden", "");
            this.divAdContainer.removeAttribute("hidden");
            this.divBookCartContainer.setAttribute("hidden", "");
            this.ShowHomePage();
        });
    }

    ShowHomePage = () => {
    }
}