/**
 * Created by: Greg Bunyea
 * Modified by: Hao Li
 */

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

  

  
  if (quizRound === 1) {
    $("#q-num").empty().html("<h2>Warm Up: question " + (qIndex + 1) + " of " + quizQuestions.length + "</h2>")
  } else {
    $("#q-num").empty().html("<h2>Quiz: question " + (qIndex + 1) + " of " + quizQuestions.length + "</h2>")
  }

  // $("#currQuestion").empty()
  $("#questionContainer").empty()

  $("<h3/>", {
    id: "question-statement",
    text: questions[qIndex].text
  }).appendTo("#questionContainer")
  $("<p/>", {
    id: "instruction",
    text: quizRound === 1 ? "Choose the correct one." : "Select all that apply."
  }).appendTo("#questionContainer")

  $("<div/>", {
    id: "buttonContainer"
  }).appendTo("#questionContainer")

  let buttons = questions[qIndex].buttons
  $("#buttonContainer").empty()
  $("<form/>", {
    id: "answers-form"
  }).addClass("answers-form")
    .appendTo("#buttonContainer")

  

  buttons.forEach(b => {
    $("<p/>", {
      id: "form-check-" + b.id
    }).addClass("form-check").appendTo("#answers-form")

    $("<label/>", {
      id: "form-check-label-" + b.id
    }).appendTo("#form-check-" + b.id)

    if (quizRound === 1) {
      $("<input/>", {
        id: "input-" + b.id,
        type: "radio",
        name: "options"
      }).addClass("options")
        .addClass("form-check-input")
        .appendTo("#form-check-label-" + b.id)
    } else {
      $("<input/>", {
        id: "input-" + b.id,
        type: "checkbox"
      }).addClass("options")
        .addClass("form-check-input")
        .appendTo("#form-check-label-" + b.id)
    }


    $("<span/>", {
      text: b.description
    }).addClass("form-check-label")
      .appendTo("#form-check-label-" + b.id)

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

  // disable the inputs

  $(".options").attr({ "disabled": "disabled" })

  let correct = true;

  if (!inQuiz && !inIntro) {

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
      if (option.selected !== option.key) {
        correct = false
      }

      
      if (!correct && option.selected) {
        $("#form-check-b" + (index + 1)).css({ "border": "2px solid rgba(255, 36, 36, 0.1)", "background-color": "rgba(255, 36, 36, 0.1)" })
      }
      if (option.key) {
        $("#form-check-b" + (index + 1)).css({ "border": "2px solid rgba(36, 255, 36, 0.25)", "background-color": "rgba(36, 255, 36, 0.25)" })
      }

    })

    quizQuestions[qIndex].result.result = correct

    if (correct) {
      $("<h3/>", { text: "Correct!" })
        .css({ "background-color": "rgba(36, 255, 36, 0.25)" })
        .appendTo("#feedbackContainer")
      qIndex += 1
    } else {
      $("<h3/>", { text: "That's not correct..." })
        .css({ "background-color": "rgba(255, 36, 36, 0.1)" })
        .appendTo("#feedbackContainer")


      if (quizRound === 2) {
        qIndex += 1
      } else {
        for (let index = 0; index < quizQuestions[qIndex].result.answerResult.length; index++) {
          quizQuestions[qIndex].result.answerResult[index].selected = false
        }
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
  if (quizRound === 1) {
    $("<button/>", { text: "I'm ready for the challenge!" })
      .addClass("btn btn-outline-secondary quiz-again")
      .appendTo("#feedbackContainer")

    $(".quiz-again").click(function () {
      quizRound = 2
      readFiles()
      generateQuestions(quizRound)
    })
  } else {
    $("<button/>", {
      text: "See summary!",
      id: "summary"
    })
      .addClass("btn btn-outline-secondary")
      .appendTo("#feedbackContainer")

    $("#summary").click(function () {
      console.log("summary")
      let correctNum = 0
      let incorrectNum = 0
      quizQuestions.forEach(question => {
        if (question.result.result) correctNum += 1
        else incorrectNum += 1
      })

      // $("#currQuestion").empty()
      $("#questionContainer").empty()
      $("#feedbackContainer").empty().show()

      $("#q-num").empty().html("<h2>Summary</h2>")

      $("<p/>", {
        text: "Correct: " + correctNum,
      }).appendTo("#feedbackContainer")

      $("<p/>", {
        text: "Incorrect: " + incorrectNum
      }).appendTo("#feedbackContainer")

      $("<button/>", { text: "I'm ready for the challenge!" })
        .addClass("btn btn-outline-secondary quiz-again")
        .appendTo("#feedbackContainer")

      $(".quiz-again").click(function () {
        quizRound = 2
        readFiles()
        generateQuestions(quizRound)
      })


    })
  }


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

function selectCorrectAnswers(answers) {
  let selectedAnswers = answers.filter(answer => parseInt(answer['Student_score_on_question']) > 0.9)
  selectedAnswers = shuffleOptions(selectedAnswers)
  return selectedAnswers
}

function selectWrongAnswers(answers) {
  let selectedAnswers = answers.filter(answer => parseInt(answer['Student_score_on_question']) <= 0.9)
  selectedAnswers = shuffleOptions(selectedAnswers)
  return selectedAnswers
}