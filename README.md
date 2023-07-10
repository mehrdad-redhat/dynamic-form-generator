# Dynamic Form Generator
## Technical Test - Frontend Engineer - Communere

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This is a test project for Communery company interview assessment. It's developed with ReactJS, NodeJS, MongoDB and some other libraries for creating forms and handling server states.

## Requirements
 - You need the MongoDB installed on your machine.
 - If your MongoDB is secured and has a user, then you need to edit this lines in the root `/.env` file and put your DB credentials in there.
    ```dotenv
    NODE_ENV="development"
    PORT=3001
    DBNAME="form_gen_db"
    DBUSER="admin" #<---
    DBPASS="dbpass" #<---
    DBAUTHDB="admin"
    ```
    After that open the `/server/_database/index.js` file and uncomment the following lines:
    ```javascript
   const mongooseOptions = {
	        useNewUrlParser: true,
	        useUnifiedTopology: true,
	        // user: dbUserName, #<---
	        // pass: dbPass, #<---
        // authSource: dbAuthDB, #<---
    };
   ```
 - If you're running the app for the first time you need to run the `npm run seed` to seed the initial data for database.

## Available Scripts

In the project directory, you can run:

### `npm run start-develop`

This command executes the server and client simultaneously in the development environment.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.\
You will also see any lint errors in the console.\
and Use [http://localhost:3001](http://localhost:3001) to request from the server.

### `npm run start-server` (in /client directory)
Run the server separately.

### `npm run start-client` (in /client directory)
Run the client separately.

### `npm run build` (in /client directory)

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject` (in /client directory)

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
