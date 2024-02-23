const argon2 = require("argon2");

const hashPassword = (req, res, next) => {
  const { password } = req.body;
  const hashingOptions = {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 5,
    parallelism: 1,
  };
  argon2
    .hash(password, hashingOptions)
    .then((hashedPassword) => {
      console.log("hashedPassword :>> ", hashedPassword);
      delete password;
      req.body.hash_password = hashedPassword;
      next();
    })
    .catch((err) => {
      res.status(401).send(err);
    });
};
module.exports = hashPassword;