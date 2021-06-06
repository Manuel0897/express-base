## Express Base

- This is an express template with a connection to a mongodb for a basic CRUD with authentication for passport.js

**Table of Contents**

[TOCM]

[TOC]

### DB Connection

You can use it with a db and connection from mongo [mongo atlas](http:/https://www.mongodb.com/cloud/atlas/ "mongo atlas").
The requirements for the connections are in the .env.example:
- DB_USER
- DB_PASSWORD
- DB_HOST
- DB_NAME

### Functions

The program includes the basic CRUD services:
- getItems (All)
- getItem (Specific item)
- createItem
- updateItem
- deletedItem

### How to use
Once you have your database in atlas:

1. Clone the project:
	`https://github.com/Manuel0897/express-base.git`
	
2. Install the dependencies:
	`npm install`
	
3. Create the .env file with your config.
4. Run the project:
	`npm run dev` or `npm start`
