# Book Library App

- [Book Library App](#library-app)
  - [About](#about)
  - [Getting Started](#getting-started)
    - [Installation (for local setup):](#installation-for-local-setup)
  - [Project Review](#project-review)
    - [Main Takeaways:](#main-takeaways)
    - [Future ideas:](#future-ideas)

## About

**Date of completion: 7/6/2020**

**Authors: Sweta Shah**

**Deployed Website: **

This is a full-stack Project. A REST API was developed with **Java** using [SptingBoot](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/) framework. A React client was developed using **TypeScipt**.For Database I have used SQL for storing books data.

This is a full stack application where user can see the books which are available for then to borrow.They can view each and every book in details.For each book they can also write a review and checkout the book for borrow from library.

User must sign in for checkout and reviews.
Sign in Page developed by the **OKTA** Login widget.

Credentials for signin are as follows :-
Username:-testuser@gmail.com
Password:-test1234!

## Getting Started

### Installation (for local setup):

- Clone the server git repo

```
    git clone https://github.com/Sweta8430/Library-App.git
```

- Install dependencies in root of project

  ```
  cd server
  Ensure maven is installed on your system.
  ```

- Start server by entering `sever` directory (ensure nothing is already running on port: 8080).
  ```
  cd server
  mvn -version
  mvn clean install
  Run the **application** file to check the server is up and running.
  ```

-Clone the Client

```
    git clone
    https://github.com/Sweta8430/Library-App.git
```

- Start react app by entering `client` directory (ensure nothing is already running on port: 3000).

  ```
  cd client
  npm install
  npm start
  ```

## Project Review

### Main Takeaways:

- Developed REST API using SpringBoot and Java.
- Using TypeScript instead of JavaScript to build a React APP.
- Learned about Okta developer and Jwt Tokens for secure version.
- Learned bootstrap in detail.

### Future ideas:

- Can reserve a book functionality has been develoed.
- Can create an admin role sign in where they can add more books.
