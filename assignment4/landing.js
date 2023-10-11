
const postsContainer = document.getElementById('posts');
const postList = document.getElementById('postList');
const dataDisplay = document.getElementById('dataDisplay')

document.addEventListener('DOMContentLoaded', () => {
  const buttonContainer = document.getElementById('buttonContainer');

  
  const button = document.createElement('button');
  // if user logged in, show username and log out button
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
  } 
  // if user not logged in, show log in button
  else {
    button.innerText = 'Login';
    button.addEventListener('click', () => {
      window.location.href = "form.html";
    });
  }

  buttonContainer.appendChild(button);

  let postData = []; // create an array for CRUD


  // fetch data from local json file using async to wait till the datas get
  async function fetchData() {
    try {
      const response = await fetch('blog.json');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      postData = data.blogs.slice(-20);  // Get the last 20 posts
      displayDataList();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  fetchData();
  function displayDataList() {
    postList.innerHTML = '';
    //iterate the postData array with its index
    postData.forEach(post => {
      console.log("showing data");
      const postItem = document.createElement('li');
      postItem.classList.add('grid-item');
      postItem.innerHTML =
        `<img src=${post.imageUrl} alt="Post Image"><div class="grid-item-content"><p>${post.title}</p></br><p>${post.content}</p></br><p>${post.id}</p></div></br>`;
      // when postItem is clicked,show detail
        postItem.addEventListener('click', () => {
        showDetails(post);
        
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
      
      // when backIcon is clicked,go back to listview
      backIcon.addEventListener('click', () => {
        modalOverlay.remove();
      });

      const itemImage = document.createElement('img');
      itemImage.classList.add('item_image');
      itemImage.src = item.imageUrl;

      const itemName = document.createElement('h2');
      itemName.textContent = item.title;

      const itemDescription = document.createElement('p');
      itemDescription.textContent = item.content;


      const itemDate = document.createElement('p');
      itemDate.textContent = item.id;

      // when edit btn is clicked, a form that asked data from the user will be seen.
      const editButton = document.createElement('button');
      editButton.classList.add('edit_btn');
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', () => {

        itemImage.style.display = 'none';
        itemName.style.display = 'none';
        itemDescription.style.display = 'none';
        itemDate.style.display = 'none';
        editButton.style.display = 'none';
        deleteButton.style.display = 'none';

        // Create and display the edit form
        const editForm = document.createElement('div');
        editForm.classList.add('editFormClass');
        editForm.innerHTML = `
      <h2>Edit Post</h2>
      <label for="editImageUrl">Image URL:</label></br>
      <input type="text" id="editImageUrl" value="${item.imageUrl}"></br></br>
      <label for="editTitle">Title:</label></br>
      <input type="text" id="editTitle" value="${item.title}"></br></br>
      <label for="editContent">Content:</label></br>
      <textarea id="editContent">${item.content}</textarea></br></br>
      <button id="saveEdit">Save</button></br></br>
    `;
        modalContent.appendChild(editForm);

        const saveEditButton = document.getElementById('saveEdit');
        saveEditButton.addEventListener('click', () => {
          const editedTitle = document.getElementById('editTitle').value;
          const editedContent = document.getElementById('editContent').value;
          const editedImageUrl = document.getElementById('editImageUrl').value;
          // Update the postData array and local storage
          postData = postData.map(post => {
            if (post.id === item.id) {
              return { ...post, imageUrl: editedImageUrl, title: editedTitle, content: editedContent };
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
      deleteButton.classList.add('delete_btn');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        const confirmDelete = confirm('Are you sure you want to delete this post?');
        if (confirmDelete) {
          postData = postData.filter(post => post.id !== item.id);
          localStorage.setItem('postData', JSON.stringify({ blogs: postData }));
          modalOverlay.remove();    //close the modal
          displayDataList();  // Update the post list
        }
      });

      const createButton = document.getElementById("createPost");

      createButton.addEventListener('click', createPost);


      // Append elements to the modal content
      modalContent.appendChild(backIcon);

      modalContent.appendChild(itemName);
      modalContent.appendChild(itemImage);
      modalContent.appendChild(itemDescription);
      modalContent.appendChild(itemDate);
      modalContent.appendChild(editButton);
      modalContent.appendChild(deleteButton);


      // Append modal content to modal overlay
      modalOverlay.appendChild(modalContent);
      document.body.appendChild(modalOverlay);
    }
  }



  function createPost() {

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

    const titleLabel = document.createElement('label');
    titleLabel.textContent = 'Title:';
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.id = 'postTitle';

    const contentLabel = document.createElement('label');
    contentLabel.textContent = 'Content:';
    const contentInput = document.createElement('textarea');
    contentInput.id = 'postContent';

    const imageUrlLabel = document.createElement('label');
    imageUrlLabel.textContent = 'Image URL (optional):';
    const imageUrlInput = document.createElement('input');
    imageUrlInput.type = 'text';
    imageUrlInput.id = 'postImageUrl';

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Create Post';
    submitButton.id = 'createBtn'
    submitButton.addEventListener('click', () => {
      const title = titleInput.value;
      const content = contentInput.value;
      const imageUrl = imageUrlInput.value;
      const timestamp = Date.now(); // Get current timestamp in milliseconds

      const dateObj = new Date(timestamp); // Create a Date object using the timestamp

      // Format the date components
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Month is 0-based
      const day = String(dateObj.getDate()).padStart(2, '0');
      const hours = String(dateObj.getHours()).padStart(2, '0');
      const minutes = String(dateObj.getMinutes()).padStart(2, '0');
      const seconds = String(dateObj.getSeconds()).padStart(2, '0');

      // Create a formatted date string
      const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      const newPost = {
        id: formattedDate,
        title: title || 'Untitled Post',
        content: content || 'No content available.',
        imageUrl: imageUrl || ''
      };

      postData.unshift(newPost);
      localStorage.setItem('postData', JSON.stringify({ blogs: postData }));

      displayDataList();
      postList.scrollTop = 0;

      // Close the modal
      modalOverlay.remove();
    });
    modalContent.appendChild(backIcon);
    modalContent.appendChild(document.createElement('br'));
    modalContent.appendChild(document.createElement('br'));
    modalContent.appendChild(titleLabel);
    modalContent.appendChild(titleInput);
    modalContent.appendChild(document.createElement('br'));
    modalContent.appendChild(document.createElement('br'));
    modalContent.appendChild(contentLabel);
    modalContent.appendChild(contentInput);
    modalContent.appendChild(document.createElement('br'));
    modalContent.appendChild(document.createElement('br'));
    modalContent.appendChild(imageUrlLabel);
    modalContent.appendChild(imageUrlInput);
    modalContent.appendChild(document.createElement('br'));
    modalContent.appendChild(document.createElement('br'));
    modalContent.appendChild(submitButton);

    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
  }
});
