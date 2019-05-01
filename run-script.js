/**
 * Created by: Greg Bunyea
 * Modified by: Hao Li
 */

// const csv = require('csvtojson')
const parseConfig = {
  header: true
}

let studentId = ""
let scene = 0
let expertQuizQuestions = {}
let finalQuizQuestions = {}
let qIndex = 0
let inIntro = true
let inQuiz = false
let correctAnswers = ""

let questionData = []
let answerData = []

let quizQuestions = []

let answerResults = []

$(document).ready(function () {
  // $("#button-container").hide()
  $("#intro").hide()
  $("#teach").hide()
  $("#feedbackContainer").hide()
  $("#studentId").hide()
  // introductionText()
  inIntro = false
  readFiles()
  generateQuestions()

})

function introductionText() {
  $("#intro").show()
  qIndex = 0
  currentQuestions = introductionScripts

  makeQuestion(currentQuestions)
}


function checkUnderstanding() {
  console.log("check understanding")
  currentQuestions = quizQuestions
  qIndex = 0
  console.log("currentQuestions", currentQuestions)
  makeQuestion(currentQuestions)
}

function readFiles() {


  $.get('project3_data/Answers_data_prj3_updated.csv')
    .done(data => {
      // trying PapaParse
      answerData = Papa.parse(data, parseConfig)
      console.log("answer data:", answerData)

      $.get('project3_data/Questions_data_prj3.csv').done(data => {
        questionData = Papa.parse(data, parseConfig)
        console.log("question data", questionData)

        generateQuestions()

      })

    })
}

function generateQuestions() {
  let questions = questionData.data
  answerResults = []


  questions.forEach(question => {
    correctAnswerKey = ""

    let questionId = question['Question_id']

    // get all answers for this question with other info
    let answers = answerData.data.filter(answer => answer['Question_id'] === questionId)
    console.log("answers", answers)

    // get all correct answers
    // need more complex evaluation in the future
    let correctAnswers = answers.filter(answer => parseInt(answer['Student_score_on_question']) > 0.9)
    console.log("correctAnswers", correctAnswers)

    // get all incorrect answers
    // need more complex evaluation in the future
    let wrongAnswers = answers.filter(answer => parseInt(answer['Student_score_on_question']) <= 0.9)
    console.log("Wrong answers", wrongAnswers)

    // generate random number for correct answers
    let correctNum = Math.random() * 4
    correctNum = Math.floor(correctNum) + 1
    console.log(correctNum)

    // push the first [correctNum] correct answers into answers
    let options = []
    options.push(...correctAnswers.slice(0, correctNum))
    options.push(...wrongAnswers.slice(0, 4 - correctNum))
    console.log("options", options)

    // generate JSON object and push to questions
    let buttons = []
    let answerResult = []
    options.forEach((option, index) => {
      console.log("option index", index);
      let optionObj = {
        "id": "b" + (index + 1).toString(),
        "image": "",
        "description": option['Answer_text'],
        "answer": option['Student_score_on_question'] > 0.9 ? true : false,
        "feedback": "",
        "whereTo": ""
      }
      answerResult.push({
        "key": optionObj.answer,
        "selected": false
      })
      buttons.push(optionObj)
    })
    console.log("correct answers:", correctAnswerKey)
    answerResults.push({ answerResult, "answered": false });


    let questionObj = {
      "name": question['Question_id'],
      "text": question['Question_text'],
      "buttons": buttons,
      "result": {
        answerResult,
        "answered": false
      }
    }

    quizQuestions.push(questionObj)
    console.log("quizQuestions", quizQuestions)
  })

  console.log("questions and results", answerResults)

  console.log("questions generated")
  checkUnderstanding()
}


function makeQuestion(questions) {
  $("#feedbackContainer").empty().hide()

  $("#currQuestion").text(questions[qIndex].text)
  // makeButtons(questions)

  let buttons = questions[qIndex].buttons
  $("#buttonContainer").empty()
  $("<div/>", {
    id: "answers-form"
  }).addClass("answers-form")
    .appendTo("#buttonContainer")

  buttons.forEach(b => {
    $("<div/>", {
      id: "form-check-" + b.id
    }).addClass("form-check").appendTo("#answers-form")

    $("<input>", {
      id: "input-" + b.id,
      type: "checkbox"
    }).addClass("options")
      .addClass("form-check-input")
      .appendTo("#form-check-" + b.id)

    $("<label/>", {
      text: b.description
    }).addClass("form-check-label")
      .appendTo("#form-check-" + b.id)

    if (b.image != "") {
      $("<img>", { src: b.image }).appendTo("#form-check-" + b.id)
    }
  })
  let checked = ""
  $("<button/>", {
    text: "Check Answer!"
  }).addClass("btn btn-outline-secondary")
    .appendTo("#buttonContainer")
    .click(function () {
      let cor = false
      let feedback = ""
      console.log(checked)
      let results = $('input');
      console.log("results", results)
      answerResults[qIndex].answered = true
      quizQuestions[qIndex].result.answered = true
      for (let index = 0; index < results.length; index++) {
        if (results[index].checked) {
          answerResults[qIndex].answerResult[index].selected = true
          quizQuestions[qIndex].result.answerResult[index].selected = true
        }
      }
      console.log("answerResults", answerResults)
      console.log("quizQuestions", quizQuestions)

      if (checked == questions[qIndex].correct) {
        feedback = "correct!"
        cor = true
      } else {
        feedback = "incorrect!"

      }
      giveFeedback(currentQuestions, cor, feedback, "")
    })

  $(".form-check").click(function () {
    checked = $('input[type=checkbox]:checked').siblings().text();
    console.log(checked);
  });

  $("#questionContainer").show()

}


function giveFeedback(questions, cor, words, whereTo) {
  // console.log("feedback", JSON.stringify(questions))
  $("#questionContainer").hide()
  $("#feedbackContainer").show()

  if (!inQuiz && !inIntro) {
    if (cor === true) {
      $("<h3/>", { text: "Correct!" })
        .css('background-color', '#99ff99')
        .appendTo("#feedbackContainer")
    } else {
      $("<h3/>", { text: "That's not correct..." })
        .css('background-color', '#ff6699')
        .appendTo("#feedbackContainer")

      // regenerateQuestion();
      // currentQuestions.push(currentQuestions[qIndex])
    }
    $("<p/>", { text: words }).appendTo("#feedbackContainer")

    $("<button/>", { text: "Continue" })
      .attr("onClick", "clearFeedback(\"" + questions + "\")")
      .addClass("btn btn-outline-secondary")
      .appendTo("#feedbackContainer")

  } else if (inIntro) {
    clearFeedback()
  } else {

    clearFeedback()
  }
}


function clearFeedback(questions) {
  // console.log("feedback", questions)
  $("#feedbackContainer").empty().hide()
  qIndex += 1
  if (qIndex < currentQuestions.length) {
    makeQuestion(currentQuestions)
  } else if (inIntro) {
    console.log("clear feedback")
    inIntro = false
    readFiles()
    generateQuestions()

  }
  // else if (!inQuiz) talkInGroup()
  else quizFeedback()
}

// question answer status
// correct options
// student choice
// matched label green
// not matched label red
function quizFeedback() {
  $("#feedbackContainer").show();
  $("<button/>", { text: "Take the quiz again!" })
    .addClass("btn btn-outline-secondary quiz-again")
    .appendTo("#feedbackContainer")

  $(".quiz-again").click(function () {

    readFiles()
    generateQuestions()
  })

}


// regenerate this question for retaking.
// what data can be used?
// select different options
// keep track of what options the player answered correctly
function regenerateQuestion() {

}