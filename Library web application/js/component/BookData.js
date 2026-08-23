export class BookData {
  constructor(json) {
    this.title = json.title ?? "Título desconocido";
    this.author = json.authors?.[0]?.name ?? "Autor desconocido";
    this.birthYear = json.authors?.[0]?.birth_year ?? "Desconocido";
    this.deathYear = json.authors?.[0]?.death_year ?? "Desconocido";
    this.language = json.languages ?? [];
    this.image = json.formats?.["image/jpeg"] ?? "./img/logo.jpg";
    this.copyright = json.copyright;
    this.subjects = json.subjects ?? [];
    this.summaries = json.summaries?.[0] ?? "";
    this.bookshelves = json.bookshelves ?? [];
    this.TranslateCopyright();
    this.Translatelanguage();
    this.Truncatesummaries();
    this.ConvertSubjectsToString();
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

  Setsummaries(summaries) {
    this.summaries = summaries;
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
  Truncatesummaries() {
    if (!this.summaries) {
      this.Setsummaries("Sin resumen disponible.");
      return;
    }
    const firstDot = this.summaries.indexOf(".");
    if (firstDot === -1) {
      this.Setsummaries(this.summaries);
      return;
    }
    const secondSentence = this.summaries.substring(firstDot + 1).split(".")[0].trim();
    this.Setsummaries(secondSentence || this.summaries);
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