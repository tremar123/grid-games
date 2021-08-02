var selectedInput = null;
let string;
let confirmation;
let password;
var hasNumber = /\d/;

// check if there is any input
$(function() {
    $("input").focus(function() {
    selectedInput = this;
    this.style.borderColor = "#5ccfe6";
    this.style.boxShadow = "0 0 10px #5ccfe6";
}).blur(function() {
    string = this.value;
    if (!string) {
        this.style.borderColor = "red";
        this.style.boxShadow = "0 0 10px red";
        return;
    }
    this.style.boxShadow = "";
    selectedInput = null;
    });
});

// check password lenght and if there is at least one digit
$(function() {
    $(".password").focus(function() {
        selectedInput = this;
        this.style.borderColor = "#5ccfe6";

        try {
            document.querySelector("#password").remove();
        } catch (e) {
            return;
        }

    }).blur(function(){
        password = this.value;
        if (password.length < 6 || !hasNumber.test(password)) {
            this.style.borderColor = "red";
            this.style.boxShadow = "0 0 10px red";
            let passLenght = document.createElement("p");
            passLenght.setAttribute("id", "password");
            passLenght.innerHTML = "Password must be at least 6 characters long! <br> Password must contain at least one number!";
            document.querySelector(".password-confirm-div").appendChild(passLenght);
        }
        selectedInput = null;
    });
});

//check if password match
$(function() {
    $(".passwordConfirm").focus(function() {
        selectedInput = this;
        this.style.borderColor = "#5ccfe6";

        try {
            document.querySelector("#confirm").remove();
        } catch (e) {
            return;
        }

    }).blur(function(){
        confirmation = this.value;
        if (confirmation !== password) {
            this.style.borderColor = "red";
            this.style.boxShadow = "0 0 10px red";
            let passLenght = document.createElement("p");
            passLenght.setAttribute("id", "confirm");
            passLenght.innerHTML = "Passwords must match!";
            document.querySelector(".password-confirm-div").appendChild(passLenght);
        }
        selectedInput = null;
    });
});