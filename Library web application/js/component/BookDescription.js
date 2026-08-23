export class BookDescription {

  constructor($divName) {
    this.$divName = $divName;
  }

  Create(json) {
    const $el = $(`
    <div class="bookDescription">
      <div class="bookDescriptionImage" aria-hidden="true">
        <img />
      </div>
      <section class="bookDetails">
        <h2 class="hBookDescriptionTitle"></h2>
        <div class="bookDescriptionDetailsContainer">
          <div class="bookDescriptionDetailsCard">
            <div class="shareBookActions">
              <a href="#" class="btnShareBook">Enviar este producto 🔗</a>
              <div class="shareBookDropdown">
                <ul>
                  <li>
                    <a class="linkWhatsapp" target="_blank">
                    <i class="fa-brands fa-whatsapp"></i>Enviar por WhatsApp</a>
                  </li>
                  <li>
                    <a class="linkFacebook" target="_blank">
                    <i class="fa-brands fa-facebook"></i>Publicar en Facebook</a>
                  </li>
                  <li>
                    <a class="linkTwitter" target="_blank">
                    <i class="fa-brands fa-twitter"></i>Compartir en Twitter</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="bookDescriptionDetailsTitle">
            <span>Descripcion:</span>
          </div>
          <ul class="ulBookDescriptionDetails">
            <li><strong>Título del libro: </strong><span class="valTitle"></span></li>
            <li><strong>Autor: </strong><span class="valAuthor"></span></li>
            <li>
              <strong>Vivió entre: </strong><span class="valBirth"></span> y
              <span class="valDeath"></span>
            </li>
            <li><strong>Derechos de autor: </strong><span class="valCopyright"></span></li>
            <li><strong>Idioma: </strong><span class="valLanguage"></span></li>
            <li><strong>Temas: </strong><span class="valSubjects"></span></li>
            <li><strong>Categorias: </strong><span class="valBookshelves"></span></li>
            <li><strong>Resumen: </strong><span class="valSummary"></span></li>
          </ul>
        </div>
      </section>
    </div>
  `);

    $el.find(".bookDescriptionImage img").attr("src", json.image);
    $el.find(".hBookDescriptionTitle").text(json.title);
    $el.find(".linkWhatsapp").attr("href", `whatsapp://send?text=${encodeURIComponent(this.GetMessage(json))}`);
    $el.find(".linkFacebook").attr("href", `https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(this.GetMessage(json))}`);
    $el.find(".linkTwitter").attr("href", `https://twitter.com/intent/tweet?text=${encodeURIComponent(this.GetMessage(json))}`);
    $el.find(".valTitle").text(json.title);
    $el.find(".valAuthor").text(json.author);
    $el.find(".valBirth").text(json.birthYear);
    $el.find(".valDeath").text(json.deathYear);
    $el.find(".valCopyright").text(json.copyright);
    $el.find(".valLanguage").text(json.language);
    $el.find(".valSubjects").text(json.subjects);
    $el.find(".valBookshelves").text(json.bookshelves);
    $el.find(".valSummary").text(json.summaries);

    return $el;
  }

  Append(json) {
    this.$divName.empty();
    const $card = this.Create(json);
    this.$divName.append($card);
  }

  GetMessage(json) {
    return `Mira el libro que vi!! ${json.title} de ${json.author} en ${json.language}`;
  }
}