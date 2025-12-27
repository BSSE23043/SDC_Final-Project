const express = require("express");
const router = express.Router();

const {
  addBook,
  editBooks,
  submitEditedBook,
  deleteBook,
  viewLibrary
} = require("../controllers/libraryController.js");

const {
  viewBookCatalog,
  borrowBook,
} = require("../controllers/customerController.js");

// ADD
router.post("/addBook", async(req, res)=>{
  console.log ("connection has been made to route!");
  await addBook(req, res);
});

// EDIT
router.get("/editBooks", editBooks);
router.post("/submitEditedBook", submitEditedBook);
router.post("/deleteBook", deleteBook);

// VIEW
router.get("/viewLibrary", viewLibrary);

// Routes for customer //
//View book catalog
router.get("/viewBookCatalog", async(req, res)=>{ 
  await viewBookCatalog(req, res);

});

//Borrow book
router.post("/borrowBook", async(req, res)=>{
  await borrowBook(req, res);
});

module.exports = router;
