const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");

/**
 * @desc    Add a new expense
 * @route   POST /expenses
 */
router.post("/", async (req, res) => {
  try {
    const { amount, category, date, description } = req.body;
    const newExpense = new Expense({ amount, category, date, description });
    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @desc    Retrieve expenses (optionally filtered by category/date)
 * @route   GET /expenses?category=xxx&date=YYYY-MM-DD
 */
router.get("/", async (req, res) => {
  try {
    const { category, date } = req.query;
    const query = {};

    if (category) {
      query.category = category;
    }
    if (date) {
      const dateObj = new Date(date);
      const nextDay = new Date(dateObj);
      nextDay.setDate(nextDay.getDate() + 1);

      query.date = {
        $gte: dateObj,
        $lt: nextDay,
      };
    }

    const expenses = await Expense.find(query).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @desc    Get total expenses for a date range
 * @route   GET /expenses/total?start=YYYY-MM-DD&end=YYYY-MM-DD
 */
router.get("/total", async (req, res) => {
  try {
    const { start, end } = req.query;
    if (!start || !end) {
      return res
        .status(400)
        .json({ error: "Please provide both start and end dates." });
    }

    const startDate = new Date(start);
    const endDate = new Date(end);
    // Include the entire end date
    endDate.setDate(endDate.getDate() + 1);

    const total = await Expense.aggregate([
      {
        $match: {
          date: {
            $gte: startDate,
            $lt: endDate,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    const totalAmount = total.length > 0 ? total[0].totalAmount : 0;
    res.json({ totalAmount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
