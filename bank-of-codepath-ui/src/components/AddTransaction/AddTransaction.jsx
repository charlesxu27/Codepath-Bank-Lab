import * as React from "react"
import "./AddTransaction.css"

export default function AddTransaction(props) {
  const handleOnFormFieldChange = (event, field) => {
    let tempForm = props.form
    tempForm[event.target.name] = event.target.value
    console.log(tempForm)
    props.setForm(tempForm)
  }
  return (
    <div className="add-transaction">
      <h2>Add Transaction</h2>
      <AddTransactionForm handleOnFormFieldChange={handleOnFormFieldChange}/>
    </div>
  )
}

export function AddTransactionForm(props) {
  return (
    <div className="form">
      <div className="fields">
        <div className="field">
          <label>Description</label>
          <input type="text" name="description" placeholder="Enter a description" onChange={props.handleOnFormFieldChange}/>
        </div>
        <div className="field">
          <label>Category</label>
          <input type="text" name="category" placeholder="Enter a category" onChange={props.handleOnFormFieldChange}/>
        </div>
        <div className="field half-flex">
          <label>Amount (cents)</label>
          <input type="number" name="amount" placeholder="Enter an Amount" onChange={props.handleOnFormFieldChange}/>
        </div>

        <button className="btn add-transaction" type="submit" onClick={props.handleOnSubmit}>
          Add
        </button>
      </div>
    </div>
  )
}
