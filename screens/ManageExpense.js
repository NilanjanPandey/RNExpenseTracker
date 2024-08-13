import { View, StyleSheet } from "react-native";
import { useContext, useLayoutEffect, useState } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../Constants/style";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../Store/expenses-context";

import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../utils/http";
import SpinnerOverlay from "../components/UI/SpinnerOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function ManageExpense({ navigation, route }) {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();
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

  async function deleteExpenseHandler() {
    setLoading(true);
    try {
      await deleteExpense(expenseId);
      expContext._deleteExpense(expenseId);
      navigation.goBack();
    } catch (error) {
      setError("Could not delete, please try agian!");
      setLoading(false);
    }
    setLoading(false);
    // console.log("expenseID-MangeExpense: ", expenseId);
  }

  function cancelHandler() {
    navigation.goBack();
  }
  async function confirmHandler(expenseData) {
    setLoading(true);
    try {
      if (isEditing) {
        updateExpense(expenseId, expenseData);
        expContext._updateExpense(expenseId, expenseData);
        
      } else {
        const id = await storeExpense(expenseData);
        expContext._addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
      setLoading(false);
    } catch (error) {
      setError("There is some error at our end, please try again later!");
      setLoading(false);
    }

    // const generatedID =generateUniqueId();
  }
  function modalCloseHandler() {
    setError(null);
  }
  if (isLoading) {
    return <SpinnerOverlay />;
  }
  if (error && !isLoading) {
    return <ErrorOverlay message={error} onConfirm={modalCloseHandler} />;
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
