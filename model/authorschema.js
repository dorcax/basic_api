const mongoose =require("mongoose")
const {Schema}=mongoose
const AuthorSchema =new Schema({
     name:{
        type:String,
        required:true
     },
      description_of_author:{
        type:String,
        required:true
     },
     books:[{
      type:Schema.Types.ObjectId,
      ref:"Book"
     }]
})

module.exports =new mongoose.model("Author",AuthorSchema)
