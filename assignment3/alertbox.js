const openDialogButton = document.getElementById('openDialogButton');
const closeDialogButton = document.getElementById('closeDialogButton');
const dialog = document.getElementById('dialog');


const alertBoxAnchor = document.getElementById("alertBox");

function changeAnchorColor() { 
  alertBoxAnchor.style.color = "blue"; 
  alertBoxAnchor.style.borderBottomColor = "blue"
  
}

// Call the function to change the button's color when the page loads
window.addEventListener("load", changeAnchorColor);

openDialogButton.addEventListener('click', () => {
  dialog.style.display = 'block';
});

closeDialogButton.addEventListener('click', () => {
  dialog.style.display = 'none';
});



