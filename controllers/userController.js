// const userManager = require("../models/ userManager");
// const argon2 = require("argon2");
// const jwt = require("jsonwebtoken");
// const getAllUsers = async (req, res) => {
//   try {
//     const [users] = await userManager.getAllUsers();
//     res.send(users);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

// const getUserByEmail = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       res.status(401).send("check your email and password");
//     } else {
//       const [user] = await userManager.getUserByEmail(email);
//       if (!user.length) {
//         res.status(404).send("Not found");
//       }
//       const isMatch = await argon2.verify(user[0].hashedPassword, password);
//       if (!isMatch) {
//         res.status(401).send("mot de pass ou email erronné");
//       } else {
//         const token = jwt.sign({ user_id: user[0].id }, "privateKey", {
//           expiresIn: "1h",
//         });

//         res
//           .status(200)
//           .json({ message: `welcome back ${user[0].firstname} !`, token });
//       }
//     }
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };
// module.exports = { getAllUsers };
