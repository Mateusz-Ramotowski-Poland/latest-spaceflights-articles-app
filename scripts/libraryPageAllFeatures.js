import { localStorageLibraryArticlesKey } from "./config.js";
///////////////////////Below All global variables declarations///////////////////////
const allArticlesNumberTag = document.querySelector(".header-nav-p-span");
const articlesListTag = document.querySelector(".main-ul");

const libraryArticlesObjectsArray = JSON.parse(
  localStorage.getItem(localStorageLibraryArticlesKey)
);
///////////////////////Below All function callings///////////////////////
libraryArticlesObjectsArray
  ? renderArrayArticles(libraryArticlesObjectsArray)
  : "Do nothing";

renderArticlesNumber();

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

  localStorage.setItem(
    localStorageLibraryArticlesKey,
    JSON.stringify(libraryArticlesObjectsArray)
  );

  renderArticlesNumber();
});
///////////////////////Below All function declarations alphabetically ordered by function name///////////////////////
function getChosenArticle(event) {
  return event.target.closest(".main-ul-article");
}

/* function renderArticle({ id, innerHTML, publishedDate, title }) {
  const newArticle = `<article class="main-ul-article" id='${id}' data-title='${title}' data-published_date='${publishedDate}'>
    ${innerHTML}
    </article>
    `;

  articlesListTag.insertAdjacentHTML("beforeend", newArticle);
} */

function renderArticlesNumber() {
  allArticlesNumberTag.textContent = libraryArticlesObjectsArray.length;
}

////////////below my playground/////////////////////////////////////////////////

const sortingButtons = document.querySelectorAll(".header-menu-button");
const sortAscendingByTitleButton = sortingButtons[0];
const sortAscendingByPublishedDateButton = sortingButtons[1];
const sortDescendingByTitleButton = sortingButtons[2];
const sortDescendingByPublishedDateButton = sortingButtons[3];
/////////////////////////////////////////////////////////////////////////////////
function sortArrayByAndRender(
  arrArray,
  descendingOrAscendingString,
  byPropertyNameString
) {
  const deepCopyOfArray = JSON.parse(JSON.stringify(arrArray));

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

function renderArrayArticles(arr) {
  arr.forEach(function ({ id, innerHTML, publishedDate, title }) {
    const newArticle = `<article class="main-ul-article" id='${id}' data-title='${title}' data-published_date='${publishedDate}'>
    ${innerHTML}
    </article>
    `;

    articlesListTag.insertAdjacentHTML("beforeend", newArticle);
  });
}

////////////////////////////////below four buttons for sorting///////////////////////////////
sortDescendingByTitleButton.addEventListener("click", function () {
  sortArrayByAndRender(libraryArticlesObjectsArray, "descending", "title");
});
sortAscendingByTitleButton.addEventListener("click", function () {
  sortArrayByAndRender(libraryArticlesObjectsArray, "ascending", "title");
});
sortAscendingByPublishedDateButton.addEventListener("click", function () {
  sortArrayByAndRender(libraryArticlesObjectsArray, "ascending", "publishedDate");
});
sortDescendingByPublishedDateButton.addEventListener("click", function () {
  sortArrayByAndRender(libraryArticlesObjectsArray, "descending", "publishedDate");
});



