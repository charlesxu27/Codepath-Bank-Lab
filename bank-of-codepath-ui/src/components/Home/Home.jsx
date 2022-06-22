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
      props.setTransactions(transactionData)
      console.log("SUCCESSFUL TRANS GET CALL")
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
  if (props.filterInputValue) {
    
  }

  return (
    <div className="home">
      <AddTransaction />
      {props.isLoading ? <h1>Loading...</h1> : <BankActivity /> }
      {props.error ? <h2 className="error">{props.error}</h2> : false }
    </div>
  )
}
