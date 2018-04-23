var should = require('should'),
    sinon = require('sinon');

describe('UserController Tests:', function () {
    describe('Post', function () {
        it('should not allow empty userName field on post', function () {
            var Book = function (book) {
                this.save = function () {}
            }; //mock book object
            var req = {
                body: {
                    firstName: 'Ala',
                    lastName: 'Makota'
                }
            };
            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            };
            
            var userController = require('../Controllers/userController')(Book);
            userController.post(req,res);
            res.status.calledWith(400).should.equal(true, 'Bad Status ' + res.status.args[0][0]);
            res.send.calledWith('userName is required').should.equal(true);
        })
    })
});
