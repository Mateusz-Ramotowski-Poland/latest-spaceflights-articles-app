import { allFetchedArticlesNumber } from "./functions.js";
import { howManyArticlesToFetch } from "./functions.js";
import { isFetching} from "./functions.js";

import { checkIfNearBottomOfWEbPage } from "./functions.js";
import { getAndRenderFetchedArticles } from "./functions.js";
import { getShortenSummary} from "./functions.js";
import { getYearMonthDayString } from "./functions.js";
import { renderArticlesAndArticlesCounterInitFunction } from "./functions.js";
import { renderNumberOfAllArticles } from "./functions.js";
import { renderNumberOfAllFetchedArticles } from "./functions.js";
///////////////////////Below All global variables///////////////////////
const allArticlesTag = document.querySelectorAll(".header-nav-p-span")[1];

const articlesList = document.querySelector(".main-ul");
const fetchArticlesNumberInput = document.querySelector(
  ".header-nav-form-input"
); 
const formTag = document.querySelector(".header-nav-form");

allFetchedArticlesNumber = 0;
// howManyArticlesToFetch = 15;
// isFetching = false;
///////////////////////Below All function callings///////////////////////
renderArticlesAndArticlesCounterInitFunction(); //async function

formTag.addEventListener("submit", function (event) {
  // inside index.html a have a validation that submitted input data:
  // is not an empty string and is number converted to string
  // is not smaller than 5 and is bigger than 100
  event.preventDefault(); // I don't reload a page after submiting the form because of this
  howManyArticlesToFetch = parseInt(fetchArticlesNumberInput.value);
});

window.addEventListener("scroll", async function () {
  if (checkIfNearBottomOfWEbPage() && isFetching === false) {
    await getAndRenderFetchedArticles();
    renderNumberOfAllFetchedArticles();
  }
});

