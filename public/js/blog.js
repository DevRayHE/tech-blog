const newBtnHandler = async (event) => {
  event.preventDefault();

  document.location.replace('/dashboard/new');
  
};

const editBtnHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#name-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

const delBtnHandler = async (event) => {
  event.preventDefault();

};

document
  .querySelector(".new-btn")
  .addEventListener("click", newBtnHandler);

document
  .querySelector(".edit-btn")
  .addEventListener("click", editBtnHandler);

document
  .querySelector(".del-btn")
  .addEventListener("click", delBtnHandler);