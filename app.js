let question = document.getElementById("question");
let ans = Array.from(document.getElementsByClassName("answer"));
let quizBox = document.querySelector(".quiz-container");
let card = document.querySelector(".card");
let nextQuestion = document.getElementById("next-question");

let url = "https://opentdb.com/api.php?amount=1&difficulty=medium&type=boolean";

function quiz() {
  console.log("quiz function is called");

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Place not found or API error.");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      let newQuestion = data.results[0].question;
      let correctAns = data.results[0].correct_answer;

      question.innerText = newQuestion.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&rsquo;/g, ",");

      ans.forEach((elm) => {
        elm.addEventListener("click", () => {
          if (correctAns == elm.innerText) {
            document.getElementById("stat").innerText = "True";
            quizBox.style.display = "none";
            card.style.background = "rgb(64, 255, 128)";
            card.style.display = "block";
          } else {
            document.getElementById("stat").innerText = "False";
            quizBox.style.display = "none";
            card.style.background = "rgb(255, 64, 64)";
            card.style.display = "block";
          }
        });
      });
    });
}

quiz();

// switching to next question

nextQuestion.addEventListener("click", () => {
  quiz();
  setTimeout(() => {
    quizBox.style.display = "block";
    card.style.display = "none";
  }, 1000);
});
