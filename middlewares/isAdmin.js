const userManager = require("../models/userManager");

const isAdmin = async (req, res, next) => {
  try {
    const id = req.payload;
    const [user] = await userManager.getUserById(id);
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(401).json({ message: "Accès non autorisé" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = isAdmin;
