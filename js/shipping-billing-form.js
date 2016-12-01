var firstName = document.querySelector("#first-name");
var lastName = document.querySelector("#last-name");
var address = document.querySelector("#address");
var city = document.querySelector("#city");
var form = document.querySelector("#shipping-billing-form");

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

function validateAddress() {
  /**
   * Checks if address is not empty and has at least 2 characters
   * @return {boolean}
   **/

   if (validator.isEmpty(address.value) || !validator.isOfLength(address.value, 2)) {
     address.setCustomValidity("This field is required and must be at least 2 characters long.");
     return false;
   } else {
     address.setCustomValidity("");
   }
   return true;
}

function validateCity() {
  /**
   * Checks if city is not empty and has at least 2 characters
   * @return {boolean}
   **/

   if (validator.isEmpty(city.value) || !validator.isOfLength(city.value, 2)) {
     city.setCustomValidity("This field is required and must be at least 2 characters long.");
     return false;
   } else {
     city.setCustomValidity("");
   }
   return true;
}

// event listeners
firstName.addEventListener('keyup', validateFirstName, false);
lastName.addEventListener('keyup', validateLastName, false);
address.addEventListener('keyup', validateAddress, false);
city.addEventListener('keyup', validateCity, false);
