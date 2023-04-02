# ex6-express-neviiim-ex6_nadav_imergreen_moshe_namdar
Authors: Moshe Namdar & Nadav Imergreen; emails: moshenam@edu.hac.ac.il nadavyi@edu.hac.ac.il

## Introduction
In this exercise, we have designed and built a "social" site for displaying photos with user comments.
The images are NASA space images that come up every day, using an API that allows access to the daily images.

## Dependencies
- express 
- EJS
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
