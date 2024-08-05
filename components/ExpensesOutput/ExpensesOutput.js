import { View, StyleSheet } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../Constants/style";

const DUMMY = [
  {
    id: "e1",
    description: "A pair of shoe",
    amount: 300.0,
    date: new Date("2024-08-08"),
  },
  {
    id: "e2",
    description: "Mobile Phone",
    amount: 23000.0,
    date: new Date("2024-08-03"),
  },
  {
    id: "e3",
    description: "Credit Card Bill",
    amount: 30000.0,
    date: new Date("2024-08-05"),
  },
  {
    id: "e4",
    description: "Grocessary",
    amount: 500.0,
    date: new Date("2024-08-06"),
  },
  {
    id: "e1",
    description: "A pair of shoe",
    amount: 300.0,
    date: new Date("2024-08-08"),
  },
  {
    id: "e2",
    description: "Mobile Phone",
    amount: 23000.0,
    date: new Date("2024-08-03"),
  },
  {
    id: "e3",
    description: "Credit Card Bill",
    amount: 30000.0,
    date: new Date("2024-08-05"),
  },
  {
    id: "e4",
    description: "Grocessary",
    amount: 500.0,
    date: new Date("2024-08-06"),
  },
  {
    id: "e1",
    description: "A pair of shoe",
    amount: 300.0,
    date: new Date("2024-08-08"),
  },
  {
    id: "e2",
    description: "Mobile Phone",
    amount: 23000.0,
    date: new Date("2024-08-03"),
  },
  {
    id: "e3",
    description: "Credit Card Bill",
    amount: 30000.0,
    date: new Date("2024-08-15"),
  },
  {
    id: "e4",
    description: "Grocessary",
    amount: 500.0,
    date: new Date("2024-08-06"),
  },
];

function ExpensesOutput({ expenses, durationLabel }) {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY} durationLabel={durationLabel} />
      <ExpensesList expenses={DUMMY} />
    </View>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.gray700,
    flex: 1,
  },
});
