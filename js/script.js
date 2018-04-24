$(document).ready(function () {
    var showCreateUserForm = $('#showCreateUserForm');
    var formCreateUser = $('#formCreateUser');
    var showReadUserOutput = $('#showReadUserOutput');
    var outputUser = $('#outputUser');
    var showDeleteUserForm = $('#showDeleteUserForm');
    var formDeleteUser = $('#formDeleteUser');
    var showUpdateUserForm = $('#showUpdateUserForm');
    var formUpdateUser = $('#formUpdateUser');
    var createUser = $('#createUser');
    var updateUser = $('#updateUser');

    var createGroup = $('#createGroup');
    var readGroup = $('#readGroup');
    var updateGroup = $('#updateGroup');
    var deleteGroup = $('#deleteGroup');
    var outputGroup = $('#outputGroup');
    var numberOfItems = 0;


    //CREATE

    showCreateUserForm.click(function () {
        formCreateUser.toggleClass('hidden');
    });


    createUser.click(function () {
        //validateCreateUserFields(); 
        var data = JSON.stringify({
            userName: $('#userName').val(),
            password: $('#password').val(),
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val(),
            dateOfBirth: $('#dateOfBirth').val()
        });
        console.log(data);
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8000/api/users',
            data: data,
            contentType: "application/json",
            success: function (data, status, xhr) {
                console.log('Status: ' + status);
            },
            error: function (xhr, status, error) {
                alert('Error occured: ' + status);
            }
        });

        formCreateUser.toggleClass('hidden');
    });


    //READ

    showReadUserOutput.click(function () {
        var data = {};
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8000/api/users',
            success: function (data, status, xhr) {
                console.log('Status: ' + status);
                var html = "";
                $(data).each(function () {

                    html +=
                        '<p><i>userName: </i>' + this.userName + '</p>' +
                        '<p><i>password: </i>' + this.password + '</p>' +
                        '<p><i>firstName: </i>' + this.firstName + '</p>' +
                        '<p><i>lastName: </i>' + this.lastName + '</p>' +
                        '<p><i>dateOfBirth: </i>' + this.dateOfBirth + '</p><br/><br/>';


                });
                outputUser.html(html);
                outputUser.toggleClass('hidden');
            },
            error: function (xhr, status, error) {
                alert('Error occured: ' + status);
            }
        });
    });

    //Update

    showUpdateUserForm.click(function () {
        formUpdateUser.toggleClass('hidden');
        var data = {};
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8000/api/users',
            success: function (data, status, xhr) {
                var html = '<table>';
                $(data).each(function (i) {

                    html +=
                        '<tr><td><i>userName: </i>' + this.userName + '</td><td><input name="updateRadio" type="radio" id="radio' + i + '"><input type="hidden" id="inputU' + i + '" value="' + this._id + '"></td></tr>';
                    numberOfItems = i;
                });
                html += '</table><br><button id="showUserDataToUpdate" class="btn btn-info btn-large btn-light submitButton">Update</button>';
                formUpdateUser.html(html);
            },
            error: function (xhr, status, error) {
                alert('Error occured: ' + status);
            }
        });

    });

    formUpdateUser.on('click', '#showUserDataToUpdate', function () {
        for (let i = 0; i <= numberOfItems; i++) {
            var radioId = '#radio' + i;
            var inputIdU = '#inputU' + i;
            var html = "";
            if ($(radioId).is(":checked")) {
                console.log(radioId);
                var url = 'http://localhost:8000/api/users/' + $(inputIdU).val()
                $.ajax({
                    type: 'GET',
                    url: url,
                    success: function (data, status, xhr) {
                        console.log("ss");
                        html += '<table><tr>' +
                            '<td><label for="userNameU">userName</label></td>' +
                            '<td><input type="text" name="userNameU" id="userNameU" value="' + data.userName + '"></td>' +
                            '</tr><tr><td><label for="passwordU">Password</label></td>' +
                            '<td><input type="password" name="passwordU" id="passwordU" value="' + data.password + '"></td>' +
                            '</tr><tr><td><label for="firstNameU">firstName</label></td>' +
                            '<td><input type="text" name="firstNameU" id="firstNameU" value="' + data.firstName + '"></td>' +
                            '</tr><tr><td><label for="lastNameU">lastName</label></td><td>' +
                            '<input type="text" name="lastNameU" id="lastNameU" value="' + data.lastName + '"></td></tr>' +
                            '<tr><td> <label for="dateOfBirthU">dateOfBirth</label></td><td> ' +
                            '<input type="date" name="dateOfBirthU" id="dateOfBirthU" value="' + data.dateOfBirth + '"></td></tr></table><button id="updateUser" class="btn btn-info btn-large btn-light submitButton">Update</button><input id="userToUpdate" type="hidden" value="' + data._id + '">';

                        formUpdateUser.html(html);
                    },
                    error: function (xhr, status, error) {
                        alert('Error occured: ' + status);
                    }
                });

            }
        }

    });

    formUpdateUser.on('click', '#updateUser', function () {
        var inputId = $('#userToUpdate').val();
        var data = JSON.stringify({
            userName: $('#userNameU').val(),
            password: $('#passwordU').val(),
            firstName: $('#firstNameU').val(),
            lastName: $('#lastNameU').val(),
            dateOfBirth: $('#dateOfBirthU').val()
        });
        var url = 'http://localhost:8000/api/users/' + inputId;
        console.log(data);
        console.log(url);
        $.ajax({
            type: 'PUT',
            url: url,
            data: data,
            contentType: "application/json",
            success: function (data, status, xhr) {
                console.log('Status: ' + status);
            },
            error: function (xhr, status, error) {
                alert('Error occured: ' + status);
            }
        });
        formUpdateUser.toggleClass('hidden');
    });

    //DELETE

    showDeleteUserForm.click(function () {
        formDeleteUser.toggleClass('hidden');
        var data = {};
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8000/api/users',
            success: function (data, status, xhr) {
                var html = '<table>';
                $(data).each(function (i) {

                    html +=
                        '<tr><td><i>userName: </i>' + this.userName + '</td><td><input type="checkbox" id="checkbox' + i + '"><input type="hidden" id="input' + i + '" value="' + this._id + '"></td></tr>';
                    numberOfItems = i;
                });
                html += '</table><br><button id="deleteUser" class="btn btn-info btn-large btn-light submitButton">Delete</button>';
                formDeleteUser.html(html);
            },
            error: function (xhr, status, error) {
                alert('Error occured: ' + status);
            }
        });

    });

    formDeleteUser.on('click', '#deleteUser', function () {
        for (let i = 0; i <= numberOfItems; i++) {
            var checkboxId = '#checkbox' + i;
            var inputId = '#input' + i;
            if ($(checkboxId).is(":checked")) {
                var url = 'http://localhost:8000/api/users/' + $(inputId).val();
                $.ajax({
                    type: 'DELETE',
                    url: url,
                    success: function (data, status, xhr) {
                        console.log('Status: ' + status);
                    },
                    error: function (xhr, status, error) {
                        alert('Error occured: ' + status);
                    }
                });
            }
        }

        formDeleteUser.toggleClass('hidden');
    });
});
