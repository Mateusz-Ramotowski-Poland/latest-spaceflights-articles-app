import { handleErrorRenderMessageForUser } from "./functions.js";
import { howLongShowMessage } from "./config.js";
import { howManyArticlesAtBeggining } from "./config.js";
import { howManyPixelsAboveBottomYouShouldStartFetchArticles } from "./config.js";
import { renderMessageAndDeleteAboutXTime } from "./functions.js";
import { throwErrorIfNotSuccessfulResponseStatus } from "./functions.js";
///////////////////////Below All global variables declarations///////////////////////
//below DOM elements ordered alphabetically//
const allArticlesTag = document.querySelectorAll(".header-nav-p-span")[1];
const allFetchedArticlesTag =
  document.querySelectorAll(".header-nav-p-span")[0];
const articlesListTag = document.querySelector(".main-ul");
const fetchArticlesNumberInput = document.querySelector(
  ".header-nav-form-input"
);
const formTag = document.querySelector(".header-nav-form");
//below other variables ordered alphabetically//
let allFetchedArticlesNumber = 0;
let howManyArticlesToFetch = howManyArticlesAtBeggining;
let isFetching = false;
///////////////////////Below All function callings///////////////////////
renderArticlesAndArticlesCounterInitFunction(); //async function

formTag.addEventListener("submit", function (event) {
  // inside index.html a have a validation that submitted input data:
  // is not an empty string and is number converted to string
  // is not smaller than 5 and is bigger than 100
  event.preventDefault();
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
  return (
    window.innerHeight +
      window.scrollY +
      howManyPixelsAboveBottomYouShouldStartFetchArticles >=
    document.body.scrollHeight
  );
}

async function getAndRenderFetchedArticles() {
  isFetching = true;
  const fetchedArticles = await fetch(
    // fetchedArticles is array of objects
    "https://api.spaceflightnewsapi.net/v3/articles?" +
      new URLSearchParams({
        _limit: howManyArticlesToFetch,
        _start: allFetchedArticlesNumber,
      })
  )
    .then((response) => {
      throwErrorIfNotSuccessfulResponseStatus(response);
      return response.json();
    })
    .catch((error) => handleErrorRenderMessageForUser(error));

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
  return summary.slice(0, indexOfLastSpace);
}

function getYearMonthDayString(longDateString) {
  return longDateString.slice(0, 10);
}

async function renderArticlesAndArticlesCounterInitFunction() {
  renderNumberOfAllArticles();
  await getAndRenderFetchedArticles();
  renderNumberOfAllFetchedArticles();
}

async function renderNumberOfAllArticles() {
  const numberOfAllArticles = await fetch(
    "https://api.spaceflightnewsapi.net/v3/articles/count"
  )
    .then((response) => {
      throwErrorIfNotSuccessfulResponseStatus(response);
      return response.json();
    })
    .catch((error) => handleErrorRenderMessageForUser(error));

  typeof numberOfAllArticles === "number"
    ? (allArticlesTag.textContent = numberOfAllArticles)
    : "Do nothing";
}

function renderNumberOfAllFetchedArticles() {
  allFetchedArticlesTag.textContent = allFetchedArticlesNumber;
}
