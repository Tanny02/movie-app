Movie Management System


This is a Movie Management System built using React for the frontend and Node.js (Express) for the backend, designed to allow users to add, update, view, and delete movie records. The project also includes features for uploading movie images and managing a list of movies with various properties, such as title, year, rating, and more.

Features
Add Movies: Allows users to add new movies by providing details like title, year, rating, and a valid link to a trailer or official page. The system also accepts an image file for each movie.
Update Movies: Enables users to edit movie details, such as title, year, rating, and image, with real-time validation for fields like rating, year, and link.
Delete Movies: Provides the ability to delete any movie from the database.
Movie List: Displays a list of movies with all their key details, such as title, year, rating, and image.
Validation: Enforces frontend validation for input fields, ensuring that data is correct before submission. For example, the rating is validated to be a number between 0 and 10 with one decimal point, while the year must be a four-digit number, and the link must be a valid URL.
Tech Stack
Frontend
React.js: Used for building the user interface. React is used to manage the state and render components efficiently.
Material-UI: Provides pre-built components like buttons, text fields, snackbars, and more to make the UI modern and responsive.
Axios: Used to make HTTP requests to the backend API for operations like adding, updating, and fetching movie data.
React Router: Used for navigation between different pages like the movie list page, the update movie page, etc.
Form Validation: Validation of form fields is handled on the frontend using regex patterns.
Backend
Node.js with Express: The backend is powered by Node.js and Express.js, providing RESTful API endpoints to manage movies in the database.
MongoDB: Used to store movie data, including title, year, rating, image path, and other related information.
Mongoose: An ODM (Object Data Modeling) library for MongoDB used for interacting with the database.
Additional Features
Image Upload: Allows movie images to be uploaded and stored. Images are previewed before submission.
Authentication: Basic token-based authentication (JWT) is used for securing endpoints that require authentication.
API Endpoints
GET /api/movies: Fetches all movies from the database.
POST /api/movies: Adds a new movie with title, year, rating, link, and image.
PUT /api/movies/:id: Updates an existing movie by its id, allowing updates to its title, year, rating, link, and image.
DELETE /api/movies/:id: Deletes a movie by its id.
