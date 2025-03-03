import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import { addExpense } from "../api";

function ExpenseForm({ onAddExpense }) {
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    date: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.category || !formData.date) {
      alert("Amount, Category, and Date are required!");
      return;
    }

    try {
      await addExpense({
        amount: parseFloat(formData.amount),
        category: formData.category,
        date: formData.date,
        description: formData.description,
      });
      // Clear form
      setFormData({ amount: "", category: "", date: "", description: "" });
      if (onAddExpense) onAddExpense();
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            type="number"
            label="Amount"
            name="amount"
            variant="outlined"
            value={formData.amount}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Category"
            name="category"
            variant="outlined"
            value={formData.category}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            type="date"
            label="Date"
            name="date"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={formData.date}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Description"
            name="description"
            variant="outlined"
            value={formData.description}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 2 }}
        color="secondary"
      >
        Add Expense
      </Button>
    </form>
  );
}

export default ExpenseForm;
