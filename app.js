const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

//Add error class to input
function showError(input, message) {
  const controlForm = input.parentElement;
  controlForm.className = "form-control error";
  const errorMessage = controlForm.querySelector("small");
  errorMessage.innerText = message;
}

//Add success class to input

function showSuccess(input) {
  const controlForm = input.parentElement;
  controlForm.className = "form-control success";
}

// capitalize first letter of string
function CapitalizeFirstLetter(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//checking if input contains values
function requireInput(inputArr) {
  inputArr.forEach((input) => {
    if (input.value === "") {
      showError(input, ` ${CapitalizeFirstLetter(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

//Checking for email validity
function ValidateEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(email.value.trim())) {
    showError(email, "Email is invalid");
  } else {
    showSuccess(email);
  }
}

//checking length of char inputted
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${CapitalizeFirstLetter(input)} must be at least ${min} characters long.`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${CapitalizeFirstLetter(input)} must be less than ${max}.`
    );
  } else {
    showSuccess(input);
  }
}

//checking passords for equality
function comparePassword(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Password do not match");
  }
}

//Password validation check
function ValidatePassword(input) {
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const formControl = document.getElementById("password").parentElement;
  if (!re.test(input)) {
    formControl.className = "form-control error";
    formControl.querySelector("small").innerText =
      "Min 8 chars, at least one letter and one number";
  } else {
    formControl.className = "form-control success";
  }
}

// Adding event Listener on form
form.addEventListener("submit", function (e) {
  e.preventDefault();
  requireInput([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  ValidateEmail(email);
  comparePassword(password, password2);
});

//Adding event listener to password
password.addEventListener("keyup", function (e) {
  ValidatePassword(e.target.value);
});
