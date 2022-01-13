const router = require('express').Router();
const passport = require('passport');
const User = require('../models/User');

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    failureFlash: true

}))

router.get('/users/signup', (req, res) => {
    res.render('users/signup')
});

router.post('/users/signup', async(req, res) => {
    const { name, email, password, confirm_password } = req.body;
    const errors = [];
    if (!name) {
        errors.push({ text: 'Please write a name' });
    }
    if (!email) {
        errors.push({ text: 'Please write an email' });
    }
    if (!password) {
        errors.push({ text: 'Please write a password' });
    }
    if (password != confirm_password) {
        errors.push({ text: 'Passwords do not match' });
    }
    if (password != confirm_password) {
        errors.push({ text: 'Passwords do not match' });
    }
    if (password.length < 5) {
        errors.push({ text: 'Password must be at least 5 characters' });
    }
    if (errors.length > 0) {
        res.render('users/signup', { errors, name, email, password, confirm_password });
    } else {
        const emailUser = await User.findOne({ email: email });
        if (emailUser) {
            errors.push({ text: 'The email is already in use' });
            res.render('users/signup', { errors, name, email, password, confirm_password });
        }
        const newUser = new User({ name, email, password });
        newUser.password = await newUser.encryptPassword(password);
        console.log(newUser.password);
        await newUser.save();
        req.flash('success_msg', 'User registered successfully');
        res.redirect('/users/signin');
    }
});

router.get('/users/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/signin');
});

module.exports = router;