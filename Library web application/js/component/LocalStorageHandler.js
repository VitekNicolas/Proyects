import { Fetch } from "./Fetch.js";
import { BookData } from "./BookData.js";

export class LocalStorageHandler {
  constructor() {
    this.fetch = new Fetch();
  }

  CreateStorageForBooks(storageName) {
    let storage = $.parseJSON(localStorage.getItem(storageName));
    if (storage == null) {
      localStorage.setItem(storageName, JSON.stringify([]));
    }
  }

  AppendBookDataToStorage(category, bookdata) {
    let array = $.parseJSON(localStorage.getItem(category));
    const exists = $.grep(array, (item) => item.title === bookdata.title).length > 0;
    if (!exists) {
      array.push(bookdata);
      localStorage.setItem(category, JSON.stringify(array));
    }
  }

  DeleteBookDataFromStorage(category, bookTitle) {
    let array = $.parseJSON(localStorage.getItem(category));
    array = $.grep(array, (item) => item.title !== bookTitle);
    localStorage.setItem(category, JSON.stringify(array));
  }

  async FillBookshelve() {
    let storage = $.parseJSON(localStorage.getItem("bookshelve"));
    if (storage.length === 0) {
      for (let i = 340; i <= 390; i++) {
        let arrayOfBooks = await this.fetch.GetBook(i);
        let book = new BookData(arrayOfBooks[0]);
        this.AppendBookDataToStorage("bookshelve", book);
        console.log(i + " agregado");
      }
    }
  }

  async FillPopular() {
    let storage = $.parseJSON(localStorage.getItem("popular"));
    let arrayOfBooks = await this.fetch.GetBookByPopularity();
    if (storage.length === 0) {
      $.each(arrayOfBooks.results.slice(0, 10), (i, bookJson) => {
        let book = new BookData(bookJson);
        this.AppendBookDataToStorage("popular", book);
        console.log(i + " agregado");
      });
    }
  }

  GetStorage(category) {
    return $.parseJSON(localStorage.getItem(category));
  }
}