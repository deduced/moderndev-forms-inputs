// grab the elements that we need
var date = document.querySelector("#date");
var time = document.querySelector("#time");
var message = document.querySelector("#message");
var phone = document.querySelector("#contact-phone");
var email = document.querySelector("#contact-email");
var form = document.querySelector("#scheduling-form");

// Validation functions
function validateDate() {
  /**
   * Checks if the form date is not empty and after today's date
   * @return {number}
   **/

  if (validator.isEmpty(date.value) || !validator.isAfterToday(date.value)) {
    date.setCustomValidity("This field is required and must be after today's date");
    return false;
  } else {
    date.setCustomValidity("");
  }
  return true;
}

function validateTime() {
  /**
   * Checks if the form time is not empty
   * @return {number}
   **/

  if (validator.isEmpty(time.value)) {
    time.setCustomValidity("This field is required.");
    return false;
  } else {
    time.setCustomValidity("");
  }
  return true;
}

function validateMessage() {
  /**
   * Checks if the form message is not empty and has at least 4 words.
   * @return {number}
   **/

  if (validator.isEmpty(message.value) || validator.lessWordsThan(message.value, 3)) {
    message.setCustomValidity("This field is required and must have at least 4 words.");
    return false;
  } else {
    message.setCustomValidity("");
  }
  return true;
}

function validatePhone() {
  /**
   * Checks if the form phone is not empty and is valid
   * @return {number}
   **/

  if (validator.isEmpty(phone.value) || !validator.isPhoneNumber(phone.value)) {
    phone.setCustomValidity("This field is required and must follow the format: xxx-xxx-xxxx");
    return false;
  } else {
    phone.setCustomValidity("");
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

// Event Listeners
date.addEventListener('keyup', validateDate, false);
time.addEventListener('keyup', validateTime, false);
message.addEventListener('keyup', validateMessage, false);
phone.addEventListener('keyup', validatePhone, false);
email.addEventListener('keyup', validateEmail, false);

form.addEventListener('submit', function(e) {
  if (!validateDate() || !validateEmail() || !validateTime() || !validatePhone() || !validateMessage()) {
    e.preventDefault(); //prevent form submission
  }
}, false);
