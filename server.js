const express =require("express")
const app =express()
const port =process.env.port||8000
app.use(express.json())
const Author =require("./model/authorschema")
const mongoose=require("mongoose")
mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => console.log('Connected!'));
// const Authorlist=[{ id:1,authorname:"kelly morgan",title:'Abusive Wife'}]
app.get("/api/course",async(req,res)=>{
    const findauthor = await Author.find()
    res.send(findauthor)
})
app.post("/api/course",async(req,res,next)=>{
    
    try {
        const{name,title} =req.body
        const auth =new Author({name,title})
        await auth.save()
        res.send(auth)
    } catch (error) {
        next(error)
    }
   
   
 
  
 
    
})
app.get("/api/course/:id",(req,res)=>{

    const{id}=req.params
    const findid = Authorlist.find(c=>c.id ===parseInt(id))
    if(!findid) res.status(404).send("The author with the given  Id  is not found")
    
    res.send(findid)
})
app.use((req,res,next)=>{
      
        res.status(501).send("oh boy something went wrong")
})
app.listen(port,()=>{
    console.log(`App listening on port ${port}`)
})