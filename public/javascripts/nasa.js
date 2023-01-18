/**
 * The getStartDate() function takes in a endDate as a parameter,
 * and returns a startDate which is two days before the endDate.
 * @param endDate
 * @returns {Date}
 */
function getStartDate(endDate) {
    let startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 2);
    return startDate;
}

/**
 * getData(startDate, endDate): This function makes a GET request to the NASA API
 * with the given start and end dates to retrieve photos.
 * @param startDate
 * @param endDate
 * @returns {Promise<Response<any, Record<string, any>, number>>}
 */
async function getData(startDate, endDate) {

    startDate = date2string(startDate);
    endDate = date2string(endDate);

    // read data from NASA API according to specific date
    let fetchURL = 'https://api.nasa.gov/planetary/apod?api_key=EIm8OYB6igafcAuNdOu0bj5NXDv3bkcI69bBLNv0&start_date=' + startDate + '&end_date=' + endDate;
    return await fetch(fetchURL).then(status);
}

/**
 * showElement(ele) remove the "d-none" class to the given element to reveal it.
 * @param elm
 */
const showElement = (elm) => {
    elm.classList.remove("d-none");
};
/**
 * hideElement(ele) adds the "d-none" class to the given element to hide it.
 * @param elm
 */
const hideElement = (elm) => {
    elm.classList.add("d-none");
};
/**
 * toggleElement(ele) toggles the visibility of the given element
 * by adding or removing the "d-none" class (which hides the element).
 * @param elm
 */
const toggleElement = (elm) => {
    elm.classList.toggle("d-none");
};

/**
 * This function is a utility function that checks the HTTP status code of a response
 * and returns the response if it is in the range 200-299 (indicating a successful response).
 * @param response
 * @returns {Promise<never>|Promise<unknown>}
 */
function status(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}

/**
 * appendDateAndTitle: adds the title and date of the given object to the page.
 * @param obg
 */
function appendDateAndTitle(obg) {

    const cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header');

    // create rows&cols elements
    const row1 = createRow();
    const dateCol = createCol();
    const titleCol = createCol();

    let date = document.createElement('p');
    let title = document.createElement('b');

    document.getElementById("mainCol1" + obg.date).appendChild(cardHeader);
    // add photo title
    cardHeader.appendChild(row1);
    row1.appendChild(titleCol);
    titleCol.appendChild(title);
    title.classList.add('card-title');
    title.append((obg.title));
    // add photo date
    row1.appendChild(dateCol);
    dateCol.appendChild(date);
    date.classList.add('card-title');
    date.append("photo's date: " + (obg.date));
}

/**
 * appendCopyright: adds the copyright information of the given object to the page.
 * @param obg
 */
function appendCopyright(obg) {

    // create rows&cols elements
    const copyright = document.createElement('p');
    const row = createRow();
    const col = createCol();
    copyright.classList.add('card-text');

    // add photo copy-rights to html
    document.getElementById("mainCol1" + obg.date).appendChild(row);
    row.appendChild(col);
    col.appendChild(copyright);
    copyright.append("copyright: " + (obg.copyright));
}

/**
 * appendMedia: adds the media (image or video) of the given object to the page.
 * @param obg
 */
function appendMedia(obg) {
    // create rows&cols elements
    const row2 = createRow();
    const imageCol = createCol();

    // add media to an appropriate element (image/frame)
    let media;
    if (obg.media_type === "image")
        media = document.createElement('img');
    else {
        media = document.createElement('iframe');
        media.controls = true;
        media.muted = true;
    }
    media.src = obg.url;
    media.style.height = '200px';
    media.style.width = '400px';
    media.classList.add("img-thumbnail");
    media.classList.add('card-img');

    document.getElementById("mainCol1" + obg.date).appendChild(row2);
    row2.appendChild(imageCol);
    imageCol.append(media);
}

/**
 * createButtonElement(imageCounter, buttonText)
 * creates a button element with the given text and appends it to the page.
 * @param index
 * @param text
 * @returns {HTMLButtonElement}
 */
function createButtonElement(index, text) {
    const button = document.createElement('button');
    button.classList.add("btn");
    button.classList.add("btn-primary");
    button.classList.add("my-3");
    button.setAttribute('id', text + " button" + index.toString());

    // creating text to be displayed on button
    const buttonText = document.createTextNode(text);

    // appending text to button
    button.appendChild(buttonText);

    return button;
}

