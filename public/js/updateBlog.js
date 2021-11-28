// handle event to update the blog
const updateFormHandler = async (event) => {

  const id = event.target.getAttribute('data-id');
  const title = document.querySelector("#title").value.trim();
  const content = document.querySelector("#content").value.trim();

  const response = await fetch(`/api/dashboard/update/${id}`, {
    method: 'POST',
    body: JSON.stringify({ title, content }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    // Refresh page to display updated blog
    document.location.replace(`/blog/${id}`);
  } else {
    alert("Blog not found!")
  }
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

document
  .querySelector("#del-btn")
  .addEventListener("click", delBtnHandler);

document
  .querySelector(".updateBlog-form")
  .addEventListener("submit", updateFormHandler);