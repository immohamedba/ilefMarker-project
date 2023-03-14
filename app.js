const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
//const {sendEmail} = require('./controllers/mailService/mailSender')
const mailRoutes = require('./routes/sendMail')
const authRoutes = require('./routes/Auth')
require('dotenv').config()

const bodyParser = require('body-parser');
//const nodemailer = require('nodemailer');
const cors = require('cors');
// express app
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use(express.static('./'));
app.use("/auth", express.static('./'));

//const dbURI = 'mongodb+srv://MedBah:Med10050331@quizplatform.wydon8i.mongodb.net/eduChamp?retryWrites=true&w=majority';
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(process.env.PORT))
  .catch(err => console.log(err));

//app.use(express.static('admin'));

app.get('/', (req, res) => {
  res.redirect('/index-1.html');
});

app.get('/index-2.html', (req, res) => {
  res.sendFile('./index-2.html', { root: __dirname });

});
app.get('/index-1.html', (req, res) => {
  res.sendFile('./index-1.html', { root: __dirname });
});

app.get('/register', (req, res) => {
  res.sendFile('./register.html', { root: __dirname });
});

/*app.get('/add-user', (req, res) => {
  const user = new User({
    name: 'Mohamed',
    email: 'mohamed.abdoulah.ba@gmail.com',
    password: '1005033Med'
  })
  user.save()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});
*/
//app.use('/auth', express.static('admin'));
app.use('/auth', authRoutes);

//---------------------------------------------------
//                 E-mail
//----------------------------------------------------

app.use('/sendemail', mailRoutes);

// 404 page/

app.use((req, res) => {
  res.sendFile('./error-404.html', { root: __dirname });
});
