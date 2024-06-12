const express = require("express");
const router = express.Router();

let users = [
  {
    firstName: "John",
    lastName: "wick",
    email: "johnwick@gamil.com",
    DOB: "22-01-1990",
  },
  {
    firstName: "John",
    lastName: "smith",
    email: "johnsmith@gamil.com",
    DOB: "21-07-1983",
  },
  {
    firstName: "Joyal",
    lastName: "white",
    email: "joyalwhite@gamil.com",
    DOB: "21-03-1989",
  },
];

// GET request: Retrieve all users
router.get("/", (req, res) => {
  res.send(JSON.stringify({ users }, null, 4)); //This line is to be replaced with actual return value
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email", (req, res) => {
  const emailFilter = users.filter((user) => user.email === req.params.email);
  res.send(emailFilter); //This line is to be replaced with actual return value
});

// POST request: Create a new user
router.post("/", (req, res) => {
  users.push({
    firstName: req.query.firstName,
    lastName: req.query.lastName,
    email: req.query.email,
    DOB: req.query.DOB,
  });
  res.send(
    `New user ${req.query.firstName} ${req.query.lastName} has been added!`
  );
});

// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
  const email = req.params.email;
  let filteredUsers = users.filter((user) => user.email === email);
  if (filteredUsers.length > 0) {
    let filteredUser = filteredUsers[0];

    let DOB = req.query.DOB;
    let firstName = req.query.firstName;
    let lastName = req.query.lastName;

    if (DOB) {
      filteredUser.DOB = DOB;
    }

    if (firstName) {
      filteredUser.firstName = firstName;
    }

    if (lastName) {
      filteredUser.lastName = lastName;
    }

    users = users.filter((user) => user.email !== email);
    users.push(filteredUser);
    res.send(`User with email: ${email} updated.`);
  } else res.send("User not found!");
  //This line is to be replaced with actual return value
});

// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  const email = req.params.email;
  users = users.filter((user) => user.email !== email);
  res.send(`User with email: ${email} was deleted.`); //This line is to be replaced with actual return value
});

module.exports = router;
