const newCommentFormHandler = async (event) => {
  event.preventDefault();

  const content = document.querySelector("#new-comment").value.trim();

  // Get the current blog ID
  const blogId = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  // console.log(content);
  // console.log(blogId);
  
  if (content) {
    const response = await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({ content, blogId }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // document.location.replace('/dashboard');
      alert("Comment updated successfully!");
      location.reload();
    } else {
      alert("Failed to add comment!");
    }
  }
};

document
  .querySelector(".comment-form")
  .addEventListener("submit", newCommentFormHandler);