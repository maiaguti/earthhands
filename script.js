"use strict";

function darkMode() {
    let element = document.body;
    element.classList.toggle("dark-mode"); // toggle the dark mode class when the button is clicked
}

function myFunction() { // displays the vases section of the shop on page load 
    displayItem(event, 'vases');
};

function displayItem(evt, itemName) { // function that loops through the shop section to display one item/section at a time
    var i, shopItems, item;
    shopItems = document.getElementsByClassName("shopItems"); // loops through the sections 
    for (i = 0; i < shopItems.length; i++) {
        shopItems[i].style.display = "none";
    }
    item = document.getElementsByClassName("item"); // loops through the buttons display
    for (i = 0; i < item.length; i++) {
        item[i].className = item[i].className.replace("active", "");
    }
    document.getElementById(itemName).style.display = "grid"; // displays the sections as a grid
    evt.currentTarget.className += " active";
}

// the following are event listeners for the function above specifically regarding the buttons, so that when a certain button is clicked, the correspond section appears
let vaseBtn = document.getElementById("vaseButton");
vaseBtn.addEventListener("click", function(){
    displayItem(event, 'vases');
});

let tableBtn = document.getElementById("tableButton");
tableBtn.addEventListener("click", function(){
    displayItem(event, 'tableware');
});

let planterBtn = document.getElementById("plantButton");
planterBtn.addEventListener("click", function(){
    displayItem(event, 'planters');
});
// end of those event listeners


// have the computer generate a random number
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function game(){
    let computerNumber = document.getElementById("random");
    let userNumDisplay = document.getElementById("player");
    let userInput = document.getElementById("input");
    let gameMsg = document.getElementById("gameMsg");

    let num1 = getRandomNumber(1,10); // num1 is the random number between 1-10 that the computer display
    let input = parseInt(userInput.value); // num2 is whaterver the user enters as their guess

    computerNumber.innerHTML = num1;
    userNumDisplay.innerHTML = input;

    if (input === num1){ // if the user's guess and the computer's random number are the same: 
        gameMsg.innerHTML = "You win! Your discount code is clay1"; //display this
    } else { // if the user's guess and the computer's random number are not the same: 
        gameMsg.innerHTML = "Oops, not a match. Try again!"; //display this
    }

    userInput.value = ""; // clear out the previous guess upon submit
}

function validateForm() {
    let formErrors = false;
    let errorMsg = "<ul>"; // create a <ul> within the formErrors div to list the errors
    let myForm = document.querySelector("#myForm");

    const fullName = document.getElementById("fullName");
    if (fullName.value.length === 0) { // if the user does not enter info in the name input
        errorMsg += "<li> * Please enter your full name. </li>"; //append this error message to the errorMsg <ul>
        fullName.classList.add("error"); // activate the error class styles
        formErrors = true; // activate the formError styles because there is an error present
    } else {
        fullName.classList.remove("error"); // deactivate the form error if no error exists
    }

    const email = document.getElementById("email");
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/;
    if (email.value.length !== 0 && !emailRegex.test(email.value)) { // create an error if the user chooses to type an email but it does not match the format of the emailRegex
        errorMsg += "<li> * Please enter a valid email address. </li>"; 
        email.classList.add("error"); 
        formErrors = true; 
    } else {
        email.classList.remove("error"); 
    }

    const tel = document.getElementById("tel");
    const telRegex = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    if (tel.value.length !== 0 && !telRegex.test(tel.value)) { // create an error if the user chooses to type a phone number but it does not match the format of the telRegex
        errorMsg += "<li> * Please enter a 10 digit phone number with dashes in between. </li>";
        tel.classList.add("error");
        formErrors = true; 
    } else {
        tel.classList.remove("error");
    }

    /* validate contact method */
    const chooseMethod = document.querySelector('input[name="chooseMethod"]:checked');
    const methodPhone = document.getElementById("choosePhone");
    const methodEmail = document.getElementById("chooseEmail");

    /* check to see if either phone or email is not checked, add erroMsg to <li> */
    if( (methodPhone.checked == false) && (methodEmail.checked == false)) {
        errorMsg += "<li> * Please select a contact method type, so we can spam you! 😈 </li>";
        formErrors = true;
    } 

    const myMessage = document.getElementById("myMessage");
    if (myMessage.value.length === 0) {
        errorMsg += "<li> * Please write us a message so we know how to best assist you!</li>";
        myMessage.classList.add("error");
        formErrors = true;
    } else {
        myMessage.classList.remove("error");
    }



    errorMsg += "</ul>"; // close out of the <ul> tag after all the potential errors are stated

   

    if (formErrors) { // check to see if there are errors present, if so make the errors visible and hide the successful content
        document.getElementById("formErrors").innerHTML = errorMsg;
        document.getElementById("formErrors").classList.remove("hide");

        document.querySelector("#successfulContent").classList.add("hide");
    } else { // if no errors
        document.getElementById("formErrors").classList.add("hide"); //hide the errors visibility
        document.getElementById("success").innerHTML = "Thank you! Your message has been sent."; // display success message to user

        document.querySelector("#successfulContent").classList.remove("hide"); // reveal the inner html text that shows what the user entered
        document.getElementById("formOutput").innerHTML = `Your Name: ${fullName.value} <br> Message: ${myMessage.value} <br><br> Email: ${email.value} <br> Phone Number: ${tel.value} <br> Contact Preference: ${chooseMethod.value}`; // displayes what the user entered
        myForm.reset(); // resets the content of the form when submitted properly
    };

};




// rest of the event listeners

document.getElementById("playGame").addEventListener("click", game);

document.getElementById("mySubmit").addEventListener("click", function(event) {
    validateForm();
    event.preventDefault(); // Prevent default form action

 });

