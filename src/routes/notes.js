const router = require('express').Router();

const Note = require('../models/Note');
const { isAuthenticated } = require('../helpers/auth')

router.get('/notes/add', isAuthenticated, (req, res) => {
    res.render('notes/add');
});

router.post('/notes/add', isAuthenticated, async(req, res) => {
    const { tittle, content } = req.body;
    const errors = [];
    if (!tittle) {
        errors.push({ text: 'Please write a tittle' });
    }
    if (!content) {
        errors.push({ text: 'Please write a content' });
    }
    if (errors.length > 0) {
        res.render('notes/add', {
            errors,
            tittle,
            content
        });
    } else {
        const newNote = new Note({ tittle, content, user: req.user.id });
        await newNote.save();
        req.flash('success_msg', 'Note added successfully');
        res.redirect('/notes');

    }
});

router.get('/notes', isAuthenticated, async(req, res) => {
    const notes = await Note.find({ user: req.user.id }).sort({ date: 'desc' }).lean();
    res.render('notes/all-notes.hbs', { notes });
});

router.get('/notes/edit/:id', isAuthenticated, async(req, res) => {
    Note.findById(req.params.id, (err, note) => {
        if (err) {
            console.log(err);
        } else {
            res.render('notes/edit-note', { note });
        }
    }).lean();
});

router.put('/notes/edit-note/:id', isAuthenticated, async(req, res) => {
    const { tittle, content } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { tittle, content });
    req.flash('success_msg', 'Note edited successfully');
    res.redirect('/notes');
});

router.delete('/notes/delete/:id', isAuthenticated, async(req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', "Note deleted successfully");
    res.redirect('/notes');
});


module.exports = router;