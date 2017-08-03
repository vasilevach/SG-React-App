# This project is based on https://github.com/werein/react

# Installation
To install this project run by its [documents](https://github.com/werein/react) or quickly do the following steps:
* install dependancies:
```javascript
npm i
```
* start webpack dev server on one terminal
 ```javascript
npm start
```
* start the express server on another terminal
```javascript
npm run server
```

# Few notes:
* all requirements from the task are met
* there is a simple API for C,R,U,D on express on http://localhost:8181/api/products, http://localhost:8181/api/product/[:name]
* there is a simple API for permissions, also on express http://localhost:8181/api/permissions
* client side model uses Redux
* play with the permissions in server.js file
* disclaimer: products are C,U,D based on "name" as unique identifier
