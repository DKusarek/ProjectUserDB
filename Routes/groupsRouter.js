var express = require('express');

var routes = function (User) {
    var userRouter = express.Router();
    var userController = require('../Controllers/userController')(User);
    userRouter.route('/')
        .post(userController.post)
        .get(userController.get);

    userRouter.use('/:userId', function (req, res, next) {
        User.findById(req.params.userId, function (err, user) {
            if (err) {
                res.status(500).send(err);
            } else if (user) {
                req.user = user;
                next();
            } else {
                res.status(404).send('User not found');
            }
        });
    });

    userRouter.route('/:userId')
        .get(function (req, res) {
            res.json(req.user);
        })
        .put(function (req, res) {
            req.user.userName = req.body.userName;
            req.user.password = req.body.password;
            req.user.firstName = req.body.firstName;
            req.user.lastName = req.body.lastName;
            req.user.dateOfBirth = req.body.dateOfBirth;
            req.user.save(function (err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.user);
                }
            });
        })
        .patch(function (req, res) {
            if (req.body._id) {
                delete req.body._id;
            }
            for (var u in req.body) {
                req.user[u] = req.body[u];
            }
            req.user.save(function (err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.user);
                }
            });
        })
        .delete(function (req, res) {
            req.user.remove(function (err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(204).send('User removed');
                }
            });
        });
    return userRouter;
};

module.exports = routes;
