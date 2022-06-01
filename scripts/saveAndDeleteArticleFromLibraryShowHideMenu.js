import { getChosenArticle } from "./functions.js";
import { hideMenu } from "./functions.js";
import { hideMenuTag } from "./functions.js";
import { howLongShowMessage } from "./config.js";
import { localStorageLibraryArticlesKey } from "./config.js";
import { renderMessageAndDeleteAboutXTime } from "./functions.js";
import { saveDataInLocalStorage } from "./functions.js";
import { showMenu } from "./functions.js";
import { showMenuTag } from "./functions.js";
///////////////////////Below All global variables declarations///////////////////////
//below DOM elements ordered alphabetically//
const listOfAllArticlesTag = document.querySelector(".main-ul");
//below other variables ordered alphabetically//
const libraryArticlesObjectsArray =
  JSON.parse(localStorage.getItem(localStorageLibraryArticlesKey)) ?? [];
let isButtonChangedFromAddToRemoveNewly = false;
///////////////////////Below All function callings///////////////////////
hideMenuTag.addEventListener("click", hideMenu);
showMenuTag.addEventListener("click", showMenu);

listOfAllArticlesTag.addEventListener("click", function (event) {
  if (
    event.target.classList.contains("main-ul-article-menu-button") &&
    event.target.textContent === "Add to Library"
  ) {
    event.target.textContent = "Remove from Library";

    const chosenArticle = getChosenArticle(event);
    const newLibraryArticle = {};

    newLibraryArticle.title = chosenArticle.dataset.title;
    newLibraryArticle.publishedDate = chosenArticle.dataset.published_date;
    newLibraryArticle.innerHTML = chosenArticle.innerHTML;
    newLibraryArticle.id = chosenArticle.getAttribute("id");

    const idsOfLibraryArticlesObjectsArray = libraryArticlesObjectsArray.map(
      (el) => el.id
    );

    if (!idsOfLibraryArticlesObjectsArray.includes(newLibraryArticle.id)) {
      libraryArticlesObjectsArray.push(newLibraryArticle);
      saveDataInLocalStorage(
        localStorageLibraryArticlesKey,
        libraryArticlesObjectsArray
      );
    }

    renderMessageAndDeleteAboutXTime(
      `You added article to library`,
      howLongShowMessage
    );
    isButtonChangedFromAddToRemoveNewly = true;
  }

  if (
    event.target.classList.contains("main-ul-article-menu-button") &&
    event.target.textContent === "Remove from Library" &&
    isButtonChangedFromAddToRemoveNewly === false
  ) {
    const chosenArticle = getChosenArticle(event);
    const idChosenArticle = parseInt(chosenArticle.getAttribute("id"));

    const IndexOfArticleToBeDeleted = libraryArticlesObjectsArray.findIndex(
      (el) => el.id === idChosenArticle
    );

    libraryArticlesObjectsArray.splice(IndexOfArticleToBeDeleted, 1);

    saveDataInLocalStorage(
      localStorageLibraryArticlesKey,
      libraryArticlesObjectsArray
    );

    event.target.textContent = "Add to Library";
    renderMessageAndDeleteAboutXTime(
      `You removed article from library`,
      howLongShowMessage
    );
  }

  isButtonChangedFromAddToRemoveNewly = false;
});
