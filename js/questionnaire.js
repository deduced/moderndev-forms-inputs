// get the elements we need.
// @TODO - should these variables be declared globally or in a function? What is
//        best practice?
var form = document.querySelector('#questionnaire');
var otherElement = form.querySelector("#other");



function validateForm(event) {
    /**
     * Checks if an email address uses valid formatting @TODO - should I use jsdoc notation?
     * @param {Object} event
     * @return {boolean}
     */

    var inputElements = form.getElementsByTagName("input");
    var isChecked = false;

    for (var i = 0; i < inputElements.length; i++) {
        if (inputElements[i].checked) {
            isChecked = true;
        }
    }

    if (!isChecked && validator.isEmpty(otherElement.value) || (!validator.isOfLength(otherElement.value, 2))) {
        otherElement.setCustomValidity("You must fill in 'other' if you do not select one of the other options.");
        event.preventDefault();
    } else {
        otherElement.setCustomValidity("");
    }
}

otherElement.addEventListener('focus', validateForm, false);
otherElement.addEventListener('keyup', validateForm, false);
form.addEventListener('submit', validateForm, false);
