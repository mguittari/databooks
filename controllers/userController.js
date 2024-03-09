const userManager = require("../models/userManager");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res) => {
  try {
    const [user] = req.user;
    console.info(user);
    if (user.role === "admin") {
      const [user] = await userManager.getAllUsers();
      res.send(user);
    } else {
      res.status(401).send("Accès non authorisé");
    }
  } catch (err) {
    next(err);
  }
};

const addNewUser = async (req, res) => {
  try {
    const [loggedInUser] = req.user;
    if (loggedInUser.role === "admin") {
      const newUser = req.body;
      const [result] = await userManager.queryAddNewUser(newUser);

      if (result.affectedRows) {
        res.send(`User created with id: ${result.insertId}`);
      } else {
        res.status(500).send("Error creating user");
      }
    } else {
      res.status(401).send("Unauthorized operation");
    }
  } catch (error) {
    next(error);
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(401).json({ message: "Remplir vos champs !" });
    } else {
      const [user] = await userManager.getUserByEmail(email);

      if (user.length) {
        // check password
        const isVerify = await argon2.verify(user[0].hash_password, password);

        if (typeof isVerify === "boolean" && isVerify) {
          const token = jwt.sign(
            { payload: user[0].id },
            process.env.SECRET_KEY_JWT,
            {
              expiresIn: "2h",
            }
          );

          res.status(200).send(token);
        } else {
          res.status(401).send("Email or password are wrong");
        }
      } else {
        res.status(401).send("Email doesn't exists");
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.payload;
    const [user] = await userManager.getUserById(id);
    if (user.length) {
      res
        .status(200)
        .json({ message: `Welcome back ${user[0].username} !`, user: user[0] });
    } else {
      res.status(401).send("Please check your informations");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const logout = async (req, res) => {
  try {
    const id = req.payload;
    const token = jwt.sign({ payload: id }, process.env.SECRET_KEY_JWT, {
      expiresIn: "0h",
    });
    res.status(200).send({ message: "vous avez été déconnecté", token });
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [loggedInUser] = req.user;

    if (loggedInUser.role === "admin") {
      const [result] = await userManager.queryDeleteUser(id);
      if (result.affectedRows) {
        res.send(`User deleted successfully`);
      } else {
        res.status(500).send("Error deleting user");
      }
    } else {
      res.status(401).send("Unauthorized operation");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  addNewUser,
  getUserByEmail,
  getUserById,
  logout,
  deleteUser,
};
