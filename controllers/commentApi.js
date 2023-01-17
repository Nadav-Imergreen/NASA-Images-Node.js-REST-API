const db = require('../models');

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
        .catch((err)=>{res.send(err)});
};

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

        // Find all comments for the current image, and send to client
        db.Comment.findAll({where: {imageId: req.body.imageId}, attributes: ['userName', 'comment', 'commentId']})
            .then(post => {
                res.json(post);
                res.end();
            })
            .catch((err)=>{res.send(err)});
    } else
        res.status(400).send({'message': 'comment empty'});
};

/**
 * DELETE a comment for a specific image.
 */
exports.deleteComment = (req, res) => {
    console.log('commentId' + req.params.commentId);

    //find the comment with the specified commentId and delete it
    db.Comment.findOne({where: {commentId: req.params.commentId}})
        .then(comment => {
            if (!comment) {
                res.get404(req, res)
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
                .catch((err) => {
                    res.send(err)
                });
        })
        .catch((err) => {
            res.send(err)
        });
};
