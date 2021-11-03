const UserService = require("../services/user.service");
const bcrypt = require("bcrypt");

module.exports = class User {
  static async onboard(req, res, next) {
    try {
      const hash = await bcrypt.hash(req.body.password, 10);
      if (!hash) {
        return res.status(500).json({ message: "Error in Hashing" });
      }
      const createuser = {
        email: req.body.email,
        name: req.body.name,
        userName: req.body.userName,
        password: hash,
      };
      const findUser = await UserService.getUser({ email: req.body.email });
      if (findUser) {
        return res
          .status(409)
          .json({ error: `${createuser.email} Already exist`, success: false });
      }
      const user = await UserService.create(createuser);
      return res.status(200).json({
        message: "USER_ONBOARDED",
        user
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async login(req, res, next) {
    try {
      const findUser = await UserService.getUser({
        email: req.body.email,
      });
      if (findUser) {
        if (bcrypt.compareSync(req.body.password, findUser.password)) {
          res.json({
            status: "success",
            message: "user found!!!",
            data: { user: findUser },
          });
        } else {
          res.json({
            status: "error",
            message: "Invalid password!!!",
            data: null,
          });
        }
      } else {
        res.json({ status: "error", message: "user not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async currentUser(req, res, next) {
    try {
      const findUser = await UserService.getUser({ _id: req.params.id });
      if (findUser) {
        res.json({
          status: "success",
          message: "user found!!!",
          user: findUser,
        });
      } else {
        res.json({ status: "error", message: "user not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  static async updateUser(req, res, next) {
    try {
      const findUser = await UserService.getUser({ _id: req.params.id });
      if (findUser) {
        const updateuser = {
          name: req.body.name,
          userName: req.body.userName,
        };
        UserService.update({ _id: req.params.id }, updateuser)
          .then((data) => {
            res.json({
              status: "success",
              message: "user updated",
              data,
            });
          })
          .catch((error) => {
            res.status(500).json({ error: "error in updating user" });
          });
      } else {
        res.json({ status: "error", message: "user not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const findUser = await UserService.getUser({ _id: req.params.id });
      if (findUser) {
        UserService.delete({ _id: req.params.id }, findUser)
          .then((data) => {
            res.json({
              status: "success",
              message: "user deleted",
              data,
            });
          })
          .catch((error) => {
            res.status(500).json({ error: "error in updating user" });
          });
      } else {
        res.json({ status: "error", message: "user not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
};
