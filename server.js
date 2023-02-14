const express = require("express")
const fileupload =require("express-fileupload")
const fs = require("fs")

const app = express()
app.use(express.json())
app.use(fileupload())

const docs = []
app.post("/upload",(req,res)=>{
  // console.log(req.files);
  Object.keys(req.files).map(key=>{
    if(
      req.files[key].mimetype == "image/png" ||
      req.files[key].mimetype == "image/jpg" ||
      req.files[key].mimetype == "image/jpeg" ||
      req.files[key].mimetype == "application/pdf"
      ){


      fs.writeFile(`${__dirname}/uploads/${key}-${req.files[key].name}`,req.files[key].data,()=>{
        docs.push({key:req.files[key].name})
        console.log(docs);
        res.end("File uploaded")
      })
    }
  })
})

app.get("/download/:filename",(req,res)=>{
  filename = req.params.filename
  // console.log(filename);
  res.download(__dirname+`/uploads/${filename}`)
})

app.listen(3000,()=>{
  console.log("server is running at 3000");
})