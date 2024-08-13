import { View, Text, StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../Store/expenses-context";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { getDateMinusDay } from "../utils/date";
import { fetchExpenses } from "../utils/http";
import SpinnerOverlay from "../components/UI/SpinnerOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function RecentExpenses() {
  const expContext = useContext(ExpensesContext);
  const [fetchedExpenses, setFetchedExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorOverlayMessage, setErrorOverlayMessage] = useState();

  async function getExpenses() {
    setIsLoading(true);
    try {
      const expenses = await fetchExpenses();
      expContext._setExpenses(expenses);
    } catch (error) {
      setErrorOverlayMessage("Could not fetch!");
    }
    // setFetchedExpenses(expenses)
    setIsLoading(false);
  }
  useEffect(() => {
    getExpenses();
  }, []);

  function modalCloseHandler() {
    setErrorOverlayMessage(null);
  }
  if (errorOverlayMessage && !isLoading) {
    return (
      <ErrorOverlay
        message={errorOverlayMessage}
        onConfirm={modalCloseHandler}
      />
    );
  }
  if (isLoading) {
    return <SpinnerOverlay />;
  }
  const recentExpenses = expContext.expenses.filter((expense) => {
    // const recentExpenses = fetchedExpenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDay(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });
  return (
    <ExpensesOutput expenses={recentExpenses} durationLabel="Last 7 Days" />
  );
}

export default RecentExpenses;
