
const postsContainer = document.getElementById('posts');
const postList = document.getElementById('postList');
const dataDisplay = document.getElementById('dataDisplay')



// window.addEventListener("load", () => {
//   if (!localStorage.getItem('form_prj')) {
//     window.location.href = "form.html";
//   }


//   let accName = document.getElementById("name");
//   let { name, ...storage } = JSON.parse(localStorage.getItem('form_prj'));

//   accName.innerHTML = `${name}`;
// });

document.addEventListener('DOMContentLoaded', () => {
  const buttonContainer = document.getElementById('buttonContainer');



  // Create and append the appropriate button based on whether the user is logged in
  const button = document.createElement('button');
  if (localStorage.getItem('form_prj')) {
    button.innerText = 'Logout';
    let accName = document.getElementById("name");
    let { name, ...storage } = JSON.parse(localStorage.getItem('form_prj'));

    accName.innerHTML = `${name}`;
    button.addEventListener('click', () => {
      // Perform logout action
      console.log("LogOut");
      localStorage.removeItem('form_prj');
      localStorage.clear();
      window.location.href = "form.html";
    });
  } else {
    button.innerText = 'Login';
    button.addEventListener('click', () => {
      window.location.href = "form.html";
    });
  }

  buttonContainer.appendChild(button);
});
let postData = [];

fetch('blog.json')
  .then(response => response.json())
  .then(data => {
    postData = data.blogs.slice(-20);  // Get the last 20 posts
    displayDataList();

  })
  .catch(error => console.error('Error fetching data:', error));

function displayDataList() {

  postList.innerHTML = '';
  postData.forEach(post => {
    console.log("showing data");
    const postItem = document.createElement('div');
    postItem.innerHTML = `<h3>${post.id}</h3><p>${post.content}</p></br>`;
    postItem.addEventListener('click', () => {
      showDetails(post);
      // postList.style.display = "none";
    });
    postList.appendChild(postItem);
  });
}

function showDetails(item) {


  if (!localStorage.getItem('form_prj')) {
    window.location.href = "form.html";
  } else {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.classList.add('modal-overlay');

    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const backIcon = document.createElement('span');
    backIcon.innerHTML = '&#8592;&nbsp;';
    backIcon.style.cursor = 'pointer';
    backIcon.addEventListener('click', () => {
      modalOverlay.remove();
    });

    const itemName = document.createElement('h2');
    itemName.textContent = item.title;

    const itemDescription = document.createElement('p');
    itemDescription.textContent = item.content;

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => {

      itemName.style.display = 'none';
      itemDescription.style.display = 'none';
      editButton.style.display = 'none';
      deleteButton.style.display = 'none';

      // Create and display the edit form
      const editForm = document.createElement('div');
      editForm.innerHTML = `
      <h2>Edit Post</h2>
      <label for="editTitle">Title:</label>
      <input type="text" id="editTitle" value="${item.title}">
      <label for="editContent">Content:</label>
      <textarea id="editContent">${item.content}</textarea>
      <button id="saveEdit">Save</button>
    `;
      modalContent.appendChild(editForm);

      const saveEditButton = document.getElementById('saveEdit');
      saveEditButton.addEventListener('click', () => {
        const editedTitle = document.getElementById('editTitle').value;
        const editedContent = document.getElementById('editContent').value;

        // Update the postData array and local storage
        postData = postData.map(post => {
          if (post.id === item.id) {
            return { ...post, title: editedTitle, content: editedContent };
          }
          return post;
        });
        localStorage.setItem('postData', JSON.stringify({ blogs: postData }));

        // Update the post list and close the modal
        displayDataList();
        modalOverlay.remove();
      });
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      const confirmDelete = confirm('Are you sure you want to delete this post?');
      if (confirmDelete) {
        postData = postData.filter(post => post.id !== item.id);
        localStorage.setItem('postData', JSON.stringify({ blogs: postData }));
        modalOverlay.remove();
        displayDataList();
      }
    });

  const createButton = document.getElementById("createPost");
  
  createButton.addEventListener('click', createPost);
  

    // Append elements to the modal content
    modalContent.appendChild(backIcon);
    modalContent.appendChild(itemName);
    modalContent.appendChild(itemDescription);
    modalContent.appendChild(editButton);
    modalContent.appendChild(deleteButton);


    // Append modal content to modal overlay
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
  }
}


function editItem(item) {
  dataDisplay.innerHTML = ''; // Clear previous content

  const editForm = document.createElement('div');
  editForm.innerHTML = `
    <h2>Edit Post</h2>
    <label for="editTitle">Title:</label>
    <input type="text" id="editTitle" value="${item.title}">
    <label for="editContent">Content:</label>
    <textarea id="editContent">${item.content}</textarea>
    <button id="saveEdit">Save</button>
  `;

  dataDisplay.appendChild(editForm);

  const saveEditButton = document.getElementById('saveEdit');
  saveEditButton.addEventListener('click', () => {
    const editedTitle = document.getElementById('editTitle').value;
    const editedContent = document.getElementById('editContent').value;

    const newData = postData.map(post => {
      if (post.id === item.id) {
        return { ...post, title: editedTitle, content: editedContent };
      }
      return post;
    });

    localStorage.setItem('postData', JSON.stringify(newData));
    postData = newData; // Update the local data
    displayDataList(); // Update the list after editing
    showDetails({ id: item.id, title: editedTitle, content: editedContent });
    // dataDisplay.style.display ="none"; //NO2
  });
}

function createPost() {
  if (!localStorage.getItem('form_prj')) {
    window.location.href = "form.html";
  } else {
    const title = prompt('Enter the title of the post:');
    const content = prompt('Enter the content of the post:');
    const imageUrl = prompt('Enter the image URL for the post (optional):');

    const newPost = {
      id: Date.now(), // Use a unique identifier (e.g., timestamp) as the ID
      title: title || 'Untitled Post',
      content: content || 'No content available.',
      imageUrl: imageUrl || ''
    };

    // Add the new post at the beginning of the postData array
    postData.unshift(newPost);
    localStorage.setItem('postData', JSON.stringify({ blogs: postData }));

    // Update the post list and display the new post at the top
    displayDataList();

    // Scroll to the top of the post list to show the new post
    postList.scrollTop = 0;
  }
}




