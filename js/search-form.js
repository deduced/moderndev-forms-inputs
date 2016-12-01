var searchField = document.querySelector("#search-term");


searchField.addEventListener('keyup', function(e) {
  if (validator.isEmpty(searchField.value) || !validator.isOfLength(searchField.value, 2)) {
    searchField.setCustomValidity("This field is required and must be at least 2 characters long");
  } else {
    searchField.setCustomValidity("");
  }
});
