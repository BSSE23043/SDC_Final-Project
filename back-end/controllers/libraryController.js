const connectToDB = require("../models/setupDB.js");

// ================= ADD BOOK =================
async function addBook(req, res){
  const { bookName, author, isbn, quantity } = req.body;

  if (!bookName || !author || !isbn || !quantity){
    res.send("missing_entries");
    return;
  }

  const client = await connectToDB();

  try{
    const check = await client.query(
      "SELECT * FROM library WHERE isbn = $1",
      [isbn]
    );

    if (check.rowCount > 0){
      await client.query(
        "UPDATE library SET quantity = quantity + $1 WHERE isbn = $2",
        [quantity, isbn]
      );
      res.send("book_updated");
    }
    else{
      await client.query(
        "INSERT INTO library (book_name, author, isbn, quantity) VALUES ($1,$2,$3,$4)",
        [bookName, author, isbn, quantity]
      );
      res.send("new_book_added");
    }
  }
  catch(err){
    console.log(err.message);
    res.send("failure");
  }
}

// ================= EDIT BOOK =================
async function editBooks(req, res){
  const client = await connectToDB();
  const data = await client.query("SELECT * FROM library");
  res.json(data.rows);
}

async function submitEditedBook(req, res){
  const { name, author, isbn, quantity, id } = req.body;

  if (!name || !author || !isbn || !quantity || !id){
    res.send("missing_entries");
    return;
  }

  const client = await connectToDB();
  await client.query(
    `UPDATE library 
     SET book_name=$1, author=$2, isbn=$3, quantity=$4 
     WHERE id=$5`,
    [name, author, isbn, quantity, id]
  );

  res.send("success");
}

async function deleteBook(req, res){
  const { id } = req.body;
  if (!id){
    res.send("missing_entries");
    return;
  }

  const client = await connectToDB();
  await client.query("DELETE FROM library WHERE id = $1", [id]);
  res.send("success");
}

// ================= VIEW BOOKS =================
async function viewLibrary(req, res){
  const client = await connectToDB();
  const data = await client.query("SELECT * FROM library");
  res.json(data.rows);
}

module.exports = {
  addBook,
  editBooks,
  submitEditedBook,
  deleteBook,
  viewLibrary
};
