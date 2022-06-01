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
const allArticlesNumberTag = document.querySelector(".header-nav-p-span");
const articlesListTag = document.querySelector(".main-ul");
const sortingButtons = document.querySelectorAll(".header-menu-button");
const sortAscendingByPublishedDateButton = sortingButtons[1];
const sortAscendingByTitleButton = sortingButtons[0];
const sortDescendingByPublishedDateButton = sortingButtons[3];
const sortDescendingByTitleButton = sortingButtons[2];
//below other variables ordered alphabetically//
const libraryArticlesObjectsArray = JSON.parse(
  localStorage.getItem(localStorageLibraryArticlesKey)
) ?? [];
///////////////////////Below All function callings//////////////////////////////////
libraryArticlesObjectsArray
  ? renderArrayArticles(libraryArticlesObjectsArray)
  : "Do nothing";

renderArticlesNumber();

hideMenuTag.addEventListener("click", hideMenu);
showMenuTag.addEventListener("click", showMenu);

sortDescendingByTitleButton.addEventListener("click", function () {
  sortArrayByAndRender(libraryArticlesObjectsArray, "descending", "title");
});
sortAscendingByTitleButton.addEventListener("click", function () {
  sortArrayByAndRender(libraryArticlesObjectsArray, "ascending", "title");
});
sortAscendingByPublishedDateButton.addEventListener("click", function () {
  sortArrayByAndRender(
    libraryArticlesObjectsArray,
    "ascending",
    "publishedDate"
  );
});
sortDescendingByPublishedDateButton.addEventListener("click", function () {
  sortArrayByAndRender(
    libraryArticlesObjectsArray,
    "descending",
    "publishedDate"
  );
});

articlesListTag.addEventListener("click", function (event) {
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

  const IndexOfArticleToBeDeleted = libraryArticlesObjectsArray.findIndex(
    (el) => el.id === idChosenArticle
  );

  libraryArticlesObjectsArray.splice(IndexOfArticleToBeDeleted, 1);
  chosenArticle.remove();

  saveDataInLocalStorage(
    localStorageLibraryArticlesKey,
    libraryArticlesObjectsArray
  );

  renderArticlesNumber();
  renderMessageAndDeleteAboutXTime(
    `You removed article from library`,
    howLongShowMessage
  );
});
///////////////////////Below All function declarations alphabetically ordered by function name///////////////////////
function renderArrayArticles(arr) {
  arr.forEach(function ({ id, innerHTML, publishedDate, title }) {
    const newArticle = `<article class="main-ul-article" id='${id}' data-title='${title}' data-published_date='${publishedDate}'>
    ${innerHTML}
    </article>
    `;

    articlesListTag.insertAdjacentHTML("beforeend", newArticle);
  });
}

function renderArticlesNumber() {
  allArticlesNumberTag.textContent = libraryArticlesObjectsArray.length;
}

function sortArrayByAndRender(
  arrArray,
  descendingOrAscendingString,
  byPropertyNameString
) {
  const deepCopyOfArray = JSON.parse(JSON.stringify(arrArray)) ?? [];

  deepCopyOfArray.sort(function (a, b) {
    const articleATitle = a[byPropertyNameString].toUpperCase();
    const articleBTitle = b[byPropertyNameString].toUpperCase();

    if (descendingOrAscendingString === "descending") {
      if (articleATitle > articleBTitle) return -1;
      if (articleATitle < articleBTitle) return 1;
      return 0;
    }

    if (descendingOrAscendingString === "ascending") {
      if (articleATitle < articleBTitle) return -1;
      if (articleATitle > articleBTitle) return 1;
      return 0;
    }
  });

  articlesListTag.innerHTML = "";

  renderArrayArticles(deepCopyOfArray);
}
