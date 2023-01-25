const db = require('../models');

/**
 * a middleware router that check if user is login to site before every request
 * @param req
 * @param res
 * @param next
 */
exports.checkSession = (req, res, next) => {
    req.session.login ? next() : res.status(400).send({'message': 'login required'});
};

/**
 * Immediately GET a list of comments for a specific image.
 * @param req
 * @param res
 */
exports.getComments = (req, res) => {
    let Id; // extract image id from req according to req definition
    req.body.imageId ? Id =  req.body.imageId : Id =  req.params.imageId;

    // Find all comments for the current image and send the updated comments as a response
    db.Comment.findAll({where: {imageId: Id}, attributes: ['userName', 'comment', 'commentId']})
        .then(post => {
            if (post.length >= 1)
                res.json(post)
            else
                res.status(404).send({'message': 'no comments found'});
            res.end();
        }).catch((err) => res.status(400).send({'message': err}));
};

/**
 *  POST a new comment.
 */
exports.postComment = (req, res) => {

    // add new comment to comment table if comment not empty
    if (req.body.comment) {
        db.Comment.create({
            comment: req.body.comment,
            userName: req.body.userName,
            imageId: req.body.imageId,
            commentId: req.body.commentId
        }).then(() => this.getComments(req, res)
        ).catch((err) => res.send(err));
    } else
        res.status(400).send({'message': 'comment empty'});
};

/**
 DELETE a comment for a specific image.
 */
exports.deleteComment = (req, res) => {
// Find the comment with the specified commentId and delete it
    db.Comment.findOne({where: {commentId: req.params.commentId}})
        .then(comment => comment ? comment.destroy() : res.get404(req, res))// Delete the comment if found
        .then(() => this.getComments(req, res))
        .catch((err) => res.send(err));
};