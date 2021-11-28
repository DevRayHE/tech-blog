const newBlogHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#title").value.trim();
  const content = document.querySelector("#content").value.trim();

  if (title && content) {
    const response = await fetch('/api/dashboard', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // return to dashboard
      document.location.replace('/dashboard');
    } else {
      alert("New blog failed to create!");
    }
  }
};


// Listen to new blog form submit event
document
  .querySelector(".newBlog-form")
  .addEventListener("submit", newBlogHandler);