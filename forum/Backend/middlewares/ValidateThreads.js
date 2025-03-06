const validateThreadData = (req, res, next) => {
  const { title, content, author, date } = req.body;

  if (!title || !content || !author || !date) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Om valideringen går igenom, fortsätt till nästa middleware eller controller
  next();
};

export default validateThreadData;
