const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const userFile = path.join(__dirname, '..', 'user.json');

router.get('/ping', (req, res) => {
  res.type('text/plain').send('pong');
});

router.get('/profile', (req, res, next) => {
  fs.readFile(userFile, 'utf8', (err, data) => {
    if (err) return next(err);
    try {
      const user = JSON.parse(data);
      res.json(user);
    } catch (e) {
      next(e);
    }
  });
});

router.post('/login', (req, res, next) => {
  const { username, password } = req.body || {};
  fs.readFile(userFile, 'utf8', (err, data) => {
    if (err) return next(err);

    let user;
    try {
      user = JSON.parse(data);
    } catch (e) {
      return next(e);
    }

    if (username !== user.username) {
      return res.json({ status: false, message: 'User Name is invalid' });
    }
    if (password !== user.password) {
      return res.json({ status: false, message: 'Password is invalid' });
    }

    return res.json({ status: true, message: 'User Is valid' });
  });
});

router.get('/logout/:username', (req, res) => {
  const { username } = req.params;
  res.type('html').send(`<b>${username} successfully logged out.</b>`);
});

module.exports = router;
