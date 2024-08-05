import { FlatList, Text } from "react-native";
import ExpenseItem from "./ExpenseItem";

function renderExpenseItems(itemData) {
  //   console.log(itemData.item);
  return (
    <ExpenseItem
      amount={itemData.item.amount}
      description={itemData.item.description}
      date={itemData.item.date}
    />
  );
}

function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItems}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ExpensesList;
