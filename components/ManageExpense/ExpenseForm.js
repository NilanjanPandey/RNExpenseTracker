import { useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import Input from "./Input";
import { GlobalStyles } from "../../Constants/style";
import Button from "../UI/Button";

function ExpenseForm({ onCancel, onSubmit, isEditing, defaultValue }) {
  const [inputValues, setInputValues] = useState({
    amount: {
      value: defaultValue ? defaultValue.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValue ? defaultValue.date.toISOString().slice(0, 10) : "",
      isValid: true,
    },
    description: {
      value: defaultValue ? defaultValue.description : "",
      isValid: true,
    },
  });
  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputValues((prevState) => {
      return {
        ...prevState,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputValues.amount.value,
      date: new Date(inputValues.date.value),
      description: inputValues.description.value,
    };

    //Error  validation
    const amountValidator =
      !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateValidator = expenseData.date.toString() !== "Invalid Date";
    const descriptionValidator = expenseData.description.trim().length > 0;
    if (amountValidator && dateValidator && descriptionValidator) {
      onSubmit(expenseData);
    } else {
      //   Alert.alert("Invalid input", "Please check your input values.");
      setInputValues((curInput) => {
        return {
          amount: { value: curInput.amount.value, isValid: amountValidator },
          date: { value: curInput.date.value, isValid: dateValidator },
          description: {
            value: curInput.description.value,
            isValid: descriptionValidator,
          },
        };
      });
    }
  }

  const formIsInvalid =
    !inputValues.amount.isValid ||
    !inputValues.date.isValid ||
    !inputValues.description.isValid;

  return (
    <View style={styles.expenseForm}>
      <Text style={styles.title}>Your Expenses</Text>
      <View style={styles.inputRow}>
        <View style={styles.amountContainer}>
          <Input
            label="Amount"
            textInputConfig={{
              keyboardType: "decimal-pad",
              onChangeText: inputChangeHandler.bind(this, "amount"),
              value: inputValues.amount.value,
            }}
            isValid={inputValues.amount.isValid}
          />
        </View>
        <View style={styles.dateContainer}>
          <Input
            label="Date"
            textInputConfig={{
              onChangeText: inputChangeHandler.bind(this, "date"),
              value: inputValues.date.value,
              placeholder: "YYYY-MM-DD",
              //   placeholderTextColor: GlobalStyles.colors.primary800,
              maxLength: 15,
            }}
            isValid={inputValues.date.isValid}
          />
        </View>
      </View>

      <Input
        label="Description"
        textInputConfig={{
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputValues.description.value,
          multiline: true,
        }}
        isValid={inputValues.description.isValid}
      />
      {/* {formIsInvalid && (
        <Text style={styles.errorText}>Please check your data</Text>
      )} */}
      <View style={styles.buttonConatiner}>
        <Button
          externalStyle={styles.buttonStyle}
          mode="flat"
          onPress={onCancel}
        >
          Cancel
        </Button>
        <Button
          externalStyle={styles.buttonStyle}
          mode="flat"
          onPress={submitHandler}
        >
          {isEditing ? "Update" : "Add New"}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;
const styles = StyleSheet.create({
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  amountContainer: {
    flex: 1,
  },
  dateContainer: {
    flex: 1,
  },
  expenseForm: {
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary100,
    marginVertical: 24,
    textAlign: "center",
  },
  buttonConatiner: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonStyle: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
    fontSize: 16,
  },
});
