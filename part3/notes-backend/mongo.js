const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as argument!')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@fullstackopen.jjyauao.mongodb.net/noteApp?retryWrites=true&w=majority`

const newSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean
})

const Note = mongoose.model('Note', newSchema)

mongoose
    .connect(url)
    .then(() => {
        console.log('connected')

        Note.find({ important:false }).then(result => {
            result.forEach((note) => {
                console.log(note)
            })
            mongoose.connection.close()
        })
    })
    .catch((err) => console.log(err))