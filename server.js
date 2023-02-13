const express = require("express")
const multer = require("multer")
const path = require("path")

const app = express()

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads")
    },
    filename: (req, file, cb) => {
      console.log(file);
      cb(null, file.originalname)
    }
  })
}).array("files", 10)

app.post("/upload", upload, (req, res) => {
  res.send("File Uploaded")
})

app.get("/download/:filename",(req,res)=>{
  filename = req.params.filename
  // console.log(filename);
  res.download(__dirname+`/uploads/${filename}`)
})


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
})
