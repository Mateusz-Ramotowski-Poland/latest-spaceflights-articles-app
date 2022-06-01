///////////////////////Below All global variables declarations///////////////////////
const headerTag = document.querySelector('.header');
///////////////////////Below All function declarations ordered alphabetically by function name///////////////////////
export function renderMessageAndDeleteAboutXTime (messageString, timeToDeleteInMilisecondsNumber){
  const addedMessageTag = `
  <aside class='header-aside'>
          ${messageString}
  </aside>
  `
  headerTag.insertAdjacentHTML('beforeend',addedMessageTag)

  const tagToDeleteAfterAboutXTime = headerTag.querySelector('.header-aside');

  setTimeout(function(){
    tagToDeleteAfterAboutXTime.remove();
  }, timeToDeleteInMilisecondsNumber)
}