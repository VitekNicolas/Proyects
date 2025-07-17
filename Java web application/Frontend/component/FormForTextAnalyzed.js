export class FormForTextAnalyzed {
  static addForm(container) {
    let form = `
        <div class="form-group">
            <label for="exampleFormControlTextarea1">Resultados</label>
            <textarea class="form-control" id="txtResult" rows="3"></textarea>
        </div>
        <button class="btn btn-info" id="btnResult" onClick="submitResult()" type="submit">Guardar datos</button>
    `;
    container.innerHTML += form;
  }
}