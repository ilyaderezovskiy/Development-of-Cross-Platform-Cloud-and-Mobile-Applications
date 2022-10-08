let operations = ['*', '+', '-', '/']
let maxFieldLength = 12
var eraseOnEnter = true

setButtonsActions()

function setButtonsActions() {
  document.getElementById("clear").onclick = function() {
    document.getElementById("field").innerHTML = ''
    eraseOnEnter = true
  }

  let padButtons = document.getElementById("keyboard").getElementsByTagName("button")
  for (const button of padButtons) {
    if (button.innerHTML == "=") {
      button.onclick = function() {calculate()}
    } else {
      button.onclick = function() {enterSymbol(button.innerHTML)}
    }
  }
}

function enterSymbol(x) {
  var resultField = document.getElementById("field")

  if (resultField.innerHTML.length == maxFieldLength) { return }
  var v = resultField.innerHTML.slice(-1)
  if (x == '.' && (v === '.' || v == '' || operations.indexOf(v) != -1)) { return }
  if (x == '.') {
    var mas = resultField.innerHTML.split('*').join(';').split('+').join(';').split('/').join(';').split('-').join(';').split(';')
    if (mas[mas.length-1].includes('.')) { return }
  }
  if (operations.indexOf(x) != -1 && resultField.innerHTML === '') { return }

  if (operations.indexOf(x) != -1 && operations.indexOf(v) != -1) { return }
  if (eraseOnEnter) {
    resultField.innerHTML = x
    eraseOnEnter = false
  } else {
    resultField.innerHTML += x
  }
}

function calculate() {
  let field = document.getElementById("field")
  let statement = field.innerHTML
  let result = Function(`'use strict'; return (${statement})`)()

  let strResult = String(result)
  if (strResult.includes(",") || strResult.includes(".")) {
    if (strResult.length > maxFieldLength) {
      result = String(parseFloat(result).toFixed(maxFieldLength - 1 - strResult.split('.')[0].length))
    } else {
      result = String(parseFloat(result))
    }
  }

  if (result.length > maxFieldLength) {
    field.innerHTML = "Too big number"
    eraseOnEnter = true
  } else {
    field.innerHTML = result
  }

  eraseOnEnter = false
  if (result == 'Infinity') {
    eraseOnEnter = true
  }
}