// Get the current blog ID from url
const blogId = window.location.toString().split('/')[
  window.location.toString().split('/').length - 1
];

// handle event to display new blog form
const newBtnHandler = async (event) => {

  document.location.replace('/api/dashboard/new');
};

// handle event to edit current blog
const editBtnHandler = async (event) => {
  event.preventDefault();

};

// handle event to delete current blog
const delBtnHandler = async (event) => {

  const id = event.target.getAttribute('data-id');

  const response = await fetch(`/api/dashboard/${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert("Blog not found!")
  }

};

// Listen to new blog click event
document
  .querySelector("#new-btn")
  .addEventListener("click", newBtnHandler);

document
  .querySelector("#edit-btn")
  .addEventListener("click", editBtnHandler);

document
  .querySelector("#del-btn")
  .addEventListener("click", delBtnHandler);

