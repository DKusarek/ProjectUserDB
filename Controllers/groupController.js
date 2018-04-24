var groupController = function (Group) {

    var post = function (req, res) {
        var group = new Group(req.body);

        if (!req.body.groupName) {
            res.status(400);
            res.send('groupName is required');
        } else {
            group.save();
            res.status(201);
            res.send(group);
        }
    }
    var get = function (req, res) {
        var query = {};
        if (req.query.genre) {
            query.genre = req.query.genre;
        }
        Group.find(query, function (err, groups) {
            if (err) {
                console.status(500).log(err);
            } else {
                res.json(groups);
            }
        })
    }
    return {
        post: post,
        get: get
    }
};

module.exports = groupController;
