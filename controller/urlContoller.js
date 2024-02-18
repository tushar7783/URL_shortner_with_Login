const URLModel = require("../model/urlModel");
const shortid = require("shortid");
exports.generateNewShortURL = async (req, res) => {
  try {
    const redirectURL = req.body.url;
    if (!redirectURL) {
      res.status(400).json({ error: `Please provide the URL` });
    }
    const shortId = shortid();
    await URLModel.create({
      shortId: shortId,
      redirectURL: redirectURL,
      createdBy: req.user._id, //user is used from req.user used in the auth (middleware)
      visitHistory: [],
    });
    return res.status(200).json({ id: shortId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Internal Server error` });
  }
};

exports.redirectURL = async (req, res) => {
  try {
    const shortId = req.params.id;
    const entry = await URLModel.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );
    console.log(entry);
    res.redirect(entry.redirectURL);
    // res.status(200).json({
    //   message: "Here is the redirecting page url ",
    //   rediredtedURL: entry.redirectURL,
    //   success: true,
    // });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Internal Server error` });
  }
};

exports.checkingTheURLHit = async (req, res) => {
  try {
    const shortId = req.params.id;
    const result = await URLModel.findOne({ shortId: shortId });
    res.status(200).json({
      message: "The number of times hit on the shortID",
      result: [result.visitHistory],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Internal Server error` });
  }
};
exports.renderingHTML = async (req, res) => {
  const allURL = await URLModel.find({});
  return res.render("home", { url: allURL });
};
