import { howLongShowMessage } from "./config.js";
///////////////////////Below All global variables declarations///////////////////////
//below DOM elements ordered alphabetically//
const headerTag = document.querySelector(".header");
export const hideMenuTag = document.querySelector(".header-nav-div");
const navTag = document.querySelector(".header-nav");
export const showMenuTag = document.querySelector(".header-div");
const sortingButtonsTag = document.querySelector(".header-menu");
///////////////////////Below All function declarations ordered alphabetically by function name///////////////////////
export function getChosenArticle(event) {
  return event.target.closest(".main-ul-article");
}

export function handleError(error){
  renderMessageAndDeleteAboutXTime(
    `Error occured: ${error.message}`,
    howLongShowMessage
  );
  return [];
}

export function hideMenu() {
  navTag.style.display = "none";
  showMenuTag.style.display = "block";
  sortingButtonsTag ? (sortingButtonsTag.style.display = "none") : "Do nothing";
}

export function renderMessageAndDeleteAboutXTime(
  messageString,
  timeToDeleteInMilisecondsNumber
) {
  const oldTagToDelete = headerTag.querySelector(".header-aside");
  oldTagToDelete ? oldTagToDelete.remove() : "Do nothing";

  const addedMessageTag = `
  <aside class='header-aside'>
          ${messageString}
  </aside>
  `;

  headerTag.insertAdjacentHTML("beforeend", addedMessageTag);
  const newTagToDelete = headerTag.querySelector(".header-aside");

  setTimeout(function () {
    newTagToDelete.remove();
  }, timeToDeleteInMilisecondsNumber);
}

export function saveDataInLocalStorage(localStorageKeyString, data) {
  localStorage.setItem(
    localStorageKeyString,
    JSON.stringify(data)
  );
}

export function showMenu() {
  navTag.style.display = "flex";
  showMenuTag.style.display = "none";
  sortingButtonsTag ? (sortingButtonsTag.style.display = "flex") : "Do nothing";
}
