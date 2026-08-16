export class LoadingButton {
    constructor(buttonId) {
        this.button = document.getElementById(buttonId);
        this.originalText = this.button.textContent;
    }

    start() {
        this.button.disabled = true;
        this.button.classList.add("btn-loading");
    }

    success(message = "Listo") {
        this.button.classList.remove("btn-loading");
        this.button.classList.add("btn-success-flash");
        this.button.textContent = message;
    }

    reset() {
        this.button.classList.remove("btn-success-flash");
        this.button.textContent = this.originalText;
        this.button.disabled = false;
    }

    error() {
        this.button.classList.remove("btn-loading");
        this.button.disabled = false;
    }
}