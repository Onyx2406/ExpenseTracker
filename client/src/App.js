import React, { useState, useEffect } from "react";
import {
  ThemeProvider,
  Container,
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  TextField,
} from "@mui/material";
import theme from "./theme";

// Components
import Header from "./components/Header";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

// API calls
import { fetchExpenses, fetchTotalExpenses } from "./api";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [filters, setFilters] = useState({ category: "", date: "" });
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [total, setTotal] = useState(0);

  useEffect(() => {
    loadExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const loadExpenses = async () => {
    try {
      const { data } = await fetchExpenses(filters);
      setExpenses(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddExpense = () => {
    // After adding, reload expenses
    loadExpenses();
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleDateRangeChange = (e) => {
    setDateRange({ ...dateRange, [e.target.name]: e.target.value });
  };

  const handleGetTotal = async () => {
    if (!dateRange.start || !dateRange.end) {
      alert("Please select both start and end dates.");
      return;
    }
    try {
      const { data } = await fetchTotalExpenses(dateRange.start, dateRange.end);
      setTotal(data.totalAmount);
    } catch (error) {
      console.error("Get Total Error:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container>
        <Box mt={4} mb={2}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Add New Expense
            </Typography>
            <ExpenseForm onAddExpense={handleAddExpense} />
          </Paper>
        </Box>

        <Box mt={4} mb={2}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Filter Expenses
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Category"
                  name="category"
                  variant="outlined"
                  value={filters.category}
                  onChange={handleFilterChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  type="date"
                  label="Date"
                  name="date"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  value={filters.date}
                  onChange={handleFilterChange}
                />
              </Grid>
            </Grid>
            <Box mt={2}>
              <ExpenseList expenses={expenses} />
            </Box>
          </Paper>
        </Box>

        <Box mt={4} mb={2}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Total Expenses by Date Range
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  type="date"
                  label="Start Date"
                  name="start"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  value={dateRange.start}
                  onChange={handleDateRangeChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  type="date"
                  label="End Date"
                  name="end"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  value={dateRange.end}
                  onChange={handleDateRangeChange}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleGetTotal}
                >
                  Get Total
                </Button>
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <Typography variant="body1">
                  {total ? `Total: $${total}` : ""}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
