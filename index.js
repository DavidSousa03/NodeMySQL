const { error } = require("console");
const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql");

const app = express();

app.use(express.static("public"));
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");


app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());


app.get("/", (req, res) => {
  const sql = "SELECT * FROM books "

  connection.query(sql, (error, data)=>{
    if (error) {
      return console.log(error)
    }

    const books = data

    

    res.render("home", { books });
  })
    
})

app.post("/register/save", (req, res) => {
  const { name, pageqty } = req.body


  const query = `
      INSERT INTO books (name, pageqty)
      VALUES ('${name}', '${pageqty}')
  `

  connection.query(query, (error) =>{
      if (error) {
          console.log(error)
          return
      }

      res.redirect("/")
  })
})
app.get("/book/id", (req, res)=>{
  const id = res.params.id

  const sql = `
    SELECT * FROM books
    WHERE id=${id}
  `
  connection.query(sql,(error, data)=>{
    if (error) {
      return console.log (error)
    }

    const book = [0]
    
    res.render("book", {book })
  })
})

app.get("/register", (req, res) =>{
  res.render("register")
})

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'nodemysql',
  port: 3306
});

connection.connect((error) => {
  if (error) {
    console.error(error);
    return;
  }
 
  console.log('Conectado ao MySQL');

  app.listen(3000, () => {
      console.log("Servidor rodando na porta 3000!");
  });
});