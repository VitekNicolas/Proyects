export class FormModal {
  constructor() {
    this.html = "";
  }

  Create = (message = "") => {
    const safeMessage = String(message).replace(/\n/g, "<br>");
    this.html = `
      <div class="formModal">
        <div class="modal-content">
          <span class="btnCloseModal">&times;</span>
          <p class="formModalText">${safeMessage}</p>
        </div>
      </div>
    `;
  };

  Append = () => {
    $("body").append(this.html);
  };

  AssignEventHandler = () => {
    $(".btnCloseModal").on("click", () => {
      $(".formModal").remove();
    });
  }
}