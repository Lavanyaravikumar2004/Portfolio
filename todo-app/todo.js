function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (!taskText) return;

  const li = document.createElement("li");
  li.textContent = taskText;

  li.onclick = () => {
    li.classList.toggle("completed");
    saveTasks();
  };

  const del = document.createElement("button");
  del.textContent = "❌";
  del.onclick = (e) => {
    e.stopPropagation();
    li.remove();
    saveTasks();
  };

  li.appendChild(del);
  document.getElementById("taskList").appendChild(li);
  input.value = "";

  saveTasks();
}

function saveTasks() {
  const items = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    items.push({
      text: li.firstChild.textContent,
      done: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(items));
}

function loadTasks() {
  const data = JSON.parse(localStorage.getItem("tasks") || "[]");
  data.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.text;
    if (item.done) li.classList.add("completed");

    li.onclick = () => {
      li.classList.toggle("completed");
      saveTasks();
    };

    const del = document.createElement("button");
    del.textContent = "❌";
    del.onclick = (e) => {
      e.stopPropagation();
      li.remove();
      saveTasks();
    };

    li.appendChild(del);
    document.getElementById("taskList").appendChild(li);
  });
}
window.onload = loadTasks;

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

function clearAll() {
  if (confirm("Clear all tasks?")) {
    document.getElementById("taskList").innerHTML = "";
    localStorage.removeItem("tasks");
  }
}
