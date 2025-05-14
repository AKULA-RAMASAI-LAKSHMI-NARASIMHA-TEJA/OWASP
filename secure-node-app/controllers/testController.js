exports.testGet = (req, res) => {
  res.send("GET request successful!");
};

exports.testPost = (req, res) => {
  const { input } = req.body;
  res.send({ sanitizedInput: input });
};