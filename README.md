# Google OAuth using PostgreSQL

A simple application that hooks up Google OAuth with PostgreSQL.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need to have Node.js, PostgreSQL, and Postico installed along with setting up your Google OAuth. To set up Google OAuth:

1. Register your application at the Google Developer's Console.

2. Make sure you application has permissions for the Google Plus API (required for the Google Passport module we will use).

3. Make a copy of the `auth.template.js`  and rename to `auth.js`. NOTE: Do not include this file in your git repo.

4. Update the new file with your Google API credentials (from the Google Developer's Console) and the client secret for your sessions.

### Installing

1. Fork and clone this repo.

2. cd into the file in terminal.

```
$ cd Desktop/google_oauth_psql
```

3. Install all dependencies.

```
$ npm install
```

4. To set up the proper table, go into Postico and create a database called 'westonka-soar' and then create a table called 'users'.

5. Go back into terminal, and run npm start to get the application running.

```
$ npm start
```

6. Go to the port and sign in!

## Built With

* PostgreSQL
* Express
* Angular
* Node
* Google OAuth
* Passport 

## Authors

* **Antoinette** - *Initial work* - [antauth](https://github.com/antauth)
* **Alayna Buysse** - *Added pSQL* - [AlaynaGrace](https://github.com/AlaynaGrace)

## Acknowledgments

* Thank you to Antoinette, a Prime instructor, for setting up the original Google OAuth example code
