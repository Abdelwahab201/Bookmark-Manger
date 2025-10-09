//!------------------> Selectors <------------------*//
var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var submitBtn = document.getElementById("submitBtn");
var bookmarkTable = document.getElementById("bookmarkTable");
var errorBox = document.getElementById("errorBox");
var closeBtn = document.getElementById("closeBtn");

var bookmarkList = [];

if (localStorage.getItem("bookmarks")) {
  bookmarkList = JSON.parse(localStorage.getItem("bookmarks"));
  displayBookmarks();
}

//*------------------> Show Error Box <------------------*//
function showErrorBox() {
  errorBox.classList.remove("d-none");
}
//*------------------> Hide Error Box <------------------*//
function hideErrorBox() {
  errorBox.classList.add("d-none");
}
//*------------------> Validation Rules <------------------*//
var validationRules = {
  name: {
    regex: /^[A-Z][a-z]{2,}(?: [A-Z][a-z]{2,})*$/,
  },
  url: {
    regex: /^https:\/\/www\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
  },
};
//*------------------> Generic Validation Function <------------------*//
function validateInput(inputElement, rule) {
  var value = inputElement.value.trim();
  if (!rule.regex.test(value)) {
    inputElement.classList.add("is-invalid");
    inputElement.classList.remove("is-valid");
    return false;
  }
  inputElement.classList.add("is-valid");
  inputElement.classList.remove("is-invalid");
  return true;
}
//*------------------> Reset Inputs <------------------*//
function resetInputs() {
  siteNameInput.value = "";
  siteUrlInput.value = "";
  siteNameInput.classList.remove("is-valid", "is-invalid");
  siteUrlInput.classList.remove("is-valid", "is-invalid");
}
//*------------------> Add Bookmark <------------------*//
function addBookmark() {
    var isNameValid = validateInput(siteNameInput, validationRules.name);
    var isUrlValid = validateInput(siteUrlInput, validationRules.url);

    if (!isNameValid || !isUrlValid) {
      showErrorBox();
      return;
    }
  //^------------------> Create Bookmark Object <------------------*//
  var bookmark = {
    name: siteNameInput.value.trim(),
    url: siteUrlInput.value.trim(),
  };
  //^------------------> Add Bookmark to Array <------------------*//
  bookmarkList.push(bookmark);
  //^------------------> Save to localStorage <------------------*//
  localStorage.setItem("bookmarks", JSON.stringify(bookmarkList));
  //^------------------> Display Bookmark <------------------*//
  displayBookmarks();
  //^------------------> Show Success Alert <------------------*//
    Swal.fire({
      title: "Added Successfully!",
      text: "Your bookmark has been saved.",
      icon: "success",
      confirmButtonColor: "#4db748",
      timer: 2000,
      showConfirmButton: false,
    });
  //^------------------> Reset Inputs <------------------*//
  resetInputs();
}
//*------------------> Display Bookmark <------------------*//
function displayBookmarks() {
  var cartona = "";
  for (var i = 0; i < bookmarkList.length; i++) {
    cartona += `
  <tr>
    <td>${i + 1}</td>
    <td>${bookmarkList[i].name}</td>
    <td>
      <a class="visit-btn btn btn-success btn-sm py-2" 
         href="${bookmarkList[i].url}" target="_blank">
         <i class="fa-solid fa-eye pe-2"></i> Visit
      </a>
    </td>
    <td>
      <button onclick="deleteBookmark(${i})" 
              class="delete-btn btn btn-danger btn-sm py-2">
        <i class="fa-solid fa-trash-can"></i> Delete
      </button>
    </td>
  </tr>
`;
  }
  bookmarkTable.innerHTML = cartona;
}
//*------------------> Delete Bookmark <------------------*//
function deleteBookmark(index) {
  bookmarkList.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarkList));
  displayBookmarks();
}
//*------------------> Real-time Validation <------------------*//
siteNameInput.addEventListener("input", function () {
  validateInput(this, validationRules.name);
});
siteUrlInput.addEventListener("input", function () {
  validateInput(this, validationRules.url);
});