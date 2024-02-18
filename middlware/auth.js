const auth = require("../service/auth");

exports.restictToLoginUserOnly = async (req, res, next) => {
  // console.log(req);
  const userId = req.cookies.uid;
  if (!userId) {
    return res.send({ message: "Login required" });
  }
  const user = auth.getUser(userId);

  if (!user) {
    return res.send({ message: "Login required" });
  }
  req.user = user;
  next();
};
