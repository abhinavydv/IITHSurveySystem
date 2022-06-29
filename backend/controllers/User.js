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
        (((date.getHours() + 5) % 24) + (date.getMinutes() + 30 > 60)) +
        ":" +
        ((date.getMinutes() + 30) % 60) +
        ":" +
        date.getSeconds(),
      Password: req.body.passwd,
    });
    req.session.user = {
      UID: uid,
      Name: req.body.name,
    };

    res.json({
      message: "User Created",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await User.findAll({
      where: {
        UID: req.body.uid,
        Password: req.body.passwd,
      },
    });
    // console.log(user);
    if (user[0]) {
      req.session.user = {
        UID: user[0].UID,
        Name: user[0].Name,
      };
      // console.log(req.session.user);
      res.json({ loggedIn: true, message: "Successfully logged in..." });
    } else {
      res.json({ loggedIn: false, message: "User does not exist!" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getLoggedInUser = async (req, res) => {
  try {
    // console.log(req.session.user);
    if (req.session.user) {
      res.json({ loggedIn: true, user: req.session.user });
    } else {
      res.json({ loggedIn: false });
    }
  } catch (error) {
    res.json({ message: error });
  }
};

export const logoutUser = async (req, res) => {
  req.session.user = undefined;
  res.json({ loggedIn: false });
};
