// Get HTML elements
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const signupBtn = document.getElementById("signupBtn");
const loginBtn = document.getElementById("loginBtn");
const message = document.getElementById("message");

// signUp function
async function signUp() {
  message.innerText = "";
  const email = emailInput.value;
  const password = passwordInput.value;

  // validate the input
  if (!email || !password) {
    message.innerText = "Please fill all fields.";
    return;
  }

  //   supabase function
  const { data, error } = await client.auth.signUp({
    email,
    password,
  });

  if (error) {
    message.innerText = error.message;
    console.log("No sign Up");
    return;
  } else {
    message.innerText = "Account Created Successfully";
    console.log(data);
  }
}

// calling the signUp function
signupBtn.addEventListener("click", signUp);

// login function
async function login() {
  message.innerText = "";
  const email = emailInput.value;
  const password = passwordInput.value;

  if (!email || !password) {
    message.innerText = "Please fill all fields.";
    return;
  }

  const { data, error } = await client.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    message.innerText = error.message;
    return;
  } else {
    message.innerText = "User login successfully";

    console.log(data);

    // Redirect to dashboard
    console.log("Login hogya");
    window.location.href = "./dashboard.html";
  }
}

// calling login function
loginBtn.addEventListener("click", login);
