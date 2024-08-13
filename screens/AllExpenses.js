import { View, Text, StyleSheet } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../Store/expenses-context";
import { useContext } from "react";
import SpinnerOverlay from "../components/UI/SpinnerOverlay";

function AllExpenses() {
  const expContext = useContext(ExpensesContext);
  // console.log(expContext.expenses)
  return (

    <ExpensesOutput expenses={expContext.expenses} durationLabel="Total" />
    
  );
}

export default AllExpenses;
