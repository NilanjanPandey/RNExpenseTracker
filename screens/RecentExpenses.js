import { View, Text, StyleSheet } from "react-native";
import { useContext, useEffect,useState } from "react";
import { ExpensesContext } from "../Store/expenses-context";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { getDateMinusDay } from "../utils/date";
import { fetchExpenses } from "../utils/http";

function RecentExpenses() {
  const [fetchedExpenses, setFetchedExpenses]= useState([])
  async function getExpenses() {
    const expenses = await fetchExpenses();
    setFetchedExpenses(expenses)
  }
  useEffect(() => {
    getExpenses();
  }, []);

  // const expContext = useContext(ExpensesContext);
  // const recentExpenses = expContext.expenses.filter((expense) => {
    const recentExpenses = fetchedExpenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDay(today, 7);

    return expense.date >= date7DaysAgo;
  });
  return (
    <ExpensesOutput expenses={fetchedExpenses} durationLabel="Last 7 Days" />
  );
}

export default RecentExpenses;
