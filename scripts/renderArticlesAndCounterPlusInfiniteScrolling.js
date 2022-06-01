import { howLongShowMessage } from "./config.js";
import { renderMessageAndDeleteAboutXTime } from "./functions.js";
///////////////////////Below All global variables declarations///////////////////////
const allArticlesTag = document.querySelectorAll(".header-nav-p-span")[1];
const allFetchedArticlesTag =
  document.querySelectorAll(".header-nav-p-span")[0];
const articlesListTag = document.querySelector(".main-ul");
const fetchArticlesNumberInput = document.querySelector(
  ".header-nav-form-input"
);
const formTag = document.querySelector(".header-nav-form");

let allFetchedArticlesNumber = 0;
let howManyArticlesToFetch = 15;
let isFetching = false;
///////////////////////Below All function callings///////////////////////
renderArticlesAndArticlesCounterInitFunction(); //async function

formTag.addEventListener("submit", function (event) {
  // inside index.html a have a validation that submitted input data:
  // is not an empty string and is number converted to string
  // is not smaller than 5 and is bigger than 100
  event.preventDefault(); // I don't reload a page after submiting the form because of this
  howManyArticlesToFetch = parseInt(fetchArticlesNumberInput.value);
  renderMessageAndDeleteAboutXTime(
    `Now, You will see ${howManyArticlesToFetch} new articles when You reach bottom of webpage`,
    howLongShowMessage
  );
});

window.addEventListener("scroll", async function () {
  if (checkIfNearBottomOfWEbPage() && isFetching === false) {
    await getAndRenderFetchedArticles();
    renderNumberOfAllFetchedArticles();
  }
});
///////////////////////Below All function declarations ordered alphabetically by function name///////////////////////
function checkIfNearBottomOfWEbPage() {
  // Window.scrollY  - number of pixels that the document is currently scrolled vertically.
  // document.body.scrollHeight  - heigth of whole body document
  // window.innerHeight - viewport height
  const howManyPixelsAboveBottom = 100;
  return (
    window.innerHeight + window.scrollY + howManyPixelsAboveBottom >=
    document.body.scrollHeight
  );
}

async function getAndRenderFetchedArticles() {
  // 1.Handle an possible errors - what to do when error ocurs?
  isFetching = true;
  const fetchedArticles = await fetch(
    "https://api.spaceflightnewsapi.net/v3/articles?" +
      new URLSearchParams({
        _limit: howManyArticlesToFetch,
        _start: allFetchedArticlesNumber,
      })
  ).then((response) => response.json()); // fetchedArticles is array of objects

  for (let {
    id,
    newsSite,
    publishedAt,
    summary,
    title,
    url,
  } of fetchedArticles) {
    summary.length > 200
      ? (summary = getShortenSummary(summary))
      : "Don't do anything";
    publishedAt = getYearMonthDayString(publishedAt);

    const newArticle = `
        <article class="main-ul-article" id='${id}' data-title='${title}' data-published_date='${publishedAt}'>
            <div>
                <p class='main-ul-article-div-p'><span>${newsSite}</span><time>${publishedAt}</time></p>
                <h2 class='main-ul-article-div-h2'>${title}</h2>
            </div>
            <p>${summary}</p>
            <menu class='main-ul-article-menu'>
                <a class='main-ul-article-menu-a' href="${url}" target='_blank'>
                    <button class='main-ul-article-menu-a-button'>Read article</button>
                </a>
                <button class='main-ul-article-menu-button'>Add to Library</button>
            </menu>
        </article>
            `;
    articlesListTag.insertAdjacentHTML("beforeend", newArticle);
  }

  allFetchedArticlesNumber += howManyArticlesToFetch;
  isFetching = false;
}

function getShortenSummary(summary) {
  const indexOfLastSpace = summary.lastIndexOf(" ", 200);
  return summary.slice(0, indexOfLastSpace); // shorten to max 200 characters, don't cut in middle of the word
}

function getYearMonthDayString(longDateString) {
  return longDateString.slice(0, 10);
}

async function renderArticlesAndArticlesCounterInitFunction() {
  renderNumberOfAllArticles(); //async function
  await getAndRenderFetchedArticles(); //async function
  renderNumberOfAllFetchedArticles();
}

async function renderNumberOfAllArticles() {
  const numberOfAllArticles = await fetch(
    "https://api.spaceflightnewsapi.net/v3/articles/count"
  ).then((response) => response.json());

  allArticlesTag.textContent = numberOfAllArticles;
}

function renderNumberOfAllFetchedArticles() {
  allFetchedArticlesTag.textContent = allFetchedArticlesNumber;
}
