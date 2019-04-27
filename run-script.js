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

let questionData = []
let answerData = []

let quizQuestions = []

$(document).ready(function () {
  // $("#button-container").hide()
  $("#intro").hide()
  $("#teach").hide()
  $("#feedbackContainer").hide()
  $("#studentId").hide()
  introductionText()
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


  $.get('project3_data/Answers_data_prj3_updated.csv').done(data => {
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
  questions.forEach(question => {

    let questionId = question['Question_id']

    // get all answers for this question with other info
    let answers = answerData.data.filter(answer => answer['Question_id']===questionId)
    console.log("answers", answers)

    // get all correct answers
    // need more complex evaluation in the future
    let correctAnswers = answers.filter(answer => parseInt(answer['Student_score_on_question']) > 0.9)
    console.log("correctAnswers", correctAnswers)

    // get all incorrect answers
    // need more complex evaluation in the future
    let wrongAnswers = answers.filter(answer => parseInt(answer['Student_score_on_question']) <=0.9)
    console.log("Wrong answers", wrongAnswers)

    // generate random number for correct answers
    let correctNum = Math.random() * 4
    correctNum = Math.floor(correctNum) + 1
    console.log(correctNum)

    // push the first [correctNum] correct answers into answers
    let options = []
    options.push(...correctAnswers.slice(0, correctNum))
    options.push(...wrongAnswers.slice(0, 4-correctNum))
    console.log("options", options)

    // generate JSON object and push to questions
    let buttons = []
    options.forEach(option => {
      let optionObj = {
        "id": "b1",
        "image": "",
        "description": option['Answer_text'],
        "answer": option['Student_score_on_question'] > 0.9 ? true : false,
        "feedback": "",
        "whereTo": ""
      }
      buttons.push(optionObj)
    })

    let questionObj = {
      "name": question['Question_id'],
      "text": question['Question_text'],
      "buttons": buttons
    }

    quizQuestions.push(questionObj)
    console.log(quizQuestions)
  })

  console.log("questions generated")
  checkUnderstanding()
}


function makeQuestion(questions) {
  $("#currQuestion").text(questions[qIndex].text)
  // makeButtons(questions)

  let buttons = questions[qIndex].buttons
  $("#buttonContainer").empty()
  buttons.forEach(b => {
    $("<button/>", {
      id: b.id,
      text: b.description,
    })
      .addClass("options")
      .attr("onClick", "giveFeedback(\"" + questions + "\",\"" + b.answer + "\",\"" + b.feedback + "\",\"" + b.whereTo + "\")")
      .appendTo("#buttonContainer")

    if (b.image != "") {
      $("<img>", { src: b.image }).appendTo("#" + b.id)
    }
  })
  $("#questionContainer").show()

}


function giveFeedback(questions, cor, words, whereTo) {
  console.log("feedback", JSON.stringify(questions))
  $("#questionContainer").hide()
  $("#feedbackContainer").show()

  if (!inQuiz && !inIntro) {
    if (cor === 'true') {
      $("<h3/>", { text: "Correct!" })
        .css('background-color', '#99ff99')
        .appendTo("#feedbackContainer")
    } else {
      $("<h3/>", { text: "That's not correct..." })
        .css('background-color', '#ff6699')
        .appendTo("#feedbackContainer")

      currentQuestions.push(currentQuestions[qIndex])
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
  console.log("feedback", questions)
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
  else if (inQuiz) quizFeedback()
}


function quizFeedback() {

}