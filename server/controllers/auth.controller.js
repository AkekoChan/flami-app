const auth = {
  signup: async (req, res) => {
    try {
        const formdata = req.body;
        res.status(200).json(formdata);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
  },
  signin: async (req, res) => {
    const formdata = req.body;
    try {
        res.status(201).json(formdata);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
  },
};

export default auth;
