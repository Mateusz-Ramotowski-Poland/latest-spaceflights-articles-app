import { localStorageLibraryArticlesKey } from "./config.js";
///////////////////////Below All global variables declarations///////////////////////
const allArticlesNumberTag = document.querySelector(".header-nav-p-span");
const articlesListTag = document.querySelector(".main-ul");

const libraryArticlesObjectsArray = JSON.parse(
  localStorage.getItem(localStorageLibraryArticlesKey)
);
///////////////////////Below All function callings///////////////////////
if (libraryArticlesObjectsArray) {
  libraryArticlesObjectsArray.forEach(function (Article) {
    renderArticle(Article);
  });
}

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

function renderArticle({ id, innerHTML, publishedDate, title }) {
  const newArticle = `<article class="main-ul-article" id='${id}' data-title='${title}' data-published_date='${publishedDate}'>
    ${innerHTML}
    </article>
    `;

  articlesListTag.insertAdjacentHTML("beforeend", newArticle);
}

function renderArticlesNumber() {
  allArticlesNumberTag.textContent = libraryArticlesObjectsArray.length;
}

////////////below my playground/////////////////////////////////////////////////
/* console.log(libraryArticlesObjectsArray);

const sortingButtons = document.querySelectorAll('.header-nav-menu-button');
const sortAscendingByTitleButton = sortingButtons[0];

sortAscendingByTitleButton.addEventListener('click', function(){
  console.log('hello');
  libraryArticlesObjectsArray.sort();
  libraryArticlesObjectsArray.forEach(function (Article) {
    renderArticle(Article);
  });
}) */
