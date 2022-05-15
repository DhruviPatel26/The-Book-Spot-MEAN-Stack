
//home controller
const index =
    function (req, res, next) {
        res.render('index', { title: 'The Book Spot' });
    };

module.exports = {
    index
};