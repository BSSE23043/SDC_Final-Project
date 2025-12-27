const connectToDatabase = require("../models/setupDB");

//View Book Catalog Controller for Customer Starts Here//
async function viewBookCatalog(req, res){
    try{
        const library_db = await connectToDatabase();
        const query = `SELECT * FROM library`;
        const data = await library_db.query(query);
        res.json(data);
    }
    catch(error){
        console.log(`customerController.js -> viewBookCatalog: ${error.message}`);
    }
}

async function borrowBook(req, res){
    const {bookISBN} = req.body;

    //Make sure user has sent all the input
    if (!bookISBN){res.write("empty_input_fields");}

    try{
        const library_db = await connectToDatabase();

        //If the requested book is not in sufficient quantity, then return failure
        if (!await checkBookQuantity(bookISBN)){
            res.write("book_is_out_of_stock");
            res.end();
            return;
        }

        //If the same user is requesting the same book again even he already has an ongoing borrow for this book, then return failure
        if (await hasBookAlreadyBeenRequested(bookISBN, req.session.user.email)){
            res.write("borrow_already_in_progress");
            res.end();
        }
        
        //Extract the current date time at that point
        const query_getTodaysDateTime = `SELECT current_timestamp`
        const rawData = await library_db.query(query_getTodaysDateTime);
        const todayDateTime = rawData.rows[0]["current_timestamp"];

        //If everything is fine then run the query
        const query = `INSERT INTO borrowed_books(book_isbn, borrow_date_time, customer_email, borrow_completed
        ,borrow_approved_by_staff) 
        VALUES($1, $2, $3, $4, $5)`;
        await library_db.query(query, [bookISBN, todayDateTime, req.session.user.email, "NO", "NO"]);
        res.write("success");
        res.end();
    }
    catch(error){
        console.log(`customerController.js -> borrowBook: ${error.message}`);
    }
}

async function checkBookQuantity(book_isbn){ //Validate if the book is in stock or not

    try{
        const library_db = await connectToDatabase();
        const query = `SELECT quantity FROM library WHERE isbn = $1`;
        const rawData = await library_db.query(query, [book_isbn]);
        if (rawData.rows[0].quantity > 0){return true;}
        else return false;
    }
    catch(error){console.log(`customerController.js -> checkBookQuantity: ${error.message}`);}
}

async function hasBookAlreadyBeenRequested(book_isbn, customer_email){ //Check if the same user already has a pending request for borrowing
    //..this book, if yes then return true, otherwise false

    try{
        const library_db = await connectToDatabase();

        const query = `SELECT * FROM borrowed_books WHERE book_isbn = $1 AND customer_email = $2 AND borrow_completed = $3`;
        const rawData = await library_db.query(query, [book_isbn, customer_email, "NO"]);
        if (rawData.rows.length > 0){
            console.log(`book is already borrowed`);
            return true;
        }
        else return false;
    }
    catch(error){console.log(`customerController.js -> hasBookAlreadyBeenRequested: ${error.message}`);}

}

//View Book Catalog Controller for Customer Ends Here//

module.exports = {viewBookCatalog,
    borrowBook,
};