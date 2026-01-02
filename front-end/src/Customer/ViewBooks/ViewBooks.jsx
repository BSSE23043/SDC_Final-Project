import { useState } from "react";
import Navbar from "../../Nav/Navbar";
import "./ViewBooks.css";

function loadBookCatalog(){

    function borrowBook(bookISBN){
        console.log("Borrow book function called!");
        console.log(bookISBN);

        fetch("http://98.92.174.150:5000/book/borrowBook", {
            method: "POST",
            credentials: "include",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({bookISBN: bookISBN})
        })
        .then((res)=>{return res.text()})
        .then((textRes)=>{
            if (textRes == "success"){window.alert("Your request has been recoreded, please wait till staff approval!");}
            else if (textRes == "book_is_out_of_stock"){window.alert("Book is no longer in stock!");}
            else if (textRes == "empty_input_fields"){window.alert("Please fill all input fields!");}
            else if (textRes == "borrow_already_in_progress"){window.alert("You already have an ongoing borrow for this book!");}
            else {window.alert("An unexpected error has occured!");}
        })
    }

    fetch("http://98.92.174.150:5000/book/viewBookCatalog", {method: "GET"})
    .then((res)=>{return res.json()})
    .then((data)=>{
        for(let i = 0; i< data.rows.length; i++){
            const targetTableBody = document.getElementById("customer_viewBooks_tableBody");

            const row = document.createElement("tr"); //Create row

            //Row number
            const rowNumber = document.createElement("th");
            rowNumber.scope = "row";
            rowNumber.textContent = i + 1;

            //Title
            const bookName = document.createElement("td");
            bookName.textContent = data.rows[i]["book_name"];

            //Author
            const authorName = document.createElement("td");
            authorName.textContent = data.rows[i]["author"];

            //Available Quantity
            const availableQuantity = document.createElement("td");
            availableQuantity.textContent = data.rows[i]["quantity"];

            //Borrow book button
            const button_borrowBook = document.createElement("button");
            button_borrowBook.className = "btn btn-success";
            button_borrowBook.type = "button";
            button_borrowBook.textContent = "Borrow Book";
            button_borrowBook.onclick = (()=>{
                borrowBook(data.rows[i]["isbn"]);
            });
            
            //Compile the table
            row.appendChild(rowNumber);
            row.appendChild(bookName);
            row.appendChild(authorName);
            row.appendChild(availableQuantity);
            row.appendChild(button_borrowBook);
            targetTableBody.appendChild(row);
        }
    })
}

function Customer_ViewBooks(){
    loadBookCatalog();
    return(
        <>
            <Navbar pageType = "Books Catalog"/>
            
            <table className="table table-striped-columns" id="customer_viewBooks_table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Author</th>
                    <th scope="col">Available Stock</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody id="customer_viewBooks_tableBody">
        
                </tbody>
            </table>
        </>
    );
}

export default Customer_ViewBooks;