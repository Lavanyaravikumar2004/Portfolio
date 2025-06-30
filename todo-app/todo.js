function addTask() {
  const input = document.getElementById("taskInput");
  const task = input.value.trim();
  if (!task) return;

  const list = document.getElementById("taskList");
  const li = document.createElement("li");
  li.textContent = task;

  li.onclick = () => {
    li.classList.toggle("completed");
    saveTasks();
  };

  const delBtn = document.createElement("button");
  delBtn.textContent = "❌";
  delBtn.onclick = (e) => {
    e.stopPropagation();
    li.remove();
    saveTasks();
  };

  li.appendChild(delBtn);
  list.appendChild(li);
  input.value = "";

  saveTasks();
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.firstChild.textContent,
      done: li.classList.contains("completed")
    });
  });
  localStorage.setItem("todo", JSON.stringify(tasks));
}

function loadTasks() {
  const saved = JSON.parse(localStorage.getItem("todo") || "[]");
  saved.forEach(t => {
    const list = document.getElementById("taskList");
    const li = document.createElement("li");
    li.textContent = t.text;
    if (t.done) li.classList.add("completed");

    li.onclick = () => {
      li.classList.toggle("completed");
      saveTasks();
    };

    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.onclick = (e) => {
      e.stopPropagation();
      li.remove();
      saveTasks();
    };

    li.appendChild(delBtn);
    list.appendChild(li);
  });
}
window.onload = loadTasks;

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}
