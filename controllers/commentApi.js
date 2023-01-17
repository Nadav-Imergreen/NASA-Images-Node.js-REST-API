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

    // add new comment to comment table if comment not empty
    if (req.body.comment !== '') {
        db.Comment.create({
            comment: req.body.comment,
            userName: req.body.userName,
            imageId: req.body.imageId,
            commentId: req.body.commentId
        });

        // Find all comments for the current image
        db.Comment.findAll({where: {imageId: req.body.imageId}, attributes: ['comment']})
            .then(post => {
                // Send the updated list of comments for the current image as a response
                console.log('comment', post);
                res.json(post);
                res.end();
            })
            .catch()
    }
    else
        res.status(400).send({'message': 'comment empty'});
};

/**
 * GET a list of comments for a specific image if was update in tle last 15 seconds.
 */
exports.autoGetComments = (req, res) => {

    // if change appenf in last 15 seconds - update comments
    if (Date.now() - lastUpdate > 15000)
        // Send the list of comments for the current image as a response if image id correct
        db.Comment.findAll({where: {imageId: req.params.imageId}, attributes: ['comment']})
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
    db.Comment.findAll({where: {imageId: req.params.imageId}, attributes: ['userName', 'comment', 'commentId']})
        .then(post => {
            res.json(post);
            res.end();
        })
        .catch()
};

/**
 * DELETE a comment for a specific image.
 */
exports.deleteComment = (req, res) => {
    console.log('commentId'  + req.params.commentId);

    //find the comment with the specified commentId and delete it
        db.Comment.findOne({where:{commentId: req.params.commentId}})
            .then(comment => {
                if (!comment) {
                    // handle case where comment is not found
                }
                return comment.destroy()
            })
            .then(() => {
                // Find all comments for the current image, and send the updated comments as a response
                db.Comment.findAll({where: {imageId: req.params.imageId}, attributes: ['userName', 'comment', 'commentId']})
                    .then(post => {
                        res.json(post);
                        res.end();
                    })
                    .catch()
            })
            .catch(error => {
                // handle error
            });
};
