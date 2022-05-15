const mongoose = require('mongoose');
const book = mongoose.model('book');


const getBooks = function (req, res) {

    book.find().exec(function (err, bookdata) {
        if (err) {
            res
                .status(404)
                .json(err);
            return;
        }
        res
            .status(200)
            .json(bookdata);
    });
};

const createBook = function (req, res) {
    book.create({
        name: req.body.name,
        author: req.body.author,
        price: req.body.price,
        offer: req.body.offer,
        img: req.body.img,
        description: req.body.description
    }, (err, bookdata) => {
        if (err) {
            res
                .status(400)
                .json(err);
        } else {
            res
                .status(201)
                .json(bookdata);
        }
    });
};
const getSingleBook = function (req, res) {
    if (req.params && req.params.bookid) {
        book
            .findById(req.params.bookid)
            .exec((err, bookdata) => {
                if (!bookdata) {
                    res
                        .status(404)
                        .json({ "message": "bookid not found" });
                    return;
                } else if (err) {
                    res
                        .status(404)
                        .json(err);
                    return;
                }
                res
                    .status(200)
                    .json(bookdata);
            });
    } else {
        res
            .status(404)
            .json({ "message": "No bookid in request" });
    }
};
const updateBook = function (req, res) {
    if (!req.params.bookid) {
        res
            .status(404)
            .json({
                "message": "Not found, bookid is required"
            });
        return;
    }
    book.findById(req.params.bookid)
        .exec((err, bookdata) => {
            if (!bookdata) {
                res
                    .status(404)
                    .json({
                        "message": "bookid not found"
                    });
                return;
            } else if (err) {
                res
                    .status(400)
                    .json(err);
                return;
            }
            bookdata.name = req.body.name;
            bookdata.author = req.body.author;
            bookdata.price = req.body.price;
            bookdata.offer = req.body.offer;
            bookdata.img = req.body.img;
            bookdata.description = req.body.description;
            bookdata.save((err, bookdata) => {
                if (err) {
                    res
                        .status(404)
                        .json(err);
                } else {
                    res
                        .status(200)
                        .json(bookdata);
                }
            });
        }
        );
};
const deleteBook = function (req, res) {
    const bookid = req.params.bookid;

    if (bookid) {
        book
            .findByIdAndRemove(bookid)
            .exec((err, bookdata) => {
                if (err) {
                    res
                        .status(404)
                        .json(err);
                    return;
                }
                res
                    .status(204)
                    .json(null);
            });
    } else {
        res
            .status(404)
            .json({ "message": "No bookid" });

    }
};

module.exports = {
    getBooks,
    createBook,
    getSingleBook,
    updateBook,
    deleteBook
};
