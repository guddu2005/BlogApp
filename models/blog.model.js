const mongoose = require("mongoose");


const blogSchema = new mongoose.Schema({
    title:{
        type:String ,
        require:true,
    },
    body:{
        type:String ,
        require:true,
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Author',
    }
});

const Blog = mongoose.model('Blog' , blogSchema);

module.exports={
    Blog,
}

/// to use passport js -->npm install passport passport-local express-session connect-flash