"use strict";

const articlesList = document.querySelector(".articles-list");

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
      <article>
          <h2>${title}</h2>
          <p><span>News site: ${newsSite}. </span><time>Published at: ${updatedAt}</time></p>
          <p>${summary}</p>
          <menu>
              <a href="${url}">
                  <button>Read article</button>
              </a>
              <button>Add to Library</button>
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
