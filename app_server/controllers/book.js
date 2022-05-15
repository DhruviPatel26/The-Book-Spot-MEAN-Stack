// const BookArray = [
//     {
//         img: "../images/book4.jpg",
//         name: 'If I Stay',
//         author: 'Dutton Penguin',
//         price: '$30'

//     },
//     {
//         img: "../images/book3.jpg",
//         name: 'The Backwoods Mist',
//         author: 'J. Petterson',
//         price: '$20'
//     },
//     {
//         img: "../images/book5.jpg",
//         name: 'Saving Shadows',
//         author: 'Kathleen Brooks',
//         price: '$15'
//     }

// ];
// const subArray = [
//     {
//         img: "../images/book4.jpg",
//         name: 'If I Stay',
//         author: 'Dutton Penguin',
//         price:
//         {
//             originalRate: '$30',
//             discountedRate: "$25"
//         }
//     }
// ];
// const book =
//     function (req, res, next) {
//         res.render('list-display', { Data: BookArray, title: ' The Book Spot ' });
//     };

// const books =
//     function (req, res, next) {
//         res.render('display', { Data: subArray, title: ' Not Implemented' });
//     };

// module.exports = {
//     books, book
// };


const request = require('request');
const apiOptions = {
    server: 'http://localhost:3000'
};
const _renderCreatePage = function (req, res) {
    res.render('create-new-book', {
        title: "Create New Book"
    });
};
const addNewBook = function (req, res) {
    _renderCreatePage(req, res);
};
const doAddNewBook = function (req, res) {
    const path = '/api/books';
    const postdata = {
        name: req.body.name,
        author: req.body.author,
        price: req.body.price,
        offer: req.body.offer,
        img: req.body.img,
        description: req.body.description
    };
    const requestOptions = {
        url: apiOptions.server + path,
        method: 'POST',
        json: postdata
    };
    request(
        requestOptions,
        (err, response, body) => {
            if (response.statusCode === 201) {
                res.redirect('/list');
            }
            else {
                console.log(body);
            }
        }
    );
};

const _renderHomepage = function (req, res, responseBody) {
    let message = null;
    if (!(responseBody instanceof Array)) {
        message = "API looup error.";
        responseBody = [];
    }
    else {
        if (!responseBody.length) {
            message = "No book found.";
        }
    }

    res.render('list-display', {
        books: responseBody,
        message: message
    });
};

const booklist = (req, res) => {
    const path = '/api/books';
    const requestOptions = {
        url: apiOptions.server + path,
        method: 'GET',
        json: {}
    };
    request(
        requestOptions,
        (err, response, body) => {
            _renderHomepage(req, res, body);
        }
    )
};

const _renderDetailPage = (req, res, responseBody) => {
    res.render('book-info', {
        currentbook: responseBody
    });
};

const bookInfo = (req, res) => {
    const path = `/api/books/${req.params.bookid}`;
    const requestOptions = {
        url: apiOptions.server + path,
        method: 'GET',
        json: {}
    };
    request(
        requestOptions,
        (err, response, body) => {
            _renderDetailPage(req, res, body);
        }
    )
};
// const book =
//     function (req, res, next) {
//         res.render('list-display', { Data: BookArray, title: ' The Book Spot ' });
//     };

const books =
    function (req, res, next) {
        res.render('display', { title: ' Not Implemented' });
    };

module.exports = {
    addNewBook, doAddNewBook, booklist, bookInfo, books
};
