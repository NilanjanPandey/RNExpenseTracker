import axios from "axios";
const _url =
  "https://rn-expensetracker-a7ecf-default-rtdb.asia-southeast1.firebasedatabase.app";

//POST
export function storeExpense(expenseData) {
  axios.post(_url + "/expenses.json", expenseData);
}

//GET
export async function fetchExpenses() {
  const response = await axios.get(_url + "/expenses.json");
  const expenses = [];
  console.log(response.data)
  for (const key in response.data) {
    const obj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(obj)
  }
  return expenses;
}
