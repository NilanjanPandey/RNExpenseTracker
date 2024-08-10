import { View, Text, StyleSheet } from "react-native";
import { useContext, useLayoutEffect } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../Constants/style";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../Store/expenses-context";
import generateUniqueId from "../utils/RandomId";
function ManageExpense({ navigation, route }) {
  const expContext = useContext(ExpensesContext);
  const expenseId = route.params?.expenseId;

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
  function confirmHandler() {
    // const generatedID =generateUniqueId();
    if (isEditing) {
      expContext._updateExpense(expenseId, {
        description: "Test123",
        amount: 119.00,
        date: new Date("2024-08-29"),
      });
    } else {
      expContext._addExpense({
        description: "Test",
        amount: "99.00",
        date: new Date("2024-08-20"),
      });
    }
    navigation.goBack();
  }
  return (
    <View style={styles.rootContainer}>
      <View style={styles.buttonConatiner}>
        <Button
          externalStyle={styles.buttonStyle}
          mode="flat"
          onPress={cancelHandler}
        >
          Cancel
        </Button>
        <Button
          externalStyle={styles.buttonStyle}
          mode="flat"
          onPress={confirmHandler}
        >
          {isEditing ? "Update" : "Add New"}
        </Button>
      </View>
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
  buttonConatiner: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonStyle: {
    minWidth: 120,
    marginHorizontal: 8,
  },
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
