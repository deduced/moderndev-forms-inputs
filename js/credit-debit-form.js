// grab the elements we need to create our listeners
var creditCardForm = document.getElementById('payment-form');
var nameField = creditCardForm.querySelector('#card-name');
var creditCardNumberField = creditCardForm.querySelector('#card-number');
var ccMonthField = creditCardForm.querySelector('#card-expiration-month');
var ccYearField = creditCardForm.querySelector('#card-expiration-year');
var securityCodeField = creditCardForm.querySelector('#security-code');

//functions for validations to be used in our listeners
// @TODO: is there a best practice for this?
function validateCc() {
  if (!validator.isCreditCard(creditCardNumberField.value)) {
    this.setCustomValidity("You must enter a valid credit card. E.g. xxxx-xxxx-xxxx-xxxx");
    return false;
  } else {
    this.setCustomValidity("");
  }
  return true;
}

function validateSecurityCode() {
  if (validator.isEmpty(securityCodeField.value)) {
    this.setCustomValidity("You must enter your security code. Your security code is a 3-digit or 4-digit number.");
    return false;
  } else {
    this.setCustomValidity("");
  }
  return true;
}

function validateExpMonth() {
  if (validator.isEmpty(ccMonthField.value)) {
    this.setCustomValidity("You must select the credit card expiration month.");
    return false;
  } else {
    this.setCustomValidity("");
  }
  return true;
}

function validateExpYear() {
  var ccExpirationDate = new Date(creditCardForm.querySelector("#card-expiration-month").value + "/30/" + creditCardForm.querySelector("#card-expiration-year").value);

  // // this block is unnecessary if we use required in our html
  // if (validator.isEmpty(ccYearField.value)) {
  //   this.setCustomValidity("You must select the credit card expiration year.");
  //   return false;
  // } else {
  //   this.setCustomValidity("");
  // }

  if (validator.isBeforeToday(ccExpirationDate)) {
    ccYearField.setCustomValidity("Your expiration date must be before today's date.");
  } else {
    this.setCustomValidity("");
  }
  return true;
}

function validateName() {
  if (!validator.moreWordsThan(nameField.value.trim(), 2) || (validator.isEmpty(nameField.value))) {
    this.setCustomValidity("You must input your first and last name.");
    return false;
  } else {
    this.setCustomValidity("");
  }
  return true;
}

// define our event listeners
nameField.addEventListener('keyup', validateName);
creditCardNumberField.addEventListener('keyup', validateCc);
ccMonthField.addEventListener('blur', validateExpMonth);
ccYearField.addEventListener('blur', validateExpYear);
securityCodeField.addEventListener('keyup', validateSecurityCode);

// define our final submit listener for the form.
creditCardForm.addEventListener('submit', function(event) {
  var ccExpirationDate = new Date(creditCardForm.querySelector("#card-expiration-month").value + "/30/" + creditCardForm.querySelector("#card-expiration-year").value);

  if (!validateName() || !validateCc() || !validateExpMonth() || !validateExpYear() || !validateSecurityCode()) {
    event.preventDefault(); //prevent form submission if a validation fails
  }

  if (validator.isBeforeToday(ccExpirationDate)) {
    console.log(ccExpirationDate);
    ccMonthField.setCustomValidity("Your expiration date cannot be prior to today's date");
    event.preventDefault(); //we prevent form ubmission if there is a problem.
  } else {
    ccMonthField.setCustomValidity("");
  }
});
