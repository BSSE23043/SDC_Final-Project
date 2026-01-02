import { useState } from "react";
import Navbar from "../Nav/Navbar";
import Handle_User_Permission from "../Shared_Functions/Sessions_Functions";


function loadBookCatalog(){


    fetch("http://sdclb-108821170.us-east-1.elb.amazonaws.com/book/viewBookCatalog", {method: "GET"})
    .then((res)=>{return res.json()})
    .then((data)=>{
        for(let i = 0; i< data.rows.length; i++){
            const targetTableBody = document.getElementById("staff_viewBooks_tableBody");

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

            //Book ISBN
            const book_isbn = document.createElement("td");
            book_isbn.textContent = data.rows[i]["isbn"];

            //Compile the table
            row.appendChild(rowNumber);
            row.appendChild(book_isbn);
            row.appendChild(bookName);
            row.appendChild(authorName);
            row.appendChild(availableQuantity);
            targetTableBody.appendChild(row);
        }
    })
}

function Staff_ViewBooks(){
    loadBookCatalog();
    return(
        <>
        <Handle_User_Permission webpageRole = "staff">
            <Navbar pageType = "Books Catalog"/>
            
            <table className="table table-striped-columns" id="staff_viewBooks_table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">ISBN</th>
                    <th scope="col">Title</th>
                    <th scope="col">Author</th>
                    <th scope="col">Available Stock</th>
                  
                    </tr>
                </thead>
                <tbody id="staff_viewBooks_tableBody">
        
                </tbody>
            </table>
            </Handle_User_Permission>
        </>
    );
}

export default Staff_ViewBooks;