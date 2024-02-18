const auth = require("../service/auth");

exports.checkForauthorization = async (req, res, next) => {
  // console.log(req);
  // const userId = req.cookies.uid;//for taking from cookies res.cookies
  const authorization = req.headers["authorization"];
  // console.log(req.headers);
  if (!authorization) {
    return res.send({ message: "Login required" });
  }
  const fullToken = authorization; //breaer 125463565320sdf3dfs453fsdf3df5sd3
  const splitToken = fullToken.split("Bearer "); //it will convert to array type as it will split the value from breaer
  const token = splitToken[1];

  const user = auth.getUser(token);

  if (!user) {
    return res.send({ message: "Login required" });
  }
  req.user = user;
  next();
};
