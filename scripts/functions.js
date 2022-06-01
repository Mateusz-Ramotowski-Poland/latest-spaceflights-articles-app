///////////////////////Below All global variables declarations///////////////////////
const headerTag = document.querySelector('.header');
const navTag = document.querySelector('.header-nav');
export const showMenuTag = document.querySelector('.header-div');
///////////////////////Below All function declarations ordered alphabetically by function name///////////////////////
export function hideMenu(){
  navTag.style.display = 'none';
  showMenuTag.style.display = 'block';
}
export function renderMessageAndDeleteAboutXTime (messageString, timeToDeleteInMilisecondsNumber){
  const oldTagToDelete = headerTag.querySelector('.header-aside');
  oldTagToDelete ? oldTagToDelete.remove() : 'Do nothing';

  const addedMessageTag = `
  <aside class='header-aside'>
          ${messageString}
  </aside>
  `

  headerTag.insertAdjacentHTML('beforeend',addedMessageTag)
  const newTagToDelete = headerTag.querySelector('.header-aside');
 
  setTimeout(function(){
    newTagToDelete.remove();
  }, timeToDeleteInMilisecondsNumber)
}
export function showMenu(){
  navTag.style.display = 'flex';
  showMenuTag.style.display = 'none';
}
