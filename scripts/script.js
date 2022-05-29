"use strict";
///////////////////////Below All variables declarations///////////////////////
const articlesList = document.querySelector(".main-ul");
const allFetchedArticlesTag =
  document.querySelectorAll(".header-nav-p-span")[0]; // added line after last commit!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const allArticlesTag = document.querySelectorAll(".header-nav-p-span")[1]; // added line after last commit!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

let isFetching = false; // added line after last commit!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
let howManyArticlesToFetch = 5;
let allFetchedArticles = 0; // added line after last commit!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
///////////////////////Below All function callings///////////////////////
getAndRenderFetchedArticles();
renderNumberOfAllArticles(); // added line after last commit!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
///////////////////////Below All function declarations alphabetically ordered///////////////////////
async function getAndRenderFetchedArticles() {
  // What else I should do inside this function?
  // 1.Handle an possible errors - what to do when error ocurs?
  isFetching = true; // added line after last commit!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const fetchedArticles = await fetch(
    "https://api.spaceflightnewsapi.net/v3/articles?" +
      new URLSearchParams({
        _limit: howManyArticlesToFetch,
        _start: allFetchedArticles, // added line after last commit!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      })
  )
    .then((response) => response.json())
    .then((data) => data); // fetchedArticles is array of objects

  for (let { title, updatedAt, summary, newsSite, url } of fetchedArticles) {
    summary.length >= 200
      ? (summary = getShortenSummary(summary))
      : "Don't do anything";
    updatedAt = getYearMonthDayString(updatedAt);

    const newArticle = `
      <article class="main-ul-article">
          <div>
              <p class='main-ul-article-div-p'><span>${newsSite}</span><time>${updatedAt}</time></p>
              <h2 class='main-ul-article-div-h2'>${title}</h2>
          </div>
          <p>${summary}</p>
          <menu class='main-ul-article-menu'>
              <a class='main-ul-article-menu-a' href="${url}">
                  <button class='main-ul-article-menu-a-button'>Read article</button>
              </a>
              <button class='main-ul-article-menu-button'>Add to Library</button>
          </menu>
      </article>
          `;
    articlesList.insertAdjacentHTML("beforeend", newArticle);
  }

  allFetchedArticles += howManyArticlesToFetch; // added line after last commit!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  console.log(`allFetchedArticles: ${allFetchedArticles}`); // added line after last commit!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  renderNumberOfAllFetchedArticles(); // added line after last commit!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  isFetching = false; // added line after last commit!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
}

function getShortenSummary(summary) {
  const indexOfLastSpace = summary.lastIndexOf(" ", 200);
  return (summary = summary.slice(0, indexOfLastSpace)); // shorten to max 200 characters, if 200 character is in middle of the word then make it shorten
}

function getYearMonthDayString(longDateString) {
  return longDateString.slice(0, 10);
}
///////////////////////Below is my experimental area - Here I also declare ariables for my experiments///////////////////////

//some lines are added above
// they have comment // added line after last commit!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const howManyPixelsAboveBottom = 100;
const body = document.querySelector("body");
window.addEventListener("scroll", function () {
  console.log(checkIfNearBottomOfWEbPage());
  checkIfNearBottomOfWEbPage() && isFetching === false
    ? getAndRenderFetchedArticles()
    : "Do nothing"; // I must work with this line, but it works

  //console.log(`scrollY: ${scrollY}, innerHeight: ${innerHeight}, bodyHeight: ${body.scrollHeight}`);
  // You can't detect bottom of webpage with it
});
function checkIfNearBottomOfWEbPage() {
  return (
    window.innerHeight + window.scrollY + howManyPixelsAboveBottom >=
    body.scrollHeight
  );
}
// Window.scrollY  - The read-only scrollY property of the Window interface returns
//the number of pixels that the document is currently scrolled vertically.
//bodyHeight: ${body.scrollHeight}`  - heigth of whole body document
//window.innerHeight - viewport height

//conclusions: (when there is poziomy scrolbar)
// bodyHeight = window.innerHeight + Window.scrollY

// A viewport represents a polygonal (normally rectangular) area in computer graphics
//that is currently being viewed. In web browser terms, it refers to the part of the document you're viewing which is currently visible

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function renderNumberOfAllArticles() {
  const numberOfAllArticles = await fetch(
    "https://api.spaceflightnewsapi.net/v3/articles/count"
  )
    .then((response) => response.json())
    .then((data) => data); // fetchedArticles is array of objects

  console.log(numberOfAllArticles);
  allArticlesTag.textContent = numberOfAllArticles;
}

function renderNumberOfAllFetchedArticles() {
  console.log(allFetchedArticles, "oweojfjoef");
  allFetchedArticlesTag.textContent = allFetchedArticles;
}
