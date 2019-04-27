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


    let example = {
      "name": "",
      "text": "",
      "buttons": [
          {
              "id": "b1",
              "image": "",
              "description": "",
              "answer": true,
              "feedback": "",
              "whereTo": ""
          },
          {
              "id": "b2",
              "image": "",
              "description": "",
              "answer": false,
              "feedback": "",
              "whereTo": ""
          },
          {
              "id": "b3",
              "image": "",
              "description": "",
              "answer": false,
              "feedback": "",
              "whereTo": ""
          },
          {
              "id": "b4",
              "image": "",
              "description": "",
              "answer": false,
              "feedback": "",
              "whereTo": ""
          }
      ]
  }
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

function talkInGroup() {
  $("#feedbackContainer").hide()
  $("#teach").show()
  $("#section").html("Talk with Each Other")
  console.log("talk in group")

  $("#teach").html("<h3>Talk with your partner about what you learned, and make sure they understand the following topics:</h3>")

  let topics = [
    "The name of your technique",
    "The shape of the device (grinder or steel)",
    "Why your technique does or does not result in particles on the knife",
    "What condition of the knife does your technique fix",
    "What happens to the knife during use of the device",
    "Misconceptions held about your sharpening technique"
  ]

  for (let i in topics) {
    $("#teach")
      .append('<div class="form-check">' +
        '<input type="checkbox" class="form-check-input">' +
        '<label class="form-check-label" for="exampleCheck1">' + topics[i] + '</label>' +
        '</div>')
  }
  $("#teach").append("<button id='goToQuiz' class='btn btn-outline-secondary'>Take a Quiz</button>")
  $("#goToQuiz").hide()
  $(".form-check").click(function () {
    let checked = $('input[type=checkbox]:checked').siblings().text()
    console.log(checked)


    if (checked === topics.join("")) {
      $("#goToQuiz").show().click(function () {
        quiz()
      })
    } else {
      $("#goToQuiz").hide()
    }
  })
}

function quiz() {
  $("#section").html("Quiz")
  inQuiz = true
  qIndex = 0
  console.log("doing quiz")

  $("#teach").hide()
  $("#feedbackContainer").hide()
  $("#intro").hide()
  console.log(questions)
  currentQuestions = questions
  makeQuestion(currentQuestions)
}

function quizFeedback() {
  console.log("quizFeedback")
  console.log("quizSelf:", quizSelf)
  console.log("quizOthers:", quizOthers)
  $("#section").html("Feedback!")
  let selfScore = 0, othersScore = 0
  let selfPoints = 10, othersPoints = 20
  let bonus = 0

  let selfFeedback = "", othersFeedback = ""

  for (let i in quizSelf) {
    if (quizSelf[i] === "true") selfScore += selfPoints
  }
  for (let i in quizOthers) {
    if (quizOthers[i] === "true") othersScore += othersPoints
  }

  console.log("score", selfScore + othersScore + bonus)
  if (selfScore < 40) {
    selfFeedback = "You made some mistakes on the video that was assigned to you. You may want to revisit the video and try again."
  } else {
    selfFeedback = "Good work! You know your technique well."
  }

  if (othersScore < 100) {
    othersFeedback = ""
  } else if (othersScore < 160) {
    othersFeedback = "there are a few points you missed on the other technique. You should teach each other again and retry the quiz."
  } else {
    othersFeedback = "you clearly know how both grinding and honing work and when to use each."
  }
  $("#feedbackContainer").empty().show()
  $("#feedbackContainer").append("<h6>" + selfFeedback + "</h6>")
  $("#feedbackContainer").append("<h6> Also, " + othersFeedback + "</h6>")
}