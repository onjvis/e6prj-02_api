# E6PJ-02 API
API for the E20_E6PJ-02.
For our semester project we needed to create API to be able to store and access the data collected by the bins. 


## Architecture

As an API architecture we chose to use Express Node.js server, together with the MongoDB as the database. This choice was inspired by the MEAN Stack architecture.
To fully fulfill the MEAN Stack architecture we decided to create an Angular app above the API and the database.

## Database

As database to store and access the data we decided to chose MongoDB. This choice was heavily influenced by the lectures on Web Development where we working with this database system. On top of that, its flexible document structure and Atlas cloud storage convinced us to use it.

## Routes

To able to access the API, we have to navigate to the `/api` route. We provide these routes for the users to use:

* `/api/auth/register` for registering new users.
* `/api/auth/login` for logining existing users.
* `/api/bin` for acccessing existing bins and creating new bins.
* `/api/bin/:binID` for accessing and updating the bin detail.
* `/api/warning` for acccessing existing warnings and creating new warnings.
* `/api/warning/:warningID` for accessing the warnings.
* `/api/route` for acccessing existing routes and creating new routes.
* `/api/route/:routeID` for accessing the routes.
* `/api/user` for acccessing user list (only admins). 


## Deployment

For the deployment of the API we chose Heroku, since it offers free app and it is convenient and easy to use.
The API can be accessed on this website: `https://e6prj-02-api.herokuapp.com`.
We recommend using HTTP request tool (such as Postman) to perform GET, POST and PUT requests.

## Changelog


| Date       | Log                                   |
| ---------- | ------------------------------------- |
| 07-01-2021 | Fixed bin route and added user route  |
| 05-01-2021 | Minor fixes, added admin-only actions |
| 03-01-2021 | First version of API                  |  
