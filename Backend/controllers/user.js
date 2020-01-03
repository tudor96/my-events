
const {
  User
} = require('../models')
const Sequelize = require('sequelize')
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email: email
    },
    attributes: [
      "id",
      "firstName",
      "lastName",
      "email",
      "password"
    ]

  })
  let flag = false;
  console.log("USER", user);
  if (user !== null) {
    flag = await bcrypt.compare(password, user.password);
  }

  if (flag) {
    res.status(200).send({ id: user.id });
  } else {
    res.status(400).send("failed login");
  }
}

const findUser = async (req, res) => {
  User.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      "fistName",
    ]
  }).then(user => {
    res.status(200).send(user);
  });

}



const reg = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
    } = req.body;
    const salt = await bcrypt.genSalt(10);
    const cyptPass = await bcrypt.hash(password, salt);
    console.log(cyptPass)
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      "password": cyptPass,
    });
    res.status(200).send("registered successfully");

  } catch (err) {
    res.status(400).json({
      error: err
    });
  }
}



module.exports = {
  '/login': {

    post: {
      action: login,
      level: 'public'
    }
  },
  '/register': {
    post: {
      action: reg,
      level: 'public'
    },
  },
  '/profile/:id': {
    get: {
      action: findUser,
      level: 'public'
    }
  }
}
