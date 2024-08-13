import { createContext, useState, useReducer } from "react";
import { generateUniqueId } from "../utils/RandomId";

export const ExpensesContext = createContext({
  expenses: [],
  _addExpense: ({ description, amount, date }) => {},
  _deleteExpense: (id) => {},
  _setExpenses: (expenses) => {},
  _updateExpense: ({ id, description, amount, date }) => {},
});

function expenseReducer(state, action) {
  switch (action.type) {
    case "Add":
      // const id = generateUniqueId();
      return [action.payload, ...state];
    case "Set":
      const invertedExpenses = action.payload.reverse()
      return invertedExpenses;
    case "Update":
      const updateItmeIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updateablExpense = state[updateItmeIndex];
      const updatedItem = { ...updateablExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updateItmeIndex] = updatedItem;
      return updatedExpenses;
    case "Delete":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}
function ExpenseContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expenseReducer, []);

  //Add Expense
  function addExpense(expenseData) {
    dispatch({ type: "Add", payload: expenseData });
  }

  //Set Expenses

  function setExpenses(expenses) {
    dispatch({ type: "Set", payload: expenses });
  }
  //Delete Expense
  function deleteExpense(id) {
    dispatch({ type: "Delete", payload: id });
  }

  //Update Expense
  function updateExpense(id, expenseData) {
    dispatch({ type: "Update", payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    _addExpense: addExpense,
    _setExpenses: setExpenses,
    _deleteExpense: deleteExpense,
    _updateExpense: updateExpense,
  };
  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpenseContextProvider;
