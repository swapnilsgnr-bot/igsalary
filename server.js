const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let users = [];

// signup
app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  users.push({ username, password, balance: 0 });
  res.send("Signup successful");
});

// login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) res.json(user);
  else res.send("Invalid login");
});

// add balance (admin)
app.post("/add-balance", (req, res) => {
  const { username, amount } = req.body;
  let user = users.find(u => u.username === username);
  if (user) user.balance += amount;
  res.send("Balance updated");
});

// auto daily growth
setInterval(() => {
  users.forEach(user => {
    user.balance += user.balance * 0.01;
  });
}, 86400000);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
