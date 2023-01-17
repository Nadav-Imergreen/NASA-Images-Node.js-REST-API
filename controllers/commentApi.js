// Require the Comment and commentList modules to handle comments

const db = require('../models');
let lastUpdate = 0;

/**
 * Declare a function to find all comments for a specific image
 * @param commentList
 * @param imageId
 * @returns {*[]}
 */
function findCommentsInImage(commentList, imageId) {
    let commentsInImage = [];
    commentList.forEach((comment) => {
        if (comment.imageId === imageId)
            commentsInImage.push(comment)
    });
    return commentsInImage;
}

/**
 *  POST a new comment.
 */
exports.postComment = (req, res) => {
console.log('in post comment');
    // add new comment to comment table if comment not empty
    if (newComment.comment !== '')
        db.Comment.create({
            comment: req.body.comment,
            userId: req.body.userId,
            imageId: req.body.imageId,
            commentId: req.body.commentId
        });
    else
        res.status(400).send({'message': 'comment empty'});

    // Find all comments for the current image
    db.Comment.findAll({where: {postId: req.body.imageId}, attributes: ['comment']})
        .then(post => {
            // Send the updated list of comments for the current image as a response
            lastUpdate = Date.now();
            res.json(post);
            res.end();
        })
        .catch()
};

/**
 * GET a list of comments for a specific image if was update in tle last 15 seconds.
 */
exports.autoGetComments = (req, res) => {
    
    // if change appenf in last 15 seconds - update comments
    if (Date.now() - lastUpdate > 15000)
        // Send the list of comments for the current image as a response if image id correct
        db.Comment.findAll({where: {postId: req.body.imageId}, attributes: ['comment']})
            .then(post => {
                // Send the updated list of comments for the current image as a response
                res.json(post);
                res.end();
            })
            .catch()

    // else
    //    res.json({});

    res.end();
};

/**
 * Immediately GET a list of comments for a specific image.
 */
exports.getComments = (req, res) => {

    // Find all comments for the current image, and send the list of comments as a response
    db.Comment.findAll({where: {postId: req.body.imageId}, attributes: ['comment']})
        .then(post => {
            res.json(post);
            res.end();
        })
        .catch()

    res.end();
};

/**
 * DELETE a comment for a specific image.
 */
exports.deleteComment = (req, res) => {

    //find the comment with the specified commentId and delete it
        db.Comment.findOne(commentId)
            .then(comment => {
                if (!comment) {
                    // handle case where comment is not found
                }
                return comment.destroy()
            })
            .then(() => {
                // Find all comments for the current image, and send the updated comments as a response
                db.Comment.findAll({where: {postId: req.body.imageId}, attributes: ['comment']})
                    .then(post => {
                        lastUpdate = Date.now();
                        res.json(post);
                        res.end();
                    })
                    .catch()
            })
            .catch(error => {
                // handle error
            });

    res.end();
};
