var express = require('express');
var router = express.Router();
flash = require("connect-flash");
const path = require('path');

User = require("../models/user");


/* GET home page. */
router.get('/', function (req, res, next) {
    User.find({}, function (err, list) {
        if (err) {
            console.log(err);
        } else {

            res.render("home", {
                list: list
            });
        }
    });
});


router.get('/create', function (req, res, next) {
    res.render("create");

});


router.post("/create", (req, res) => {

    var name = req.body.name;
    var email = req.body.email;
    var newItem = {
        name: name,
        email: email
    }
    User.create(newItem, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {

            res.redirect("/");
        }
    })
});


router.post("/update", function (req, res) {
    res.render("update", {
        name: req.body.name,
        email: req.body.email,
        id: req.body.id
    });
});


router.post("/:id/update", function (req, res) {
    User.findByIdAndUpdate(req.params.id).exec(function (err, list) {
        if (err) {
            console.log(err);
            res.redirect('/');
        } else {

            //redirect somewhere(show page)

            list.name = req.body.name;
            list.email = req.body.email;
            list.save();

            res.redirect('/');
        }
    });
});


router.post("/:id/delete", (req, res) => {

    User.findByIdAndRemove(req.params.id, function (err) {
        if (err) {} else {

            res.redirect("/");
        }
    });


});


module.exports = router;