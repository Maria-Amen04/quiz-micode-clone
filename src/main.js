import "./style.css";
import { Questions } from "./questions";

const app = document.querySelector("#app"); // querySelector est une fonction qui permet de sélectionner un bloc dans htmtl via des sélecteurs css

const TIMEOUT = 4000;

const startButton = document.querySelector("#start");

startButton.addEventListener("click",startQuiz);

function startQuiz(event) {
  console.log("Button");
  event.stopPropagation();
  let currentQuestion = 0;
  let score = 0;

  // clean();
  displayQuestion(currentQuestion);

  function clean() {
    while(app.firstElementChild){  
      app.firstElementChild.remove();
    }
    const progress = getProgressBar(Questions.length, currentQuestion);
    app.appendChild(progress);
  }


  function displayQuestion(index){
    clean(); 
    const question = Questions[index];

    if (!question) {
      displayFinishMessage();
      return; 
    }
    const title = getTitleElement(question.question);
    app.appendChild(title);
    const answersDiv = createAnswers(question.answers);
    app.appendChild(answersDiv);

    const submitButton = getSubmitButton();

    submitButton.addEventListener("click", submit);

    app.appendChild(submitButton);
  }

  function displayFinishMessage() {
    const h1 = document.createElement("h1");
    h1.innerText = "Bravo ! Tu as terminé le quiz.";
    const p = document.createElement("p");
    p.innerText = `Tu as eu ${score} sur ${Questions.length} point!`;

    app.appendChild(h1);
    app.appendChild(p);
  }

  function submit(){
    const selectedAnswer = app.querySelector('input[name="answer"]:checked');
    
    // disableAllAnswers();

    const value = selectedAnswer.value;
    const question = Questions[currentQuestion]
    const isCorrect = question.correct === value; 
    

    if (isCorrect) {
      score++;
    }
    showFeedback(isCorrect, question.correct, value);
    displayNextQuestionButton(() =>{

      currentQuestion++;
      displayQuestion(currentQuestion);
    });
 
    const feedback = getFeedbackMessage(isCorrect, question.correct);
    app.appendChild(feedback);

  }

  function createAnswers(answers){
    const answersDiv = document.createElement("div");
    
    answersDiv.classList.add("answers");
    
    for(const answer of answers){
      const label = getAnswerElement(answer)
      answersDiv.appendChild(label);
    }
    return answersDiv;
  }
}

function getTitleElement(text) {
  const title = document.createElement("h3");
  title.innerText = text;
  return title;
}

function formatId(text) {
  return text.replaceAll("","-").replaceAll('""',"''").toLowerCase();
}

function getAnswerElement(text){
  const label = document.createElement("label");
  label.innerText = text;
  const input = document.createElement("input");
  const id = formatId(text);
  input.id = id;
  label.htmlFor = id;
  input.setAttribute("type", "radio");
  input.setAttribute("name", "answer");
  input.setAttribute("value", text);
  label.appendChild(input);
  return label;
}

function getSubmitButton(){
  const submitButton = document.createElement("button");
  submitButton.innerText = "submit";
  return submitButton;
}

function showFeedback(isCorrect, correct, answer){
  const correctAnswerId = formatId(correct);
  const correctElement = document.querySelector(
    `label[for="${correctAnswerId}"]`
  );
 
  const selectedAnswerId = formatId(answer);
  const selectedElement = document.querySelector(
    `label[for="${selectedAnswerId}"]`
  );
  
    correctElement.classList.add("correct");
    selectedElement.classList.add(isCorrect ? "correct" : "incorrect");

}

function getFeedbackMessage(isCorrect, correct) {
  const paragraph = document.createElement("p");
  paragraph.innerText = isCorrect
  ? "Bravo! Tu as eu la bonne réponse" : 
  `Désolé... mais la bonne réponse était ${correct}`;

  return paragraph;
}

function getProgressBar(max, value) {
  const progress = document.createElement("progress");
  progress.setAttribute("max", max);
  progress.setAttribute("value", value);
  return progress;
}

function displayNextQuestionButton(callback) {
  let remainingTimeout = TIMEOUT;

  app.querySelector("button").remove();

  const getButtonText = () => `Next (${remainingTimeout/1000}s)`

  const nextButton = document.createElement("button");
  nextButton.innerText = getButtonText();

  app.appendChild(nextButton);

 const interval = setInterval(() => {
    remainingTimeout -= 1000;
     nextButton.innerText = getButtonText();
  }, 1000);

  const timeout = setTimeout(()=>{
    handleNextQuestion();
 },TIMEOUT);

  const handleNextQuestion = () =>{
    clearInterval(interval);
    clearTimeout(timeout);
    callback();
  }

  nextButton.addEventListener("click", () =>{
    handleNextQuestion();
  })
} 

function disableAllAnwers(){
 const radioInputs = document.querySelectorAll('input[type="radio"]');
 for(const radio of radioInputs){
  radio.disabled = true;
 }
}
// /// création d'un quiz qui défile les questions après le start
// let i = 0;
// //permet de modifier le éléments
// startButton.addEventListener("click", () => { 
//   const question = document.querySelector("#question") ?? document.createElement("p");
//   question.id = "question";
//   question.innerText = Questions[i].question;
//   app.insertBefore(question, startButton); 

//   i++;
//   if (i > Questions.length - 1) {
//    console.log("Question remove");
//     question.remove();
//     i = 0;
//   }
// });

// ///Ajout d'élément
// //❌DECONSEILLER
// app.innerHTML = `<div>
// <h1>
// salut
// </h1>
// <input />
// </div>`;
// //✅ CONSEILLER
// const div = document.createElement("div");
// const tittle = document.createElement("h1");
// tittle.innerText = "Maria !";
// div.appendChild(tittle);
// const input = document.createElement("input");
// div.appendChild(input);
// app.appendChild(div);

// setInterval(() => {
//   input.value += ["M", "A", "R", "I", "A"];
// }, 1000);

// ///Sélection d'élément
// console.log({
//   parent: app.parentElement,
//   prevSister: app.previousElementSibling,
//   nextSister: app.nextElementSibling,
//   firstChild: app.firstElementChild,
//   lastChild: app.lastElementChild,
//   children: app.children,
// });

// /// d'autres slecteurs
// document.getElementById;❌
// ///->document.querySelector("#id")✅
// document.getElementsByClassName;❌
// ///->document.querySelector(".className")✅
// document.getElementsByTagName;❌
// ///->document.querySelector("tagName")✅

// ///Modification de couleur chaque seconde
// const colors = ["red", "blue", "green", "yellow"];
// let i = 0;
// setInterval(() => {
//   app.style.background = colors[i];
//   i++;
//   if (i > colors.length - 1) {
//     i = 0;
//   }
// }, 1000);
