$(document).ready(function () {
    var createUser = $('#createUser');
    var readUser = $('#readUser');
    var updateUser = $('#updateUser');
    var deleteUser = $('#deleteUser');
    var outputUser = $('#outputUser');

    var createGroup = $('#createGroup');
    var readGroup = $('#readGroup');
    var updateGroup = $('#updateGroup');
    var deleteGroup = $('#deleteGroup');
    var outputGroup = $('#outputGroup');

    createUser.click(function () {
        alert("click");
    });
    readUser.click(function () {
        var data = {};
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8000/api/users',
            success: function (data) {
                console.log('success');
                var html = "";
                for (var index in JSON.stringify(data)) {
                    if (data[index]) {
                        html +=
                            '<p><i>userName: </i>' + data[index].userName + '</p>' +
                            '<p><i>password: </i>' + data[index].password + '</p>' +
                            '<p><i>firstName: </i>' + data[index].firstName + '</p>' +
                            '<p><i>lastName: </i>' + data[index].lastName + '</p>' +
                            '<p><i>dateOfBirth: </i>' + data[index].dateOfBirth + '</p><br/><br/>';
                    }

                }
                outputUser.html(html);
            }
        });
    });
});
