import { View, Text, StyleSheet } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
function RecentExpenses() {
  return <ExpensesOutput durationLabel="Last 7 Days" />;
}

export default RecentExpenses;