/**
 * this  function creates an HTML input element with a type of "text".
 * @returns {HTMLInputElement}
 */
function createCommentField(imageId) {
    const newField = document.createElement('input');
    newField.setAttribute('type', 'text');
    newField.setAttribute('id', 'comment' + imageId.toString());
    newField.setAttribute('class', 'form-control');
    newField.setAttribute('placeholder', 'comment on this photo');
    return newField;
}

/**
 * appendExplanation: adds an explanation field and button to the page for the given object.
 */
function appendComment(imageId) {

    // create rows&cols elements
    const row1 = createRow();
    row1.setAttribute('id', 'comment buttons row' + imageId.toString());
    const col1 = createCol();
    const row2 = createRow();
    row2.setAttribute('id', 'comment body' + imageId.toString());
    const col2 = createCol();
    const col3 = createCol();


    // create an icon element using a pen icon from the bi font library
    let pen = document.createElement('i');
    pen.classList.add('bi');
    pen.classList.add('bi-pencil-square');

    // creating button and comment form
    const commentButton = createButtonElement(imageId, 'add comment');
    const commentForm = document.createElement('form');
    commentForm.setAttribute('id', 'comment form' + imageId);
    let newField = createCommentField(imageId);

    let submitComment = createButtonElement(imageId, 'submitComment');
    submitComment.setAttribute('type', 'submit');

    // append button to data container
    const cardFooter = document.createElement('div');
    cardFooter.classList.add('card-footer');
    document.getElementById("mainCol1" + imageId).appendChild(cardFooter);

    cardFooter.appendChild(row1);
    row1.appendChild(col1);
    col1.appendChild(commentButton).appendChild(pen);

    commentForm.appendChild(newField);

    // append comment to data container and hide
    cardFooter.appendChild(row2);
    row2.appendChild(col2);
    col2.appendChild(commentForm);

    row2.appendChild(col3);
    col3.appendChild(submitComment);

    commentForm.append(submitComment);

    hideElement(commentForm);
}

/**
 * postComment(comment, imageId) makes a POST request to the server
 * to add the given comment for the image with the given ID
 * and then updates the comments displayed on the page.
 * @param comment
 * @param imageId
 */
function postComment(comment, imageId) {

    let userName = localStorage.getItem('userName').split('@')[0];

    (async () => {

        await fetch('/submit_comment', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                comment: comment,
                imageId: imageId,
                commentId: Date.now().toString(),
                userName: userName
            })
        }).then(res => res.json())
            .then(content => writeComments2dom(content, imageId))
            .catch((error) => console.log(JSON.parse(JSON.stringify(error))))
    })();
}

/**
 * appendExplanation: adds an explanation field and button to the page for the given object.
 * @param obg
 */
function appendExplanation(obg) {

    // create rows&cols elements
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    const row = createRow();
    const col = createCol();

    // creat explanation elements
    let explanationElement = document.createElement('p');
    explanationElement.setAttribute('id', 'explanation' + obg.date);

    // append explanation to data container and hide
    document.getElementById("mainCol2" + obg.date).appendChild(cardBody);
    cardBody.appendChild(row);
    row.appendChild(col);
    col.append(explanationElement);
    explanationElement.append(obg.explanation)
}

/**
 * This function takes in a date object and returns a string in the format "year-month-day".
 * It gets the day, month, and year from the date object and then formats it into the desired string.
 * @param date
 * @returns {string}
 */
