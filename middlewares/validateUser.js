const validateUser = (req, res, next) => {
  const { username, email, password, role } = req.body;
  const errors = [];
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (username == null) {
    errors.push({ field: "username", message: "This field is required" });
  } else if (username.length >= 50) {
    errors.push({
      field: "username",
      message: "Should contain less than 50 characters",
    });
  }
  if (!emailRegex.test(email)) {
    errors.push({ field: "email", message: "Invalid email" });
  } else if (email.length >= 50) {
    errors.push({
      field: "email",
      message: "Should contain less than 50 characters",
    });
  }
  if (!passwordRegex.test(password)) {
    errors.push({
      field: "password",
      message:
        "Password must contain at least one lowercase letter, one uppercase letter, one digit (0-9), one special character among @$!%*?& and one minimum length of 8 characters",
    });
  } else if (password.length >= 50 && password.length <= 8) {
    errors.push({
      field: "password",
      message: "Should contain more than 8 and less than 50 characters",
    });
  }
  if (role == null) {
    errors.push({ field: "role", message: "This field is required" });
  }
  if (errors.length) {
    res.status(422).json({ validationErrors: errors });
  } else {
    next();
  }
};

module.exports = validateUser;
