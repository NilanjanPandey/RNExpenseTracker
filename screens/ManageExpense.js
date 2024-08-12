import { View, StyleSheet } from "react-native";
import { useContext, useLayoutEffect } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../Constants/style";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../Store/expenses-context";

import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense } from "../utils/http";


function ManageExpense({ navigation, route }) {
  const expContext = useContext(ExpensesContext);
  const expenseId = route.params?.expenseId;

  const selectedExpense = expContext.expenses.find(
    (expense) => expense.id === expenseId
  );

  //Double exclamation converts any value to its corresponding boolean.

  const isEditing = !!expenseId;
  // console.log(isEditing)
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandler() {
    // console.log("expenseID-MangeExpense: ", expenseId);
    expContext._deleteExpense(expenseId);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }
  function confirmHandler(expenseData) {
    // const generatedID =generateUniqueId();
    if (isEditing) {
      expContext._updateExpense(expenseId, expenseData);
    } else {
      expContext._addExpense(expenseData);
      storeExpense(expenseData)
    }
    navigation.goBack();
  }
  return (
    <View style={styles.rootContainer}>
      <ExpenseForm
        onCancel={cancelHandler}
        isEditing={isEditing}
        onSubmit={confirmHandler}
        defaultValue={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
