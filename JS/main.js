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
//*------------------> Validate URL <------------------*//
function isValidUrl(url) {
  var urlPattern = /^https:\/\/www\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
  return urlPattern.test(url);
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
  var bookmark = {
    name: siteNameInput.value.trim(),
    url: siteUrlInput.value.trim(),
  };
  //^------------------> Validate Inputs <------------------*//
  if (!bookmark.name || !bookmark.url) {
    showErrorBox();
    return;
  }
  //^------------------> Validate Bookmark Name <------------------*//
  if (bookmark.name.length < 3) {
    showErrorBox();
    return;
  }
  //^------------------> Validate URL Format <------------------*//
  if (!isValidUrl(bookmark.url)) {
    showErrorBox();
    return;
  }
  //^------------------> Add Bookmark to Array <------------------*//
  bookmarkList.push(bookmark);
  //^------------------> Save to localStorage <------------------*//
  localStorage.setItem("bookmarks", JSON.stringify(bookmarkList));
  //^------------------> Display Bookmark <------------------*//
  displayBookmarks();
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
//*------------------> Validate Site Name <------------------*//
function validateSiteNameInput(inputElement) {
  if (inputElement.value.trim().length < 3) {
    inputElement.classList.add("is-invalid");
    inputElement.classList.remove("is-valid");
  } else {
    inputElement.classList.add("is-valid");
    inputElement.classList.remove("is-invalid");
  }
}
//*------------------> Validate URL <------------------*//
function validateSiteUrlInput(inputElement) {
  const regex = /^https:\/\/www\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
  if (!regex.test(inputElement.value.trim())) {
    inputElement.classList.add("is-invalid");
    inputElement.classList.remove("is-valid");
  } else {
    inputElement.classList.add("is-valid");
    inputElement.classList.remove("is-invalid");
  }
}