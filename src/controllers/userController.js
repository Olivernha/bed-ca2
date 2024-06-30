const model = require("../models/userModel.js");
const uuid = require("uuid");
module.exports.readAllUsers = (req, res, next) => {
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readAllUser:", error);
      res.status(500).json(error);
    } else res.status(200).json(results);
  };

  model.selectAll(callback);
};
module.exports.readUserById = (req, res, next) => {
  const data = {
    user_id: req.params.user_id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readUserById:", error);
      res.status(500).json(error);
    } else {
      if (results.length == 0) {
        res.status(404).json({
          message: "User not found",
        });
      } else res.status(200).json(results[0]);
    }
  };

  model.selectById(data, callback);
};
module.exports.createNewUser = (req, res, next) => {
  if (req.body.username == undefined) {
    res.status(400).send("Error: username is undefined");
    return;
  }
  if (req.body.email == undefined) {
    res.status(400).send("Error: email is undefined");
    return;
  }
  if (req.body.password == undefined) {
    res.status(400).send("Error: password is undefined");
    return;
  }

  const data = {
    user_id: uuid.v4(),
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error createNewUser:", error);
      res.status(500).json(error);
    } else {
      res.status(201).json(results);
    }
  };

  model.insertSingle(data, callback);
};
module.exports.updateUserById = (req, res, next) => {
  if (
    req.body.username == undefined ||
    req.body.email == undefined ||
    req.body.password == undefined
  ) {
    res.status(400).json({
      message: "Error: username or email or password is undefined",
    });
    return;
  }

  const data = {
    user_id: req.params.user_id,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error updateUserById:", error);
      res.status(500).json(error);
    } else {
      if (results.affectedRows == 0) {
        res.status(404).json({
          message: "User not found",
        });
      } else res.status(204).send(); // 204 No Content
    }
  };

  model.updateById(data, callback);
};
module.exports.deleteUserById = (req, res, next) => {
  const data = {
    user_id: req.params.user_id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error deleteUserById:", error);
      res.status(500).json(error);
    } else {
      if (results.affectedRows == 0) {
        res.status(404).json({
          message: "User not found",
        });
      } else res.status(204).send(); // 204 No Content
    }
  };

  model.deleteById(data, callback);
};
module.exports.checkUsernameOrEmailExist = (req, res, next) => {
  const { username, email } = req.body;

  if (!username || !email) {
    res.status(400).json({
      message: "Error: username or emails is undefined",
    });
    return;
  }
  const data = {
    username: username,
    email: email,
  };
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error checkUsernameOrEmailExist:", error);
      res.status(500).json(error);
    } else {
      if (results.length > 0) {
        res.status(409).json({
          message: "Username or email already exist",
        });
      } else next();
    }
  };

  model.selectByUsernameOrEmail(data, callback);
};

module.exports.register = (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password ) {
    res.status(400).json({
      message: "Error: username or email or password is undefined",
    });
    return;
  }
  //make password length > 6
    if (password.length < 8) {
      res.status(400).json({
        message: "Error: password length must be greater than 6",
      });
      return;
    }

  const data = {
    user_id: uuid.v4(),
    username: username,
    email: email,
    password: res.locals.hash,
    points: 0,
  };
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error register:", error);
      res.status(500).json(error);
    } else {
      console.log(results);
      res.locals.user_id = data.user_id;
      next();
    }
  };

  model.insertSingle(data, callback);
};

module.exports.login = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({
      message: "Error: username OR password is undefined",
    });
    return;
  }
  const data = {
    username: username,
    password: password,
  };
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error login:", error);
      res.status(500).json(error);
    } else {
      if (results.length == 0) {
        res.status(404).json({
          message: "User not found",
        });
      } else {
        console.log(results);
        res.locals.hash = results[0].password;
        res.locals.user_id = results[0].user_id;
        next();
      }
    }
  };

  model.selectByUsername(data, callback);
};
module.exports.createJoinedQuestByUserId = (req, res, next) => {
  const data = {
    user_id: req.params.user_id,
    quest_id: req.params.quest_id,
  };
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error createJoinedQuestByUserId:", error);
      res.status(500).json(error);
    } else {
      console.log(results);
      res.status(201).json(results);
    }
  };
  model.createJoinedQuestByUserId(data, callback);
};
// module.exports.readUserQuestsByUserId = (req, res, next) => {
//   const data = {
//     user_id: req.params.user_id,
//   };
//   const callback = (error, results, fields) => {
//     if (error) {
//       console.error("Error readUserQuestsByUserId:", error);
//       res.status(500).json(error);
//     } else {
//       res.status(200).json(results);
//     }
//   };
//   model.readUserQuestsByUserId(data, callback);
// };
module.exports.addPointsToUser = (req, res, next) => {
  const data = {
    user_id: res.locals.data.user_id,
    points: req.body.points,
  };
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error addPointsToUser:", error);
      res.status(500).json(error);
    } else {
      res.status(200).json(res.locals.data);
    }
  };
  model.addPointsToUser(data, callback);
};
