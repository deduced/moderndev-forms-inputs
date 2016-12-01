var firstName = document.querySelector("#firstName");
var lastName = document.querySelector("#lastName");
var email = document.querySelector("#email");
var dob = document.querySelector("#dob");
var password = document.querySelector("#password");
var form = document.querySelector("#signup-form");

// validation functions
function validateFirstName() {
  /**
   * Checks if first name is not empty and has at least 2 characters
   * @return {boolean}
   **/

   if (validator.isEmpty(firstName.value) || !validator.isOfLength(firstName.value, 2)) {
     firstName.setCustomValidity("This field is required and must be at least 2 characters long.");
     return false;
   } else {
     firstName.setCustomValidity("");
   }
   return true;
}

function validateLastName() {
  /**
   * Checks if last name is not empty and has at least 2 characters
   * @return {boolean}
   **/

   if (validator.isEmpty(lastName.value) || !validator.isOfLength(lastName.value, 2)) {
     lastName.setCustomValidity("This field is required and must be at least 2 characters long.");
     return false;
   } else {
     lastName.setCustomValidity("");
   }
   return true;
}

function validateEmail() {
  /**
   * Checks if the form email is not empty and is valid
   * @return {number}
   **/

  if (validator.isEmpty(email.value) || !validator.isEmailAddress(email.value)) {
    this.setCustomValidity("This field is required and must be a properly formatted email address.");
    return false;
  } else {
    this.setCustomValidity("");
  }
  return true;
}

function validateDob() {
  /**
   * Checks that the date of birth is not empty and is before today
   * @return {number}
   **/

  if (validator.isEmpty(dob.value) || !validator.isBeforeToday(dob.value)) {
    dob.setCustomValidity("This field is required and must be before today's date");
    return false;
  } else {
    dob.setCustomValidity("");
  }
  return true;
}

function validatePassword() {
  /**
   * Checks that password is not empty and has at least 2 characters.
   * @return {boolean}
   **/

  if (!validator.isOfLength(password.value, 2) || validator.isEmpty(password.value)) {
    password.setCustomValidity("Please input your full password.");
    return false;
  } else {
    password.setCustomValidity("");
  }
  return true;
}

// event listeners
firstName.addEventListener('keyup', validateFirstName, false);
lastName.addEventListener('keyup', validateLastName, false);
email.addEventListener('keyup', validateEmail, false);
dob.addEventListener('keyup', validateDob, false);
password.addEventListener('keyup', validatePassword, false);
form.addEventListener('submit', function(e) {
  if (!validateFirstName() || !validateLastName() || !validateEmail() || !validateDob() || !validatePassword()) {
    e.preventDefault(); //prevent form submission if there is a problem
  }
}, false);
