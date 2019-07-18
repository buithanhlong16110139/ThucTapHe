const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/JWT', {useNewUrlParser: true}, (err) => {
    if(!err){
        console.log("MongoDB connect successfull.");
    }
    else{
        console.log("Error in database connection: " + JSON.stringify(err, undefined, 2));
    }
});
module.exports = mongoose;