import React from "react";
import store from "./store";
import './App.css';

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      out: '0'
    }
    this.refOutput = React.createRef()
  }

  tapeNumber(value) {
    let currentValue = value
    let output = this.refOutput.current

    this.setState( {
      out: currentValue
    })

    if (output.value === '0') {
      output.value = ''
    }
    if (output.value.length <= 16) {
      output.value += currentValue
    }
  }

  tapeOperation(value) {
    let output = this.refOutput.current

    if (value === 'CE') {
      if (output.value.length === 1 || output.value === 'error' || output.value === 'Infinity') {
        output.value = '0'
      } else {
        output.value = output.value.substring(0, output.value.length - 1)
      }
    }
    else if (value === 'C') {
      output.value = '0'
    }
    else if (value === '=') {
      try {
        var ans = eval(output.value)

        if (ans.length > 28) {
          output.value = "Too big number"
          setTimeout(() => {
            output.value = '0'
          }, 1500)
        } else {
          output.value = eval(output.value)

          if (output.value === 'Infinity') {
          setTimeout(() => {
            output.value = '0'
          }, 1500)
        }
        }
      } catch {
        output.value = 'error'
        setTimeout(() => {
          output.value = '0'
        }, 1500)
      }
    }
  }

  render() {
    return (
      <div className="container">
        <div className="output">
          <input ref={this.refOutput} type="text" defaultValue={this.state.out} size="30" />
        </div>
        <div className="buttons">
          {store.operations.map((item, index) => <button
          key={index}
          onClick={() => {this.tapeOperation(item.val)}}
          >{item.val}</button>)}

          {store.buttons.map((item, index) => <button
          key={index}
          onClick={() => {this.tapeNumber(item.val)}}
          >{item.val}</button>)}
        </div>
      </div>
    )
  }
}

export default App