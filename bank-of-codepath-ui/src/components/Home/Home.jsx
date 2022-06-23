import * as React from "react"
import AddTransaction from "../AddTransaction/AddTransaction"
import BankActivity from "../BankActivity/BankActivity"
import "./Home.css"
import { useEffect } from "react"
import axios from 'axios'

export default function Home(props) {
  useEffect(() => {
    props.setIsLoading(true)
    axios.get("http://localhost:3001/bank/transactions")
    .then((transactionData) => {
      props.setTransactions(transactionData.data.transactions)
      console.log("SUCCESSFUL TRANSACTIONS GET CALL")
      console.log(transactionData.data.transactions)
    })
    .catch((error) => {
      alert(error)
      props.setError(error)
    })
    .then(() => {
      props.setIsLoading(false)
    })

    axios.get("http://localhost:3001/bank/transfers")
    .then((transferData) => {
      props.setTransfers(transferData)
      console.log("SUCCESSFUL TRANSFERS GET CALL")
    })
    .catch((error) => {
      alert(error)
      props.setError(error)
    })
    .then(() => {
      props.setIsLoading(false)
    })
  }, []);

  let filteredTransactions = props.transactions
  if (props.filterInputValue && filteredTransactions) {
    filteredTransactions.filter((item) => {
      let loweredDescription = toLowerCase(item.description)
      return loweredDescription.includes(toLowerCase(props.filterInputValue))
    })
  }

  const handleOnSubmitNewTransaction = () => {
    
  }

  return (
    <div className="home">
      <AddTransaction isCreating={props.isCreating} setIsCreating={props.setIsCreating} form={props.newTransactionForm} setForm={props.setNewTransactionForm} handleOnSubmit={handleOnSubmitNewTransaction}/>
      {props.isLoading ? <h1>Loading...</h1> : <BankActivity transactions={filteredTransactions} /> }
      {props.error ? <h2 className="error">{props.error}</h2> : false }
    </div>
  )
}
