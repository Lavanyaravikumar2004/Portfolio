function calculateGrade() {
  let s1 = Number(document.getElementById('sub1').value);
  let s2 = Number(document.getElementById('sub2').value);
  let s3 = Number(document.getElementById('sub3').value);

  let total = s1 + s2 + s3;
  let percent = total / 3;
  let grade = "";

  if (percent >= 90) grade = "A+";
  else if (percent >= 75) grade = "A";
  else if (percent >= 60) grade = "B";
  else if (percent >= 40) grade = "C";
  else grade = "Fail";

  document.getElementById("result").innerText =
    `Total: ${total}, Percentage: ${percent.toFixed(2)}%, Grade: ${grade}`;
}
