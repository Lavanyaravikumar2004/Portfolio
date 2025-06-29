function calculateGrade() {
  const inputs = document.querySelectorAll('#inputs input');
  let total = 0;
  let marks = [];

  for (let input of inputs) {
    let val = Number(input.value);
    if (isNaN(val) || val < 0 || val > 100) {
      document.getElementById("result").innerText = "❌ Invalid Marks!";
      return;
    }
    marks.push(val);
    total += val;
  }

  let percent = total / marks.length;
  let grade = percent >= 90 ? "A+" :
              percent >= 75 ? "A" :
              percent >= 60 ? "B" :
              percent >= 40 ? "C" : "Fail";

  let remark = grade === "Fail" ? "❗Needs Improvement" :
               grade === "C" ? "Keep trying!" :
               grade === "B" ? "Good!" :
               grade === "A" ? "Well done!" : "Excellent!";

  const resultText = `Total: ${total}, Percentage: ${percent.toFixed(2)}%, Grade: ${grade}\n${remark}`;
  document.getElementById("result").innerText = resultText;

  localStorage.setItem("lastMarks", JSON.stringify(marks));
  speechSynthesis.speak(new SpeechSynthesisUtterance(`Your grade is ${grade}. ${remark}`));
}

function toggleDark() {
  document.body.classList.toggle("dark-mode");
}

function addSubject() {
  const input = document.createElement("input");
  input.type = "number";
  input.placeholder = `Subject ${document.querySelectorAll('#inputs input').length + 1} Marks`;
  document.getElementById("inputs").appendChild(input);
}

function downloadResult() {
  const result = document.getElementById("result").innerText;
  const blob = new Blob([result], { type: 'text/plain' });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "result.txt";
  link.click();
}

window.onload = () => {
  const saved = JSON.parse(localStorage.getItem("lastMarks"));
  if (saved) {
    const container = document.getElementById("inputs");
    container.innerHTML = "";
    saved.forEach((mark, index) => {
      const input = document.createElement("input");
      input.type = "number";
      input.placeholder = `Subject ${index + 1} Marks`;
      input.value = mark;
      container.appendChild(input);
    });
  }

  let deferredPrompt;
  const installBtn = document.getElementById('installBtn');
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = 'inline-block';
    installBtn.addEventListener('click', () => {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(choice => {
        if (choice.outcome === 'accepted') {
          console.log('👍 App Installed');
        }
        deferredPrompt = null;
      });
    });
  });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
      .then(reg => console.log('✅ Service Worker Registered:', reg.scope))
      .catch(err => console.error('❌ SW registration failed:', err));
  }
};
