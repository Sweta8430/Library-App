# Book Library App

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#user-stories">User Stories</a></li>
    <li><a href="#myapproach">My Approach</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#server-architecture">Server Architecture</a></li>
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
## Server Architecture

In spring boot component i have <b>Entity</b>, <b>Repositories</b>, <b>Services</b> ,<b>Controllers</b> who communicate with Server(SQL) and clients(React).

The Spring Boot server
Entities defines the Table name and the columns of the specified Table Name.
In order to access data from the database controllers communicate with services and repositories which are interfaces for interacting with the SQL.
Services where all the business logic lies.
The Spring Boot server receives HTTP requests via REST controllers. These determine the action to be taken determined on the type of request received.

Overall,Serverside applocation follows a typical layered architecture pattern. TheController serves as the entry point for API requests, delegates tasks to the Service, which further interacts with the Repository for database operations. The Review entity represents the table in the database and is persisted and retrieved using JPA annotations and methods provided by Spring Data JPA.

These components are sitting within the Spring Boot framework and rely on functionality provided Spring Boot. For example annotations like @Autowired to connect instances of our components together for us or using application.properties to define properties to be used across the server as a whole.

## Project Review and Roadmap

This project is really interesting piece of learning as a professional level.

While working with totally new technologies is a different experience together and able to know how they are different from each other.

Say for an Example:
Mongo DB is document based database NOSQL database which is flexible and adaptable while SQL is structured dataabase where all the things are defined and data are stored in table format.
Spring boot framwork itself provide so many inbuild libraries so its easy to develop simple code.
How Java is robust and scalable compare to Java script.

Features i would like to add to my Application.

- More tesing for each and every components to make app robust.
- Add more HTTP request like DELETE
- Add Role as a admin where he can reply to user reviews.
- Making it more secure by adding JWT tokens in detail.
- Instead of using Okta Developer i can explore more ways to use Sign in.





