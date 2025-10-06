const path = require('path');
const express = require('express');
const app = express();

app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')));

const userRouter = require('./routes/users'); 
app.use('/api/v1/user', userRouter);

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/ping', (req, res) => {
  res.type('text/plain').send('pong');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).type('text/plain').send('Server Error');
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Web Server is listening at port ${PORT}`);
});
