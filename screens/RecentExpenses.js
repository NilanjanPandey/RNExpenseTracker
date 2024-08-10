import { View, Text, StyleSheet } from "react-native";
import { useContext } from "react";
import { ExpensesContext } from "../Store/expenses-context";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { getDateMinusDay } from "../utils/date";

function RecentExpenses() {
  const expContext = useContext(ExpensesContext);
  const recentExpenses = expContext.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDay(today, 7);

    return expense.date >= date7DaysAgo;
  });
  return (
    <ExpensesOutput expenses={recentExpenses} durationLabel="Last 7 Days" />
  );
}

export default RecentExpenses;
