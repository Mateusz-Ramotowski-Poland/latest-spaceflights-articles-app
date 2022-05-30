////////////Below All variables declarations alphabetically ordered///////////
///////////used inside renderArticlesAndCounterPlusInfiniteScrolling.js///////////////////////
export let allFetchedArticlesNumber;
export let howManyArticlesToFetch;
export let isFetching;
export const allFetchedArticlesTag =
  document.querySelectorAll(".header-nav-p-span")[0];
////////////Below All variables declarations alphabetically ordered///////////
///////////used inside saveAndDeleteArticleFromLibraryLocalStorage.js///////////////////////
export const libraryArticlesObjectsArray = [];
////////////Below All function declarations alphabetically ordered by function name///////////
///////////used inside renderArticlesAndCounterPlusInfiniteScrolling.js///////////////////////
export function checkIfNearBottomOfWEbPage() {
  // Window.scrollY  - number of pixels that the document is currently scrolled vertically.
  // document.body.scrollHeight  - heigth of whole body document
  // window.innerHeight - viewport height
  const howManyPixelsAboveBottom = 100;
  return (
    window.innerHeight + window.scrollY + howManyPixelsAboveBottom >=
    document.body.scrollHeight
  );
}

export async function getAndRenderFetchedArticles() {
  // 1.Handle an possible errors - what to do when error ocurs?
  isFetching = true;
  const fetchedArticles = await fetch(
    "https://api.spaceflightnewsapi.net/v3/articles?" +
      new URLSearchParams({
        _limit: howManyArticlesToFetch,
        _start: allFetchedArticlesNumber,
      })
  ).then((response) => response.json()); // fetchedArticles is array of objects

  //console.log(fetchedArticles); //DElete this line after development !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
    articlesList.insertAdjacentHTML("beforeend", newArticle);
  }

  allFetchedArticlesNumber += howManyArticlesToFetch;
  isFetching = false;
}

export function getShortenSummary(summary) {
  const indexOfLastSpace = summary.lastIndexOf(" ", 200);
  return summary.slice(0, indexOfLastSpace); // shorten to max 200 characters, don't cut in middle of the word
}

export function getYearMonthDayString(longDateString) {
  return longDateString.slice(0, 10);
}

export async function renderArticlesAndArticlesCounterInitFunction() {
  renderNumberOfAllArticles(); //async function
  await getAndRenderFetchedArticles(); //async function
  renderNumberOfAllFetchedArticles();
}

export async function renderNumberOfAllArticles() {
  const numberOfAllArticles = await fetch(
    "https://api.spaceflightnewsapi.net/v3/articles/count"
  ).then((response) => response.json());

  allArticlesTag.textContent = numberOfAllArticles;
}

export function renderNumberOfAllFetchedArticles() {
  allFetchedArticlesTag.textContent = allFetchedArticlesNumber;
}
////////////Below All function declarations alphabetically ordered by function name///////////
///////////used inside saveAndDeleteArticleFromLibraryLocalStorage.js///////////////////////
export function getChosenArticle(event) {
    return event.target.closest(".main-ul-article");
  }