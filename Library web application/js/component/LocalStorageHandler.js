import { Fetch } from "./Fetch.js";
import { BookData } from "./BookData.js";

export class LocalStorageHandler {
  constructor() {
    this.fetch = new Fetch();
  }

  CreateStorageForBooks = (storageName) => {
    let storage = JSON.parse(localStorage.getItem(storageName));
    if (storage == null) {
      localStorage.setItem(storageName, JSON.stringify([]));
    }
  }

  AppendBookDataToStorage = (category, bookdata) => {
    let array = JSON.parse(localStorage.getItem(category));
    const exists = array.some(item => item.title === bookdata.title);
    if (!exists) {
      array.push(bookdata);
      localStorage.setItem(category, JSON.stringify(array));
    }
  }
  DeleteBookDataFromStorage = (category, bookTitle) => {
    let array = JSON.parse(localStorage.getItem(category));
    array = array.filter(item => item.title !== bookTitle);
    localStorage.setItem(category, JSON.stringify(array));
  }


  FillBookshelve = async () => {
    let storage = JSON.parse(localStorage.getItem("bookshelve"));
    if (storage != null) {
      for (let i = 340; i <= 390; i++) {
        let arrayOfBooks = await this.fetch.GetBook(i);
        let book = new BookData(arrayOfBooks[0])
        this.AppendBookDataToStorage("bookshelve", book);
        console.log(i + "Agregado")
      }
    }
  }

  GetStorage = (category) => {
    return JSON.parse(localStorage.getItem(category));
  }
}