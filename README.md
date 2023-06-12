# Book Library App

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#user-stories">User Stories</a></li>
    <li><a href="#myapproach">My Approach</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#component-hirarchy">Component hirarchy</a></li>
    <li><a href="#problem-statements">Problem Statements</a></li>
    <li><a href="#project-review-and-roadmap">Project Review and Roadmap</a></li>
  </ol>
</details>

## About the project
Book Library App Where you can see all the books available to borrow in addition to that reviews from other users for an individual book available in the libray. Also as Signedin user you can Reserce the book as well as you can post a re view for each book.

The project was to create a full-stack application by implementing a backend (SpringBoot/Java/SQL) front-end(React && TypeScript). The projects purpose is to demonstrate my ability to implement as a Full Stack Developer into TDD environment.

## User Stories

```
As a user 
You are able to see all the available books in a library

As a user 
When you click on a book you are able to see the reviews left by the other users 
for a particular book

As a user
you are able to signin and signout

As a signed in user
you are able to reserve a book

As a signed in user
You are only able to reserve 5 books at a time

As a signed in user
you are able to post a review for an individual book.
```
## My Approach

Initially i have taken each user story as a requirement and break it down in to front end and backend requirements.

My approach is to start with the backend where i design my tables and constraints and insert the data and the run the query with the help of SQL workbench to see the datas are there as per expectation.

Then On Intellij I have created the Entities/Repositories /Service and controller for individual stories.

When my route(HTTP request) is created for a user story i have always checked on Postman.Once its successfully giving the desired result i have started with my Frontend part where my API is ready to work with.

With the Frontend Requirements i have designed my mocks UI and component Hirarchy to begin with.

## Getting Started

#### Front-end Dependencies

```
npx create-react-app client --template typescript
npm i axios @types/axios
npm i react-router-dom @types/react-router-dom
npm i bootstrap
```

#### Back-end Dependencies

```
Created the project with Spring initializer :- https://start.spring.io/
Where Java 17 and Spring boot and Maven
Dependencies included are
- JpaRepositories
- lombok
- My SQL driver
- Spring data JPA
```

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

- Clone the Client

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

