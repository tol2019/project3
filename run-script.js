/**
 * Created by: Greg Bunyea
 * Modified by: Hao Li
 */

// const csv = require('csvtojson')
const parseConfig = {
  header: true
}

let quizRound = 1
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

$(document).ready(function () {
  // $("#button-container").hide()
  $("#intro").hide()
  $("#teach").hide()
  $("#feedbackContainer").hide()
  $("#studentId").hide()
  // introductionText()
  inIntro = false
  readFiles()
  generateQuestions(quizRound)

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
  $.get('project3_data/Answers.csv')
    .done(data => {
      // PapaParse
      answerData = Papa.parse(data, parseConfig)
      console.log("answer data:", answerData)

      $.get('project3_data/Questions.csv').done(data => {
        questionData = Papa.parse(data, parseConfig)
        console.log("question data", questionData)

        generateQuestions(quizRound)

      })

    })
}

function generateQuestions(quizRound) {
  console.log("quiz round", quizRound)
  let questions = questionData.data
  quizQuestions = []
  qIndex = 0;


  questions.forEach(question => {
    correctAnswerKey = ""

    let questionId = question['Question_id']

    // get all answers for this question with other info
    let answers = answerData.data.filter(answer => answer['Question_id'] === questionId)
    console.log("answers", answers)

    // get all correct answers
    // need more complex evaluation in the future
    // let correctAnswers = answers.filter(answer => parseInt(answer['Student_score_on_question']) > 0.9)
    let correctAnswers = selectCorrectAnswers(answers)
    console.log("correctAnswers", correctAnswers)

    // get all incorrect answers
    // need more complex evaluation in the future
    // let wrongAnswers = answers.filter(answer => parseInt(answer['Student_score_on_question']) <= 0.9)
    let wrongAnswers = selectWrongAnswers(answers)
    console.log("Wrong answers", wrongAnswers)

    // generate random number for correct answers
    // quiz round 1, only one correct
    // round 2 only 2?
    let correctNum = 0
    if (quizRound == 1) {
      correctNum = 1
    } else {
      correctNum = Math.random() * 4
      correctNum = Math.floor(correctNum) + 1
      console.log(correctNum)
    }


    // push the first [correctNum] correct answers into answers
    let options = []
    options.push(...correctAnswers.slice(0, correctNum))
    options.push(...wrongAnswers.slice(0, 4 - correctNum))
    console.log("options", options)

    let optionsShuffled = shuffleOptions(options)
    options = optionsShuffled

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



  console.log("questions generated")
  checkUnderstanding()
}


function makeQuestion(questions) {
  // $("#questionContainer").empty()
  $("#feedbackContainer").empty().hide()
  $("#q-num").empty().html("<h2>question " + (qIndex+1) + " of " + quizQuestions.length + "</h2>")

  $("#currQuestion").text(questions[qIndex].text)

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

    if(quizRound === 1){
      $("<input>", {
        id: "input-" + b.id,
        type: "radio", 
        name: "options"
      }).addClass("options")
        .addClass("form-check-input")
        .appendTo("#form-check-" + b.id)
    }else{
      $("<input>", {
        id: "input-" + b.id,
        type: "checkbox"
      }).addClass("options")
        .addClass("form-check-input")
        .appendTo("#form-check-" + b.id)
    }
    

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
    id: "check-answer",
    text: "Check Answer!"
  }).addClass("btn btn-outline-secondary")
    .appendTo("#buttonContainer")
    .click(function () {
      let cor = false
      let feedback = ""
      console.log(checked)
      let results = $('input');
      console.log("results", results)
      quizQuestions[qIndex].result.answered = true
      console.log(qIndex)
      for (let index = 0; index < results.length; index++) {
        if (results[index].checked) {
          quizQuestions[qIndex].result.answerResult[index].selected = true
        }
      }
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
  // $("#questionContainer").hide()
  $("#feedbackContainer").empty().show()
  $("#check-answer").hide()

  let correct = true;

  if (!inQuiz && !inIntro) {


    // ORIGINAL THOUGHTS
    // if one question is answered incorrectly 
    // push them to the end of the array
    // enabling the learner to take the quiz again 
    // regenerateQuestion();
    // currentQuestions.push(currentQuestions[qIndex])



    /**
     * CORRECTNESS FEEDBACK
     * show selected in bold
     * if correct, display as green
     * if wrong, display as red
     */
    quizQuestions[qIndex].result.answerResult.forEach((option, index) => {
      if (option.selected) {
        $("#form-check-b" + (index + 1) + " .form-check-label").css({ "font-weight": "bold" })
      }
      // if (option.selected === option.key) {
      //   $("#form-check-b"+(index+1)).css({"border": "2px solid green", "background-color":"rgba(36, 255, 36, 0.25)"})
      // } else {
      //   $("#form-check-b"+(index+1)).css({"border": "2px solid red", "background-color":"rgba(255, 36, 36, 0.25)"})
      // }
      if (option.selected !== option.key) {
        correct = false
      }
      if (option.key) {
        $("#form-check-b" + (index + 1)).css({ "border": "2px solid green", "background-color": "rgba(36, 255, 36, 0.25)" })
      } else {
        $("#form-check-b" + (index + 1)).css({ "border": "2px solid red", "background-color": "rgba(255, 36, 36, 0.25)" })
      }
    })

    if (correct) {
      $("<h3/>", { text: "Correct!" })
        .css('background-color', '#99ff99')
        .appendTo("#feedbackContainer")
        qIndex += 1
    } else {
      $("<h3/>", { text: "That's not correct..." })
        .css('background-color', '#ff6699')
        .appendTo("#feedbackContainer")

        for (let index = 0; index < quizQuestions[qIndex].result.answerResult.length; index++) {
            quizQuestions[qIndex].result.answerResult[index].selected = false
        }
    }

    // $("<p/>", { text: words }).appendTo("#feedbackContainer")

    $("<button/>", { text: "Continue" })
      .attr("onClick", "clearFeedback()")
      .addClass("btn btn-outline-secondary")
      .appendTo("#feedbackContainer")
    // .appendTo("#questionContainer")

  } else if (inIntro) {
    clearFeedback()
  } else {

    clearFeedback()
  }
}


function clearFeedback() {
  // console.log("feedback", questions)
  $("#feedbackContainer").empty().hide()
  
  if (qIndex < currentQuestions.length) {
    makeQuestion(currentQuestions)
  } else if (inIntro) {
    console.log("clear feedback")
    inIntro = false
    readFiles()
    generateQuestions(quizRound)

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
    quizRound = 2
    readFiles()
    generateQuestions(quizRound)
  })

}


// regenerate this question for retaking.
// what data can be used?
// select different options
// keep track of what options the player answered correctly
function regenerateQuestion() {

}

function shuffleOptions(options) {
  let optionsShuffled = []
  let tmpOptions = options
  while (tmpOptions.length > 0) {
    let random = Math.random() * tmpOptions.length
    random = Math.floor(random)
    console.log("random", random)
    let selected = tmpOptions.splice(random, 1)
    console.log("selected", selected)
    optionsShuffled.push(selected[0])
  }
  console.log("optionsShuffled", optionsShuffled)

  return optionsShuffled
}

function selectCorrectAnswers(answers){
  let selectedAnswers = answers.filter(answer => parseInt(answer['Student_score_on_question']) > 0.9)
  return selectedAnswers
}

function selectWrongAnswers(answers){
  let selectedAnswers = answers.filter(answer => parseInt(answer['Student_score_on_question']) <= 0.9)
  return selectedAnswers
}