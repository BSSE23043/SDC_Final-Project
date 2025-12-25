const express = require("express");
const router = express.Router();

const {
  addBook,
  editBooks,
  submitEditedBook,
  deleteBook,
  viewLibrary
} = require("../controllers/libraryController.js");

// ADD
router.post("/addBook", addBook);

// EDIT
router.get("/editBooks", editBooks);
router.post("/submitEditedBook", submitEditedBook);
router.post("/deleteBook", deleteBook);

// VIEW
router.get("/viewLibrary", viewLibrary);

module.exports = router;
