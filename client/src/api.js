import axios from "axios";

const API_URL = "http://localhost:5000"; // Adjust if your server runs elsewhere

export const fetchExpenses = (filters) => {
  const params = {};
  if (filters.category) params.category = filters.category;
  if (filters.date) params.date = filters.date;
  return axios.get(`${API_URL}/expenses`, { params });
};

export const addExpense = (expenseData) => {
  return axios.post(`${API_URL}/expenses`, expenseData);
};

export const fetchTotalExpenses = (start, end) => {
  return axios.get(`${API_URL}/expenses/total`, {
    params: { start, end },
  });
};
