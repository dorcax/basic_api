const express =require("express")
const app =express()
const port =process.env.port||8000
app.use(express.json())
const Authorlist=[{ id:1,authorname:"kelly morgan",title:'Abusive Wife'}]
app.get("/api/course",(req,res)=>{
    res.send(Authorlist)
})
app.post("/api/course",(req,res)=>{
    if(!req.body.authorname && !req.body.title) res.status(404).send("please fill your details ")
    const author ={
        id:Authorlist.length +1,
        authorname:req.body.authorname,
        title:req.body.title
      
        
    }
   
    Authorlist.push(author)
    res.send(Authorlist)
 
    
})
app.get("/api/course/:id",(req,res)=>{

    const{id}=req.params
    const findid = Authorlist.find(c=>c.id ===parseInt(id))
    if(!findid) res.status(404).send("The author with the given  Id  is not found")
    
    res.send(findid)
})
app.listen(port,()=>{
    console.log(`App listening on port ${port}`)
})