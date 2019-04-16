/**
 * Created by: Greg Bunyea
 * Modified by: Hao Li
 */

// Disable and Enable any element
// https://stackoverflow.com/questions/625109/jquery-script-load-timing/625126#625126

$.fn.disable = function () {
  return this.each(function () {
      if (typeof this.disabled != "undefined") this.disabled = true;
  });
} // https://stackoverflow.com/questions/625109/jquery-script-load-timing/625126#625126

$.fn.enable = function () {
  return this.each(function () {
      if (typeof this.disabled != "undefined") this.disabled = false;
  });
}


// scenes object fun

function getScene(getName) {
  return scenes.find(item => item.name === getName)
}

// questions object fun

function getQuestion(getName) {
  return questions.find(item => item.name === getName)
}