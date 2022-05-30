import {libraryArticlesObjectsArray} from "./functions.js";

import { getChosenArticle } from "./functions.js";
///////////////////////Below All global variables declarations///////////////////////
const listOfAllArticlesTag = document.querySelector(".main-ul");
///////////////////////Below All function callings///////////////////////
listOfAllArticlesTag.addEventListener("click", function (event) {
  //below event for 'Add to Library' buttons
  if (
    !(
      event.target.classList.contains("main-ul-article-menu-button") &&
      event.target.textContent === "Add to Library"
    )
  )
    return;

  event.target.textContent = "Remove from Library";

  const chosenArticle = getChosenArticle(event);
  const newLibraryArticle = {};

  newLibraryArticle.title = chosenArticle.dataset.title;
  newLibraryArticle.publishedDate = chosenArticle.dataset.published_date;
  newLibraryArticle.innerHTML = chosenArticle.innerHTML;
  newLibraryArticle.id = chosenArticle.getAttribute("id");

  libraryArticlesObjectsArray.push(newLibraryArticle);
  localStorage.setItem(
    "libraryArticles",
    JSON.stringify(libraryArticlesObjectsArray)
  );

  console.log(libraryArticlesObjectsArray); //DElete this line after development !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
});

// this event is also fired after clicking - I have problem with text on button and also with that That I can add and soon delete the same article
// solution maybe use timers - after for example 10 ms change text content of button,not immidiatyly
/* listOfAllArticlesTag.addEventListener("click", function (event) {
  //below event for 'Remove from Library' buttons
  if (
    !(
      event.target.classList.contains("main-ul-article-menu-button") &&
      event.target.textContent === "Remove from Library"
    )
  )
    return;



  const chosenArticle = getChosenArticle(event);
  const idChosenArticle = chosenArticle.getAttribute("id");

  console.log(typeof idChosenArticle);
  console.log(typeof libraryArticlesObjectsArray[0].id);
  const IndexOfArticleToBeDeleted = libraryArticlesObjectsArray.findIndex(
    (el) => el.id === idChosenArticle
  );

  localStorage.setItem(
    "libraryArticles",
    JSON.stringify(libraryArticlesObjectsArray)
  );

  event.target.textContent = "Add to Library";
  console.log(libraryArticlesObjectsArray); //DElete this line after development !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
}); */

