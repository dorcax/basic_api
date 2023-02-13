const { Schema } = require("mongoose")
const mongoose =require("mongoose")
const{schema}=mongoose
const bookSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    genre:{
        type:String,
        required:true
    },
    book_description:{
        type:String,
        required:true
    },
    authors:{
        type:Schema.Types.ObjectId,
        ref:"Author"
    }
})
module.exports =mongoose.model("Book",bookSchema)