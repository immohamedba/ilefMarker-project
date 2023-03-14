const express = require('express');
const User = require('../../models/user');
const path = require('path')


//const app = express();

//app.use(express.static(__dirname +'../../admin'));
/*const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
  }*/
const login = async (req, res) => {
    // console.log(__dirname);
    /* User.findOne({ email: req.body.email })
         .then(result => {
             if (req.body.password === result.password) {
                 const filePath = path.join(__dirname, '../../admin/test.html');
                 res.sendFile(filePath);
             } else {
                 console.log(false);
                 // res.send('404 not found');
                 const filePath = path.join(__dirname, '../../admin/test.html');
                 res.sendFile(filePath);
                 res.sendFile('./error-404.html', { root: __dirname });
             }
         })
         .catch(err => {
             console.log(err);
             res.sendFile('./error-404.html', { root: __dirname });
         });*/
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)
        // create a token
        //  const token = createToken(user._id)
        const filePath = path.join(__dirname, '../../admin/test.html');
        res.status(200).sendFile(filePath);
        // res.status(200).json({ email, token })
    } catch (error) {
        console.log(error);
        res.status(400).sendFile('./error-404.html', { root: __dirname });
        //  res.status(400).json({ error: error.message })
    }
}

const register = async (req, res) => {
  //  console.log('Register');
    const { name, email, password } = new User(req.body);

    try {
        const user = await User.signup(name, email, password);

        const filePath = path.join(__dirname, '../../login.html');
        res.status(200).sendFile(filePath);
    } catch (error) {

        res.status(400).json({ error: error.message })
        //   res.status(400).sendFile('./error-404.html', { root: __dirname });
    }
}


module.exports = {
    register,
    login
}