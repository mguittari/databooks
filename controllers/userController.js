const userManager = require("../models/userManager");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");


const getAllUsers = async (req, res) => {
 try {
    const [users] = await userManager.getAllUsers();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  } };

const addNewUser = async (req, res) => {
    try {
      const user = req.body;
      const [result] = await userManager.queryAddNewUser(user);
      if (result.affectedRows) {
        res.send(`User created with id : ${result.insertId}`);
      } else {
        res.status(401).send("Unauthorized access");
      }
    } catch (error) {
      res.status(500).send(error);
    }
  };

const getUserByEmail = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(401).send("Check your email and password");
    } else {
      const [user] = await userManager.getUserByEmail(email);
      if (!user.length) {
        res.status(404).send("Not found");
      }
      
      const isMatch = await argon2.verify(user[0].hash_password, password);
      if (typeof isMatch === "boolean" && isMatch) {
          const token = jwt.sign(
            { payload: user[0].id },
            process.env.SECRET_KEY_JWT,
            {
              expiresIn: "2h",
            }
          );

        res
          .status(200)
          .json({ message: `Welcome back ${user[0].username} !`, token });
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const id  = req.payload;
    const [user] = await userManager.getUserById(id);
    if (user.length) {
      res.status(200).json({ message: "Logged in", user: user[0] });
    } else {
      res.status(401).send("Please check your informations");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { getAllUsers, addNewUser, getUserByEmail, getUserById };
