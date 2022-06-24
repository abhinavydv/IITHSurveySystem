import User from "../models/userModel.js";

export const getUserByUID = async (req, res) => {
  try {
    const user = await User.findAll({
      where: {
        UID: req.params.uid,
      },
    });

    res.json(user[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const newUser = async (req, res) => {
  try {
    const date = new Date();
    const uid = req.body.uid;
    await User.create({
      UID: uid,
      Name: req.body.name,
      CreatedAt:
        date.getFullYear() +
        "-" +
        date.getMonth() +
        "-" +
        date.getDate() +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds(),
      Password: req.body.passwd,
    });

    res.json({
      message: "User Created",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = User.findAll({
      where: {
        UID: req.body.uid,
        Password: req.body.passwd,
      },
    });
    if (user) {
      res.json({ message: "YES" });
    } else {
      res.json({ message: "NO" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};
