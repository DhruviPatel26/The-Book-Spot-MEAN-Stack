var express = require('express');
var router = express.Router();
var ctrlHome = require("../controllers/home");
var ctrlAbout = require("../controllers/about");
var ctrlBook = require("../controllers/book");

/* GET home page. */
router.get('/', ctrlHome.index);
router.get('/about', ctrlAbout.aboutus);
router.get('/list', ctrlBook.booklist);
router.get('/display', ctrlBook.books);
router.get('/book-info/:bookid', ctrlBook.bookInfo);

router.route('/new')
    .get(ctrlBook.addNewBook)
    .post(ctrlBook.doAddNewBook);

module.exports = router;
