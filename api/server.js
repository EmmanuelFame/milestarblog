const express = require("express")
const cors = require("cors")
const mysql = require("mysql2")

const app = express()

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Milestar Blog",
})

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err)
    return
  }
  console.log("Connected to the MySQL database.")
})

app.use(cors())
app.use(express.json())

app.get("/posts", (req, res) => {
  db.query("SELECT * FROM posts", (err, results) => {
    if (err) {
      console.error("Error fetching posts:", err)
      res.status(500).send("Server Error")
      return
    }
    res.json(results)
  })
})

app.post("/posts", (req, res) => {
  const { title, content, author } = req.body
  const query = "INSERT INTO posts (title, content, author) VALUES (?, ?, ?)"
  db.query(query, [title, content, author], (err, result) => {
    if (err) {
      console.error("Error adding post:", err)
      res.status(500).send({ success: false, message: "Server Error" })
      return
    }
    res.send({ success: true, message: "Post added successfully" })
  })
})

app.listen(5000, () => {
  console.log("Server started on port 5000")
})
