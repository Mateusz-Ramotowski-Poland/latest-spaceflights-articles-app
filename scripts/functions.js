///////////////////////Below All global variables declarations///////////////////////
const headerTag = document.querySelector('.header');
///////////////////////Below All function declarations ordered alphabetically by function name///////////////////////
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