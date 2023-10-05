
const toolAnchor = document.getElementById("tools");

// Call the function to change the button's color when the page loads
function changeAnchorColor() {
  toolAnchor.style.color = "blue";
  toolAnchor.style.borderBottomColor = "blue"
}
window.addEventListener("load", changeAnchorColor);

function addItem() {
  // Get the input field value
  var inputValue = document.getElementById("enterNew").value;

  // Check if the input value is not empty
  if (inputValue.trim() !== "") {
    // Create a new list item element
    var listItem = document.createElement("li");
    listItem.textContent = inputValue;

    var deleteIcon = document.createElement("span");
    deleteIcon.className = "delete-icon";
    deleteIcon.innerHTML = "&#x1F5D1;"; //
   
    listItem.appendChild(deleteIcon);
    deleteIcon.onclick = function () {
      listItem.remove();
    };

 

    // Add the new list item to the list
    document.getElementById("list").appendChild(listItem);

    // Clear the input field
    document.getElementById("enterNew").value = "";
  }
}


function filterTasks() {
  var searchTerm = document.getElementById("search").value.toLowerCase();
  var todoList = document.getElementById("list").getElementsByTagName("li");

  for (var i = 0; i < todoList.length; i++) {
      var todoItem = todoList[i].textContent.toLowerCase();
      if (todoItem.includes(searchTerm)) {
          todoList[i].style.display = "block"; // Show matching items
      } else {
          todoList[i].style.display = "none"; // Hide non-matching items
      }
  }
}