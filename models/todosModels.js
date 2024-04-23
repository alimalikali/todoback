
const mongoose = require("mongoose");


const todosSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique:true
    },
   
    user_id:{
        type:String,
        required:true
    }
},{
    timestamps:true
})


const Todo  = new mongoose.model("Todo",todosSchema);

module.exports = Todo;