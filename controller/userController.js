const UserModel = require("../model/userModel");
// const { v4: uuidv4 } = require("uuid");
const auth = require("../service/auth");

const { v4: uuidv4 } = require("uuid");
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await UserModel.create({
      Name: name,
      email: email,
      password: password,
    });
    // console.log(result);
    if (result) {
      res.status(201).json({
        message: "user added sucessfully",
        sucess: true,
        User: result,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Internal Server error` });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await UserModel.findOne({
      email: email,
      password: password,
    });
    if (!result) {
      res.status(400).json({
        message: "invalid username and password",
      });
    }

    // const sessionId = uuidv4();//for cookies

    // res.cookie("uid", sessionId);
    // res.status(200).json({ mesage: `user login` });

    const token = await auth.setUser(result);
    // console.log(token);
    // res.cookie("uid", token); //used to show data ie tokrn in cookies
    res.status(200).json({ mesage: `user login`, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Internal Server error` });
  }
};
