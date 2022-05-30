///////////////////////Below All global variables declarations///////////////////////
const savedLocalStorage = JSON.parse(localStorage.getItem('libraryArticles'));
///////////////////////Below All function callings///////////////////////
if (savedLocalStorage) {
    savedLocalStorage.forEach(function (savedArticle) {
      renderArticle(savedArticle); // In this function I also save toDo to tasks array
    });
  }
///////////////////////Below All function declarations alphabetically ordered by function name///////////////////////
function renderArticle({id, innerHTML, publishedDate, title}) {
    const newArticle = `
    <article class="main-ul-article" id='${id}' data-title='${title}' data-published_date='${publishedDate}'>
    ${innerHTML}
    </article>
    `;
    libraryArticlesObjectsArray.push(newArticle);
    allFetchedArticlesTag.insertAdjacentHTML("beforeend", newArticles);
  }