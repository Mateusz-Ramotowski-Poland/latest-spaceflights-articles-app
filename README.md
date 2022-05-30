# Author and other important information

Author - Ramotowski Mateusz
Inside master2 branch is newest code

# Intro

For this task, we will use a free API that provides spaceflights related news: https://spaceflightnewsapi.net/

You can find there the documentation along with available HTTP endpoints and sample responses.

# Functionalities

The goal is to write an application that will communicate with this API and have the following functionalities:

1. Display a list of X fetched articles.
2. X should be a limit that could be set up by a user (add an input for that). The default value should be 15.
3. There should be pagination (preferably Infinite Scroll), so if you scroll to the bottom of the page, fetch the following X articles.
4. At the top of the page should be sticked counter, displaying how many articles are fetched out of total (e.g. 45/12917).
5. Each article should be displayed as a card and contain information such as title, newsSite, publishedAt date, summary (shorten to max. 200 characters), button "Read article" which works as a hyperlink to an article, and button "Add to Library" which saves article in a library (if an article is already added, the button should be" Remove from Library ").
6. Create a separate page "Library" to display a list of saved articles (show the same cards as above).
7. Articles in Library should be saved after leaving the page (you can use e.g. localStorage) and set on init.
8. Allow sorting Library ascending and descending by publishedAt date and by title.

# Requirements

1. The application should be written in VanillaJS. Do not use any frameworks, we want to test your JS knowledge.
2. Do not use libraries (e.g. Bootstrap) for styling. You can use CSS/SCSS/SASS.
3. We do not expect the app to look outstanding, but we want to see your styling skills.
4. The application should be responsive to all resolutions.
5. Tests are much appreciated, but not necessary.
6. You can use TypeScript, but it is not required
7. It is allowed to use NodeJS and NPM for setting up local hosting and/or compiling SASS/SCSS files.
8. Please put your solution in a private repository on Github and invite reviewer@profil-software.com as a collaborator (any role with at least read-only access to code) -> https://docs.github.com/en/github/setting-up-and-managing-your-github-user-account/inviting-collaborators-to-a-personal-repository
