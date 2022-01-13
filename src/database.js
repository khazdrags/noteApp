const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:admin@cluster0.fbwee.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(db => console.log('DB is connected')).catch(err => console.log(err));