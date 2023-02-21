const express =require("express")
const app =express()
const port =process.env.port||8000
app.use(express.json())
const Author =require("./model/authorschema")
const Book=require("./model/bookschema")
const mongoose=require("mongoose")
const authorschema = require("./model/authorschema")
mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => console.log('Connected!'));
// const Authorlist=[{ id:1,authorname:"kelly morgan",title:'Abusive Wife'}]
// author route

app.get("/api/course",async(req,res)=>{
    const findauthor = await Author.find().populate("books","title")
    res.send(findauthor)
})
app.post("/api/course",async(req,res,next)=>{
    
    try {
        const{name,description_of_author} =req.body
        const auth =new Author({name,description_of_author})
        await auth.save()
        res.send(auth)
    } catch (error) {
        next(error)
    }
   
   
 
  
 
    
})
app.get("/api/course/:id",async(req,res)=>{

    const{id}=req.params
     const showauthor = await Author.findById(id).populate("books")
     res.send(showauthor)
})

// book route
app.post("/api/course/:id/books",async(req,res)=>{
     const{id}=req.params
     const newAuthor =await Author.findById(id)
     const {title,book_description,genre} =req.body
     const newbook =await new Book({title,book_description,genre})
     newauthor.books.push(newbook)
     newbook.newAuthor=authors
     await newauthor.save()
     await newbook.save()
    res.redirect("/api/course")
    })

app.put("api/course/:id",async (req,res)=>{
    const{id} =req.params
    const{title,genre,book_description} =req.body
    const newbook =await Author.findByIdAndUpdate({
        _id:new mongoose.Types.ObjectId(id),
        'books.title':title,
        

    
    },
    {
        $set:{'books.$.genre':genre,
              'books.$.book_description':book_description,
        

    },
    },{
        new:true
    }
    
    )
    res.send("its working")
     
    }

)

app.delete("/books/:bookid",async(req,res)=>{
    const{id,bookid} =req.params
    const deleteauthor =await Author.findByIdAndUpdate(id,{$pull:{books:bookid}})
    const deletebook =await Book.findByIdAndDelete(bookid)
    res.redirect(`/api/course/${id}`)
})
// app.delete("/api/course/:id",async(req,res)=>{
//     const{id} =req.params
//     const delete_authors = await Author.findByIdAndDelete(id)
//     res.send(`/api/course`)
// })


app.use((req,res,next)=>{
      
        res.status(501).send("oh boy something went wrong")
})
app.listen(port,()=>{
    console.log(`App listening on port ${port}`)
})