// get the elements we need.
var username = document.querySelector('#username');
var password = document.querySelector('#password');
var form = document.querySelector('#login-form');

function validateUsername() {
  /**
   * Validates the username value.
   * @return {boolean}
   **/

  if (!validator.isOfLength(username.value, 2) || validator.isEmpty(username.value)) {
    username.setCustomValidity("Please input your full username.");
    return false;
  } else {
    username.setCustomValidity("");
  }
  return true;
}

function validatePassword() {
  /**
   * Validates the password value.
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

//add event listeners
username.addEventListener('keyup', validateUsername, false);
password.addEventListener('keyup', validatePassword, false);
form.addEventListener('submit', function(event) {
  if(!validateUsername || !validatePassword) {
    event.preventDefault();
  }
}, false);
