const adminManager = require("../models/adminManager");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");


const getAllAdmins = async (req, res) => {
 try {
    const [admins] = await adminManager.getAllAdmins();
    res.send(admins);
  } catch (error) {
    res.status(500).send(error);
  } };

const addNewAdmin = async (req, res) => {
    try {
      const admin = req.body;
      const [result] = await adminManager.queryAddNewAdmin(admin);
      if (result.affectedRows) {
        res.send(`Admin created with id : ${result.insertId}`);
      } else {
        res.status(401).send("Unauthorized access");
      }
    } catch (error) {
      res.status(500).send(error);
    }
  };

const getAdminByEmail = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(401).send("check your email and password");
    } else {
      const [admin] = await adminManager.getAdminByEmail(email);
      if (!admin.length) {
        res.status(404).send("Not found");
      }
      
      const isMatch = await argon2.verify(admin[0].hash_password, password);
      if (typeof isMatch === "boolean" && isMatch) {
          const token = jwt.sign(
            { payload: admin[0].id },
            process.env.SECRET_KEY_JWT,
            {
              expiresIn: "2h",
            }
          );

        res
          .status(200)
          .json({ message: `welcome back ${admin[0].username} !`, token });
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAdminById = async (req, res) => {
  try {
    const id  = req.payload;
    const [admin] = await adminManager.getAdminById(id);
    if (admin.length) {
      res.status(200).json({ message: "Logged in", admin: admin[0] });
    } else {
      res.status(401).send("Please check your informations");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { getAllAdmins, addNewAdmin, getAdminByEmail, getAdminById };
