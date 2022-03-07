const express = require('express')
const multer = require('multer')
const path = require('path')

const app = express()

app.set('port', process.env.PORT || 3000)

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./images")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname)
    }
})

const upload = multer({storage: fileStorageEngine})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
})

app.post("/single", upload.single('image'), (req, res) => {
    console.log(req.file)
    res.send('Single file upload success')
})

app.post("/multiple", upload.array('images', 3), (req, res) => {
    console.log(req.files)
    res.send('Multiple files upload success')
})

app.listen(app.get('port'))