function date2string(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${year}-${month}-${day}`;
}

/**
 * createRow creates a div element with the class "row"
 * @returns {HTMLDivElement}
 */
function createRow() {
    // create a row element to be used in creating a table
    const row = document.createElement("div");
    row.classList.add("row")
    return row;
}

/**
 * createCol creates a div element with the class "col"
 * @returns {HTMLDivElement}
 */
function createCol() {
    // create a column element to be used in creating a table
    const col = document.createElement("div");
    col.classList.add("col")
    return col;
}

/**
 * createDataTable creates a row with two columns,
 * each with the classes "col-md-12" and "col-lg-6",
 * and appends them to a div element with the ID "data"
 */
function createDataTable(imageId) {
    // create a container for all data
    const container = document.createElement('div');
    container.classList.add('container');
    container.setAttribute('id', 'data container');

    // create 1 row and 2 responsive columns
    const row = createRow();
    const col1 = createCol();
    const col2 = createCol();
    col1.classList.add("col-12");// Bootstrap class for creating a full-width column
    col1.classList.add("col-md-6"); // Bootstrap class for creating a half-width column on large screens
    col2.classList.add("col-12");
    col2.classList.add("col-md-6");

    //create cards for each col im row
    const card1 = document.createElement('div');
    const card2 = document.createElement('div');
    const cardBody = document.createElement('div');

    card1.classList.add('card');
    card2.classList.add('card');
    cardBody.classList.add('card-body');
    card1.setAttribute('id', "mainCol1" + imageId); // Set an ID for the column
    card2.setAttribute('id', "mainCol2" + imageId); // Set an ID for the column

    // insert the container into the HTML div container with the "data" ID
    document.getElementById("data").appendChild(container);

    // insert row & 2 cols to the container
    container.appendChild(row);
    row.appendChild(col1);
    col1.appendChild(card1);
    card1.appendChild(cardBody);

    row.appendChild(col2);
    col2.appendChild(card2)
}

/**
 * createButtonDelete creates a button element with the classes
 * "btn","btn-sm", and "btn-danger" and appends an icon element to it
 * @returns {HTMLButtonElement}
 */
function createButtonDelete() {

    // create an icon element using a trash icon from the bi font library
    let del = document.createElement('i');
    del.classList.add('bi');
    del.classList.add('bi-trash3-fill');

    // create a button element and append the trash icon to it
    let button = document.createElement('button');
    button.classList.add("btn") // Bootstrap class for styling buttons
    button.classList.add("btn-sm") // Bootstrap class for small buttons
    button.classList.add("btn-danger") // Bootstrap class for a red color scheme
    button.classList.add("my-3") // Add some vertical spacing
    button.appendChild(del);

    return button;
}

/**
 * deleteOldComments removes the tbody element with the given image ID from the page
 * @param imageId
 */
function deleteOldComments(imageId) {
    // delete the current comments for the image with the given ID
    if (document.getElementById('tbody' + imageId.toString())) {
        document.getElementById('tbody' + imageId.toString()).remove();
    }
}

/**
 * buildTbody creates a tbody element with the given image ID
 * and appends it to a table with the given image ID
 * @param imageId
 * @returns {HTMLTableSectionElement}
 */
function buildTbody(imageId) {
    // build the table body element for the image with the given ID
    let table = document.getElementById('comment table' + imageId.toString());
    let tbody = document.createElement('tbody');
    tbody.setAttribute('id', 'tbody' + imageId.toString());
    table.appendChild(tbody);
    return tbody;
}

function creteDeleteOption(comment, colInTable) {
    let deleteButton = createButtonDelete()
    deleteButton.setAttribute('id', 'deleteComment' + comment.commentId);
    colInTable.appendChild(deleteButton);
}

/**
 * writeComments2dom writes the given comments to the page in a table with the given image ID,
 * adding a delete button for each comment
 * @param content
 * @param imageId
 */
function writeComments2dom(content, imageId) {
    // write the given comments to the DOM for the image with the given ID
    deleteOldComments(imageId);
    let tbody = buildTbody(imageId);

    content.forEach((comment, index) => {
        // create table row and cells for each comment
        let tr = document.createElement('tr');
        let th = document.createElement('th');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        // display comment to html
        th.innerText = index;
        td1.innerText = comment.userName;
        td2.innerText = comment.comment;


        // add the row and cells to the table body
        tbody.appendChild(tr);
        tr.appendChild(th);
        tr.appendChild(td1);
        tr.appendChild(td2);

        // creates a delete button element next to comment if this user write this comment.
        if (comment.userName === localStorage.getItem('userName').split('@')[0])
            creteDeleteOption(comment, tr);

        // add an event listener to the delete button to delete the comment when clicked
        let deleteEle = document.getElementById('deleteComment' + comment.commentId)
        if (deleteEle) {
            deleteEle.addEventListener("click", () => {
                deleteComment(imageId, comment.commentId);
            });
        }
    });
}

/**
 * @param imageId
 * getComments(imageId) makes a GET request to the server
 * to retrieve the comments immediately for the image with the given ID
 * and then writes the comments to the DOM.
 */
function getComments(imageId) {
    // Asynchronously send a GET request to the server to retrieve the comments immediately for the given image
    (async () => {
        await fetch('/show_comments/' + imageId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            //Convert the response to JSON, and write the comments to DOM
        }).then(res => res.json())
            .then(content => writeComments2dom(content, imageId))
            .catch((error) => console.log(JSON.parse(JSON.stringify(error))))
    })();
}

/**
 * @param imageId
 * @param commentId
 * deleteComment(imageId, commentId) makes a DELETE request to the server
 * to delete the comment with the given ID for the image with the given ID
 * and then updates he comments displayed on the page.
 */
function deleteComment(imageId, commentId) {
    (async () => {
        await fetch('/delete_comment/' + imageId + '/' + commentId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
            .then(content => writeComments2dom(content, imageId))
            .catch((error) => console.log(JSON.parse(JSON.stringify(error))))
    })();
}

/**
 * @param imageId
 * handleClickEvents(imageId) adds event listeners
 * to the various buttons and form elements for the comments section of the page.
 * The event listeners handle showing and hiding elements,
 * posting new comments, and deleting comments.
 */
function handleClickEvents(imageId) {

    const commentFormEle = document.getElementById('comment form' + imageId.toString());
    const commentEle = document.getElementById("comment" + imageId.toString());
    const commentTable = document.getElementById("comment table" + imageId.toString());
    const addCommentButton = document.getElementById("add comment button" + imageId.toString());
    const showCommentButton = document.getElementById("show comments button" + imageId.toString());
    const submitCommentButton = document.getElementById("submitComment button" + imageId.toString());

    // by pressing appendComments button show/hide comment form
    addCommentButton.addEventListener("click", () => {
        toggleElement(commentFormEle);
    });

    // by pressing showComments button show/hide comments
    showCommentButton.addEventListener("click", () => {
        getComments(imageId);
        toggleElement(commentTable);
    });

    // by pressing submit comments - post comment to server
    submitCommentButton.addEventListener("click", (event) => {
        event.preventDefault();
        postComment(commentEle.value, imageId);
        commentEle.value = '';
    });
}

/**
 * @param imageId
 * buildCommentsTable(imageId) creates the HTML elements for the comments table
 * and appends them to the page. It also hides the table initially.
 */
function buildCommentsTable(imageId) {

    // create rows&cols elements for buttons and body
    const row1 = createRow();
    const col1 = createCol();
    const col2 = createCol();

    // create an icon element using ש eye icon from the bi font library
    let eye = document.createElement('i');
    eye.classList.add('bi');
    eye.classList.add('bi-eye-fill');

    // create show comments button
    const showCommentsButton = createButtonElement(imageId, 'show comments');
    showCommentsButton.setAttribute('type', 'click');
    document.getElementById('comment buttons row' + imageId.toString()).appendChild(col1);
    col1.appendChild(showCommentsButton).appendChild(eye);

    // creating basic comment cols
    const commentTable = document.createElement('table');
    commentTable.setAttribute('id', 'comment table' + imageId.toString());
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    const th1 = document.createElement('th');
    const th2 = document.createElement('th');
    const th3 = document.createElement('th');
    const th4 = document.createElement('th');

    // insert text to head of each col
    th1.innerText = '#-';
    th2.innerText = 'userID-';
    th3.innerText = 'comment-';
    th4.innerText = 'delete';

    // append to html data
    const cardFooter = document.createElement('div');
    cardFooter.classList.add('card-footer');
    cardFooter.classList.add('border-success');
    cardFooter.classList.add('bg-transparent');
    document.getElementById("mainCol1" + imageId).appendChild(cardFooter);
    cardFooter.appendChild(row1)
    row1.appendChild(col2);
    col2.appendChild(commentTable);
    commentTable.appendChild(thead);
    thead.appendChild(tr);
    tr.appendChild(th1)
    tr.appendChild(th2)
    tr.appendChild(th3)
    tr.appendChild(th4)

    /// hide until push show comment button
    hideElement(commentTable);
}

/**
 * main func 'showData' takes a JSON object as input,
 * creates a table for each element in the object,
 * and adds a comments form and comments table to the page for each element.
 * It also adds event listeners to various buttons and form elements for each element,
 * allowing the user to add, view, and delete comments for each element.
 * @param json
 */
function showData(json) {
    json.reverse();

    json.forEach((obg) => {

        // implement basic table for each nasa image and details in html page
        createDataTable(obg.date);

        // add photo's title & date to  html page
        appendDateAndTitle(obg);

        // add nasa image/video to html page
        appendMedia(obg);

        // add photo's copyright to html page
        appendCopyright(obg);

        // add explanation field with a button
        appendExplanation(obg);

        // add comments form to html page with a button
        appendComment(obg.date);

        //creates the HTML elements for the comments table and append to html
        buildCommentsTable(obg.date);

        // handle click on buttons - {explanation, comment, submit comment}
        handleClickEvents(obg.date, obg)

    });
}

/**
 * remove all children from a given element
 * @param element
 */
function removeChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function signOut() {
    // Asynchronously send a GET request to the server to sign out from nasa page
    (async () => {
        await fetch('/sign_out', {
            method: 'GET',
            redirect: 'follow',
        }).then(res => {
            window.location.href = res.url;
        }).catch(function (err) {
            console.info(err + " url: /sign_out");
        });
    })();
}

function createSpinner() {
    const spinner = document.createElement('div');
    spinner.setAttribute('id', 'spinner');
    spinner.classList.add('spinner-border');
    spinner.setAttribute('role', 'status');
    const srOnly = document.createElement('span');
    srOnly.classList.add('sr-only');
    srOnly.innerHTML = 'Loading...';
    spinner.appendChild(srOnly);
    return spinner;
}

//--------------------------------------------------
/**
 * document.addEventListener('DOMContentLoaded', ...):
 * This function waits for the HTML document to finish loading before running the code inside it.
 */
document.addEventListener('DOMContentLoaded', () => {
    // vars to specify limited range for nasa photos
    let endDate;
    let startDate;

    const loadMoreElement = document.getElementById("load more");
    const dataElement = document.getElementById('data');
    const signOutElement = document.getElementById("sign out");
    const submitElement = document.getElementById("submit date");

    // extract username from ejs page and display welcome message on screen
    let userName = localStorage.getItem('userName').split('@')[0];
    let text = document.createTextNode('Welcome ' + userName + '! good to see you');
    document.getElementById('welcomeText').appendChild(text);

    // insert userName to sign-out button
    let p = document.createElement('p');
    p.innerHTML = userName;
    signOutElement.appendChild(p);

    // db.Contact.findOne({where:{title: userName}, attributes:'firstName'})
    //     .then((person) => {
    //         let text = document.createTextNode('Welcome! ' + person.firstName + ' good to see you');
    //         document.getElementById('welcomeText').appendChild(text);})
    //     .catch()

    /**
     * This function sets up an event listener for the "sign out" button.
     * when clicked, user session ends, and redirect back to login page
     */
    signOutElement.addEventListener("click", () => {
        signOut();
    });

    /**
     *  This function sets up an event listener for the "submit date" button.
     *  When the button is clicked, the code inside the function is run.
     *  This code prevents the default action of the button (which is to submit a form),
     *  reads the date limit from the "getDate" input field,
     *  sets the start date to show photos from the given date.
     */
    submitElement.addEventListener("click", (event) => {
        event.preventDefault();

        // remove old data before loading new data
        removeChildren(dataElement);

        // Read date limit from user input
        const userInput = document.getElementById("getDate").value.split("-");

        userInput.length === 3 ? endDate = new Date(userInput) : endDate = new Date();

        // Set start date to show photos from
        startDate = getStartDate(endDate);

        // create spinner for loading
        let spinner = createSpinner();
        submitElement.appendChild(spinner);

        // Get photos from nasa api
        getData(startDate, endDate)
            .then(response => response.json())
            .then(json => showData(json))
            .then(() => showElement(loadMoreElement))
            .finally(() => submitElement.removeChild(document.getElementById("spinner")))
            .catch(err => document.querySelector("#data").innerHTML = "Something went wrong: " + err)

    });
    /**
     * This function listens for a click event on the element with the id "load-more".
     * When the button is clicked, the start and end dates are decremented and the function "getData" is called with the updated start and end dates.
     * The function "showData" is called with the response from the "getData" function when it resolves.
     */
    loadMoreElement.addEventListener('click', function () {
        // Decrement the start and end dates to show more photos
        startDate.setDate(startDate.getDate() - 1);
        endDate = startDate;
        startDate = getStartDate(endDate);

        // create spinner for loading
        let spinner = createSpinner();
        loadMoreElement.appendChild(spinner);

        // Load more photos from nasa api
        getData(startDate, endDate)
            .then(response => response.json())
            .then(jason => showData(jason))
            .finally(() => loadMoreElement.removeChild(document.getElementById("spinner")))
            .catch(err => document.querySelector("#data").innerHTML = "Something went wrong: " + err)
    });
});