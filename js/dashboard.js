async function checkUser() {
  const { data, error } = await client.auth.getUser();

  if (error) {
    console.log(error.message);
    return;
  }

  if (data.user) {
    console.log("Logged In");
  } else {
    window.location.href = "index.html";
  }
}

checkUser();

// get ellements
const title = document.getElementById("title");
const description = document.getElementById("description");
const addTaskBtn = document.getElementById("addTaskBtn");
const message = document.getElementById("message");
const logoutBtn = document.getElementById("logoutBtn");

// task add function

async function addTask() {
  const { data: userData } = await client.auth.getUser(); //rename the data to userData
  const user = userData.user;

  //   validate the input
  if (!title.value || !description.value) {
    message.innerText = "Please fill all fields";
    return;
  }

  const { data, error } = await client.from("tasks").insert([
    {
      title: title.value,
      description: description.value,
      user_id: user.id,
    },
  ]);

  if (error) {
    console.log(error);
    message.innerText = error.message;

    return;
  } else {
    message.innerText = "Task added successfully";
    // Clear inputs
    title.value = "";
    description.value = "";

    // Reload tasks
    fetchTasks();
  }
}

// calling the addTask function
addTaskBtn.addEventListener("click", addTask);

// fetch the data
async function fetchTasks() {
  // Get logged-in user
  const { data: userData } = await client.auth.getUser();
  const user = userData.user;

  // Fetch tasks
  const { data, error } = await client
    .from("tasks")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    console.log(error.message);
    return;
  }

  const taskList = document.getElementById("taskList");

  taskList.innerHTML = "";

  data.forEach((task) => {
    taskList.innerHTML += `
    <div class="task">
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <span class="status">${task.status}</span>

     <div class="task-buttons">
    ${
      task.status !== "Completed"
        ? `<button onclick="markCompleted('${task.id}')">Complete</button>`
        : ""
    }

    <button onclick="deleteTask('${task.id}')">Delete</button>
</div>
    </div>
  `;
  });
}

fetchTasks();

async function markCompleted(taskId) {
  const { data, error } = await client
    .from("tasks")
    .update({
      status: "Completed",
    })
    .eq("id", taskId);

  if (error) {
    console.log(error.message);
    return;
  }

  message.innerText = "Task Updated Successfully";

  fetchTasks();
}

async function deleteTask(taskId) {
  const { error } = await client.from("tasks").delete().eq("id", taskId);

  if (error) {
    console.log(error.message);
    message.innerText = error.message;
    return;
  }

  message.innerText = "Task Deleted Successfully";

  fetchTasks();
}

// logout function
async function logout() {
  const { error } = await client.auth.signOut();

  if (error) {
    console.log(error.message);
    return;
  }

  window.location.href = "index.html";
}

// call the logout function on event
logoutBtn.addEventListener("click", logout);
