$(document).ready(function () {


    initData();

    $('#toogle-create').click(function () {
        $('form').animate({ height: "toggle", opacity: "toggle" }, "slow");
        return false;
    });

    $('#loginBtn').click(function (e) {
        e.preventDefault();
        ValidateInput();
    });

    $('#toogle-signin').click(function () {
        $('form').animate({ height: "toggle", opacity: "toggle" }, "slow");
        return false;
    });

    $('#lostpasswordBtn').click(function () {
        forgot_pw();
    });

    $('#logout').click(function () {
        localStorage.setItem("loggedInUser", null);
        LogInCheck();
        return false;
    });

    $('#create').click(function () {
        var user = { name: $('#create-name').val(), email: $('#create-email').val(), pw: $('#create-pw').val() }
        var users = JSON.parse(localStorage.getItem("users"));
        if (users === null) {
            users = [];
        }
        users.push(user);
        console.log('users: ', users);
        localStorage.setItem("users", JSON.stringify(users));
        $('form').animate({ height: "toggle", opacity: "toggle" }, "slow");
        return false;
    });


    function initData() {
        if (JSON.parse(localStorage.getItem("users") != null, localStorage.getItem("users")).length < 1) {
            var user = { name: "Nicolai", email: "Nicolai@gmail.com", pw: "mensel" }
            var users = JSON.parse(localStorage.getItem("users"));
            users.push(user);
            localStorage.setItem("users", JSON.stringify(users));
        }
    }

    // functions

    function forgot_pw() {
        alert("Too bad!");
    }


    function ValidateInput() {
        var inputUsername = document.getElementById("username").value;
        var inputPassword = document.getElementById("password").value;
        console.log('userName', inputUsername);
        console.log('Password', inputPassword);

        var localUsers = JSON.parse(localStorage.getItem("users"));

        console.log('users', localUsers);
        for (i = 0; i < localUsers.length; i++) {
            if (localUsers[i].name == inputUsername && localUsers[i].pw == inputPassword) {
                localStorage.setItem("loggedInUser", JSON.stringify({ user: inputUsername, pw: inputPassword }));
                var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
                
                console.log('loggedInUser', loggedInUser);

            }

        }

        LogInCheck();
        return false;
    }
    function LogInCheck() {
        if (JSON.parse(localStorage.getItem("loggedInUser")) != null) {
            var localUsers = JSON.parse(localStorage.getItem("users"));
            $('.loggedin-page').show();
            $('.login-page').hide();
            if (localUsers != null) {
                var userList = $("#userlist");
                userList.empty();
                for (i = 0; i < localUsers.length; i++) {
                    $("<li class=\"message\"><a >" + localUsers[i].name + "</a></li>").appendTo(userList);
                }
            }
        }
        else {
            $('.loggedin-page').hide();
            $('.login-page').show();
        }
        return false;

    }
    LogInCheck();

});
