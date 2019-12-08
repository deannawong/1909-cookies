const express = require("express");
const chalk = require("chalk");
const path = require("path");
const moment = require("moment");
const cookieParser = require("cookie-parser");
const { db, models } = require("./db/index.js");
const { User } = models;

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use((req, res, next) => {
  console.log(chalk.cyan(`${req.method} ${req.path}`));
  next();
});
app.use((req, res, next) => {
  if (req.cookies.userId) {
    User.findByPk(req.cookies.userId)
      .then(userOrNull => {
        if (userOrNull) {
          req.loggedIn = true;
          next();
        } else {
          next();
        }
      })
      .catch(e => {
        console.log(e);
        next();
      });
  } else {
    next();
  }
});

app.use(express.static(path.join(__dirname, "../dist")));

app.post("/user", (req, res, next) => {
  User.create(req.body).then(() => res.status(201).send("user created!"));
});

app.get("/whoami", (req, res, next) => {
  if (req.loggedIn) {
    res.send(req.user);
  } else {
    res.status(401);
  }
});
app.post("/login", (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({ where: { username, password } })
    .then(userOrNull => {
      if (userOrNull) {
        res.cookie("userId", userOrNull.id, {
          path: "/"
        });
        return res.status(202).send("login success");
      } else {
        res.status(401).send("No user found");
      }
    })
    .catch(e => {
      console.log(e);
      next();
    });
});

db.sync({ force: true })
  .then(() => {
    User.create({ username: "fullstackadmin", password: "password" });
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        chalk.greenBright(`Server is listening on http://localhost:${PORT}`)
      );
    });
  })
  .catch(e => {
    console.error(e);
  });
