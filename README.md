NASA Images" forum site

Author: Nadav Imergreen

## Introduction
This project is a web application that allows users to view the image of the day from NASA and leave comments on the images. 
The application is built using a combination of technologies including Express.js, EJS, JavaScript, HTML, and CSS. 
The application is built using the MVC (Model-View-Controller) pattern, with Node.js and Express.js as the server-side technology, and EJS as the template engine. 
This application also utilizes a relational database to store the users and their comments. 
This allows for the linking of user information with their respective comments, providing a more robust and efficient method for managing the data.
Users can add and delete comments on the images, and the application allows for dynamic updates to the page as comments are added or deleted.
This project demonstrates a solid understanding of web development principles and technologies, 
including server-side and client-side programming, database management, and web application design.

## Dependencies
- express 
- EJS
- SQLite3 database
- full REST-API
- sequelize
- bcrypt
- etc.

## Functionality
- Entering the website requires registering an account. On the main page (login page),
  the user will need to click on the "register" link to access the registration page.
- In the registration page, the user will need to enter their email, first name, and last name (each email can
  be used once). After submitting the registration form, the  user will be prompted to choose a password and
  confirm it (within 30 seconds) to complete the registration.
- If the registration is successful, the user will be directed to the login page where they
  can enter their email and password to access the feed page. 
- The feed page allows the user to:
  - Browse the images of the NASA website, in the Astronomy Picture of the Day database up to a specific date.
  - Adding a comment to images in the form of text is limited to 128 characters.
  - The user can also remove only his own comment (based on username).
  - The site will display images in this way:
    - The interface will display an input to select a date (a deductive value as the current date) 
      and the site will display the images up to this date (in descending order as is customary in feed).
    - The user will be able to choose some other valid date, and refresh the displayed images up to this date.
    - The site will fetch several images and display the relevant NASA information next to them 
      (date, title, explanations, copyright) and the list of comments for each image (with username and comment).
    - Comments belonging to the current user, who can be identified by the name, will receive a delete button that
      will allow the user to delete a specific comment he wrote.
    - To easily access the rest of the feed of photos, the user will be able to do so in a convenient way: 
      by infinite scrolling at the end of the page which will bring the next 3 photos if they exist.
