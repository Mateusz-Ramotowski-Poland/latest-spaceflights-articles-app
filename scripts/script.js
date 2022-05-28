"use strict";

const articlesList = document.querySelector(".main-ul");

getAndDisplayFetchedXArticles();

///////////////////////Below All function declarations alphabetically ordered///////////////////////
async function getAndDisplayFetchedXArticles() {
  // What else I should do inside this function?
  // 1.Handle an possible errors - what to do when error ocurs?
  const fetchedArticles = await fetch(
    "https://api.spaceflightnewsapi.net/v3/articles"
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
}

function getShortenSummary(summary) {
  const indexOfLastSpace = summary.lastIndexOf(" ", 200);
  return (summary = summary.slice(0, indexOfLastSpace)); // shorten to max 200 characters, if 200 character is in middle of the word then make it shorten
}

function getYearMonthDayString(longDateString) {
  return longDateString.slice(0, 10);
}
