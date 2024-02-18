// const sessionId = new Map(); //for cookies
// exports.setUser = async (id, user) => {
//   sessionId.set(id, user);
// };
// exports.getUser = async (id) => {
//   sessionId.get(id);
// };
//for cookies

// for jwt token

const jwt = require("jsonwebtoken");
const secret = "5910msdhfgkj3164ajhdfilu10laiklujoarsrrtrrl30338";
exports.setUser = async (user) => {
  try {
    return jwt.sign(
      {
        _id: user._id,
        email: user.email,
      },
      secret
    );
  } catch (error) {
    return null;
  }
};
exports.getUser = async (token) => {
  if (!token) return null;
  return jwt.verify(token, secret);
};
