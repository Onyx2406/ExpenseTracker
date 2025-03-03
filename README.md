# Local Installation and Setup

## 1. **Clone the Repository**
If you're using Git and GitHub:

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```

Or simply download the ZIP from GitHub and unzip it, then open the folder in your terminal.

## 2. **Server Setup (Node + Express + MongoDB)**
Navigate to the server folder:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Configure MongoDB (if needed):
* By default, the code tries to connect to a local MongoDB at mongodb://127.0.0.1:27017/expense_tracker.
* If you're using a local MongoDB, ensure it's running on port 27017.
* If you prefer MongoDB Atlas or a custom connection, update the mongoose.connect(...) call in server/index.js with your own URI.

Run the server:

```bash
npm start
```

If successful, you'll see something like:

```
Server running on port 5000
MongoDB connected
```

The server is now live at http://localhost:5000.

## 3. **Client Setup (React)**
Open a new terminal (or split your existing one).
Go back to your project root (if needed), then navigate to client:

```bash
cd ../client
```

(Adjust the path if your folder structure differs.)

Install dependencies:

```bash
npm install
```

Run the React application:

```bash
npm start
```

This should open http://localhost:3000 in your browser. If it doesn't, simply go there manually.

## 4. **Usage**
**Add Expense:**
* Fill out Amount, Category, Date, and an optional Description.
* Click Add Expense.
* The new expense will appear in the table below or in the "Filter Expenses" section.

**View & Filter Expenses:**
* You can filter by Category (e.g., "Food") or by a specific Date in YYYY-MM-DD format.
* The expenses table will update accordingly.

**View Total by Date Range:**
* Pick a Start Date and End Date.
* Click Get Total.
* The total expense amount in that range is displayed next to the button.

## API Endpoints

**POST /expenses**
* **Body:** `{ "amount": Number, "category": String, "date": DateString, "description": String }`
* **Action:** Creates a new expense in the database.

**GET /expenses**
* **Query:**
   * `?category=<string>` (optional)
   * `?date=YYYY-MM-DD` (optional)
* **Action:** Returns all expenses, or filtered by category/date if query params are provided.

**GET /expenses/total**
* **Query:** `?start=YYYY-MM-DD&end=YYYY-MM-DD`
* **Action:** Returns the sum of amount for all expenses in the specified date range.