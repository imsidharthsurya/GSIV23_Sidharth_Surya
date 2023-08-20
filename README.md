# Movie App
## Get the list of upcoming movies or search for any movie
React Based dynamic web app to get the movie details. Created By Sidharth Surya.

### How to run the app in your local machine
- 1st clone the repo then do npm install to install the dependency package.
- create .env file in the root of your project folder and put your access token created from tmdb website inside it with name **REACT_APP_API_TOKEN**.
    e.g. REACT_APP_API_TOKEN=eyJhbGciOiJIUzI1sdfserewjckdsckkslj
- To get the API Token:- Create a personal account at: https://www.themoviedb.org/account/signup Once you have created an account, go to: https://www.themoviedb.org/settings/api to create an API key
- Now do npm start to run the app locally in your machine


## Features

- Search movie implemented using concept of debouncing which decreases the no. of api calls upon entering the key in search input box.
- Get the list of upcoming movies in infinite scroll.
- React router implemented.
- Conditional rendering implemented which will show NA if the data is not present in the api response also handled the case if no movie with that particular keyword found.
- calling reocurring functions from utils.js which increases code readability & reusability.


## Further Improvements

- On Frontpage can add 2 more pages with currently trending & highest rated movies.
- implement carousel on top of the 1st page to give the app a nice look.
