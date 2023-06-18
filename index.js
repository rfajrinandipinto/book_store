import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"fajriaja",
    database: "test"
})


app.use(express.json())
app.use(cors())

app.get("/", (req,res)=> {
    res.json("hello")
})


app.get("/update", (req,res)=> {
    res.json("hello")
})

app.get("/books", (req,res)=> {
    const query = "SELECT * FROM books"

    db.query(query, (err,data)=> {
        if(err) return res.json(err)

        return res.json(data)
    })
})

app.post("/books", (req,res)=> {
    const query = "INSERT INTO books (`title`,`desc`,`cover`,`price`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price
    ]

    db.query(query,[values], (err,data)=> {
        if(err) return res.json(err)

        return res.json("Book has been created")
    })
})

app.delete("/books/:id", (req,res)=> {
    const bookId = req.params.id;
    const query = "DELETE FROM books WHERE id = ?"

    db.query(query, [bookId], (err,data)=> {
        if(err) return res.json(err)

        return res.json("Book has been deleted")
    })
})

app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const query = "UPDATE books SET `title` = ?, `desc` = ?, `cover` = ?, `price` = ? WHERE id = ?";
  
    const values = [
      req.body.title,
      req.body.desc,
      req.body.cover,
      req.body.price,
      bookId
    ];
  
      db.query(query, values, (err, data) => {
        if (err) {
          return res.json(err);
        }
  
        return res.json("Book has been updated");
      });
  });

app.listen(8800, ()=> {
    console.log("Connected to backend!")
})