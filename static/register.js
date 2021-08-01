var selectedInput = null;
let string;
var hasNumber = /\d/;

// check if there is any input
$(function() {
    $('input').focus(function() {
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
    $('.password').focus(function() {
        selectedInput = this;
        this.style.borderColor = "#5ccfe6";

        try {
            document.querySelector("p").remove();
        } catch (e) {
            return;
        }

    }).blur(function(){
        string = this.value;
        if (string.length < 6 || !hasNumber.test(string)) {
            this.style.borderColor = "red";
            let passLenght = document.createElement("p");
            passLenght.innerHTML = "Password must be at least 6 characters long <br> Password must contain at least one number";
            passLenght.style.color = "red";
            document.querySelector(".password-div").appendChild(passLenght);
        }
        selectedInput = null;
    });
})


//check if password match