const router = require('express').Router();
const Review = require('../../lib/models/Review');
const Reviewer = require('../../lib/models/Reviewer');
const Film = require('../../lib/models/Film');

router
    .post('/', (req, res, next) => {
        new Review(req.body)
            .save()
            .then(mongoRes => res.send(mongoRes))
            .catch(next);
    })
    .get('/', (req, res, next) => {
        Review.find({})
            .limit(100)
            .select('rating review film')
            .populate('film')
            .lean()
            .then(mongoRes => {
                mongoRes.forEach(rev => {
                    rev.film = rev.film.title;
                });
                res.send(mongoRes);
            })
            .catch(error => {
                debugger;
            });
    })

;



module.exports = router;