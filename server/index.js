const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/auth')
const app = express()
const PORT = 5000

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://binh412005:CNVqPWfyzzRH51A9@cluster0.5ctxi4r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    console.log('mongodb connected')

  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}


connectDB()


app.get('/', (req, res) => {
  res.send('Hello world')
})

app.use('/api/auth', authRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))