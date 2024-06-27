const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  register: async (req, res) => {
    try {
      if (
        !req.body.firstName ||
        !req.body.lastName ||
        !req.body.email ||
        !req.body.dob ||
        !req.body.password
      ) {
        return res.status(400).json({
          message: "required_fields_are_missing",
        });
      }

      const exists = await userModel.findOne({
        email: req.body.email,
      });

      if (exists) {
        return res.status(409).json({
          message: "email_already_exists",
        });
      }

      const hashPass = bcrypt.hashSync(req.body.password, 10);

      const savedUser = await new userModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        dob: req.body.dob,
        role: "user",
        password: hashPass,
      }).save();

      const token = jwt.sign(
        {
          id: savedUser._id,
          firstName: savedUser.firstName,
          lastName: savedUser.lastName,
          email: savedUser.email,
          dob: savedUser.dob,
          role: savedUser.role,
        },
        process.env.SECRET_KEY
      );

      res.json({ token });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  login: async (req, res) => {
    try {
      const user = await userModel.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({
          message: "user_not_found",
        });
      }

      if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign(
          {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            dob: user.dob,
            role: user.role,
          },
          process.env.SECRET_KEY
        );

        res.json({ token });
      } else {
        return res.status(404).json({
          message: "user_not_found",
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
