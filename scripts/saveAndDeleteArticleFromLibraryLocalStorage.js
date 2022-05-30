import { localStorageLibraryArticlesKey } from "./config.js";
///////////////////////Below All global variables declarations///////////////////////
const listOfAllArticlesTag = document.querySelector(".main-ul");


const libraryArticlesObjectsArray = JSON.parse(
  localStorage.getItem(localStorageLibraryArticlesKey)
);
let isButtonChangedFromAddToRemoveNewly = false;
///////////////////////Below All function callings///////////////////////
listOfAllArticlesTag.addEventListener("click", function (event) {
  //below event for 'Add to Library' buttons and 'Remove from Library' buttons
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

    libraryArticlesObjectsArray.push(newLibraryArticle);
    localStorage.setItem(
      localStorageLibraryArticlesKey,
      JSON.stringify(libraryArticlesObjectsArray)
    );
    isButtonChangedFromAddToRemoveNewly = true;
  }

  if (
    event.target.classList.contains("main-ul-article-menu-button") &&
    event.target.textContent === "Remove from Library" &&
    isButtonChangedFromAddToRemoveNewly === false
  ) {
    const chosenArticle = getChosenArticle(event);
    const idChosenArticle = chosenArticle.getAttribute("id");

    const IndexOfArticleToBeDeleted = libraryArticlesObjectsArray.findIndex(
      (el) => el.id === idChosenArticle
    );

    libraryArticlesObjectsArray.splice(IndexOfArticleToBeDeleted, 1);

    localStorage.setItem(
      "libraryArticles",
      JSON.stringify(libraryArticlesObjectsArray)
    );

    event.target.textContent = "Add to Library";
  }

  isButtonChangedFromAddToRemoveNewly = false
});
///////////////////////Below All function declarations ordered alphabetically by function name///////////////////////
function getChosenArticle(event) {
  return event.target.closest(".main-ul-article");
}
