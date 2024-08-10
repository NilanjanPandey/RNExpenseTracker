import { createContext, useState, useReducer } from "react";
import { generateUniqueId } from "../utils/RandomId";

const DUMMY_EXPENSES = [
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
    description: "Repair Phone",
    amount: 23000.0,
    date: new Date("2024-08-19"),
  },
  {
    id: "e5",
    description: "Credit Card Bill",
    amount: 30000.0,
    date: new Date("2024-08-25"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  _addExpense: ({ description, amount, date }) => {},
  _deleteExpense: (id) => {},
  _updateExpense: ({ id, description, amount, date }) => {},
});

function expenseReducer(state, action) {
  switch (action.type) {
    case "Add":
      const id = generateUniqueId();
      return [{ ...action.payload, id: id }, ...state];
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
  const [expensesState, dispatch] = useReducer(expenseReducer, DUMMY_EXPENSES);

  //Add Expense
  function addExpense(expenseData) {
    dispatch({ type: "Add", payload: expenseData });
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
