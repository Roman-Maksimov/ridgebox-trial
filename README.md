Ridgebox Trial Application
=========================================================

During application development was used next technologies:
 - JavaScript
 - EcmaScript 6/7
 - node.js
 - json-server
 - Babel
 - WebPack
 - SCSS/SASS
 - ReactJS
 - Redux

## Steps to build and run the application

Install NPM packages

	$ yarn install

Build the FrontEnd application

	$ yarn run build
	
Start Mock-API server for BackEnd simulation

	$ yarn run server

_* If you want to run the application in a development mode_
---

you have to run the FrontEnd in a **separate** window by this command

	$ yarn start

Now you can open the url _**`http://localhost:3000`**_ to see the application

## How to test

Basic JS & CSS code style can be tested by

	$ yarn run lint

Also you can test the JS code separately by

	$ yarn run lint:js
	
and CSS code by 

	$ yarn run lint:scss
	
_* Unit tests have not been implemented as they are not required by specs_
