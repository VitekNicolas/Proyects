export class BookData {
  constructor(json) {
    this.title = json.title ?? "Título desconocido";
    this.author = json.authors?.[0]?.name ?? "Autor desconocido";
    this.birthYear = json.authors?.[0]?.birth_year ?? "Desconocido";
    this.deathYear = json.authors?.[0]?.death_year ?? "Desconocido";
    this.language = json.languages;
    this.image = json.formats["image/jpeg"];
    this.copyright = json.copyright;
    this.subjects = json.subjects;
    this.summary = json.summaries[0];
    this.bookshelves = json.bookshelves;
    this.TranslateCopyright();
    this.Translatelanguage();
    //this.TruncateSummary();
    this.ConvertSubjectsToString();
    //this.ReverseAuthorName();
    this.ConvertBookshelvesToString();
  }
  
  SetAuthor(author) {
    this.author = author;
  }

  SetCopyright(copyright) {
    this.copyright = copyright;
  }

  Setlanguage(language) {
    this.language = language;
  }

  SetSummary(summary) {
    this.summary = summary;
  }

  SetSubjects(subjects) {
    this.subjects = subjects;
  }

  SetBookshelves(bookshelves) {
    this.bookshelves = bookshelves;
  }

  GetTranslatedLanguages() {
      return {
        en: "Inglés",
        fr: "Francés",
        de: "Alemán",
        es: "Español",
        it: "Italiano",
      };
  }

  Translatelanguage() {
    const translatedlanguage = [];
    this.language.map((l) => translatedlanguage.push(this.GetTranslatedLanguages()[l] || l));
    this.Setlanguage(translatedlanguage.join(", "));
  }

  TranslateCopyright() {
    if (this.copyright) {
      this.SetCopyright("Sí");
    } else {
      this.SetCopyright("No");
    }
  }

  TruncateSummary() {
    const firstDot = this.summary.indexOf(".");
    const secondSentence = this.summary.substring(firstDot + 1).split(".")[0].trim();
    this.SetSummary(secondSentence);
  }

  ConvertSubjectsToString() {
    this.SetSubjects(this.subjects.join(", "));
  }

  ReverseAuthorName() {
    const name = this.author.split(" ");
    this.SetAuthor(name.reverse().join(" "));
  }

  ConvertBookshelvesToString() {
    this.SetBookshelves(this.bookshelves[0]);
  }
}