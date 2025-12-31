import { useEffect, useState } from "react";
import Navbar from "../Nav/Navbar";
import Handle_User_Permission from "../Shared_Functions/Sessions_Functions";

function ViewBorrows(){
    useEffect(()=>{fetchBorrowings()}, []);
    const [borrows, setBorrows] = useState([]);

    function fetchBorrowings(){
       fetch("http://localhost:5000/book/viewBorrows", {
            method: "GET",
        })
        .then((res)=>{return res.json();})
        .then((data)=>{setBorrows(data);})
    }

    function validateBorrowDateAndBorrowDeadline(staffApproval){
        if (staffApproval == "PENDING" || staffApproval == "REJECTED"){
            return "-";
        }
    }

    function handleBorrowCompletion(value, customer_email, book_isbn){
        fetch("http://localhost:5000/book/handleBorrowCompletion", 
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: (JSON.stringify({markValue: value, customer_email: customer_email, book_isbn, book_isbn}))
            }
        )
        .then((res)=>{return res.text();})
        .then((textResponse)=>{
            if (value == "YES" && textResponse == "success"){window.alert("Borrow has been marked as completed"); window.location.reload();}
            if (value == "NO" && textResponse == "success"){window.alert("Borrow has been marked as not-completed"); window.location.reload();}
            else if (textResponse == "failure"){window.alert("An unexpcted error has occured!"); window.location.reload();}
            else if (textResponse == "no_borrow_approval"){window.alert("This borrow is not approved by staff!"); window.location.reload();}
        })
    }

    return(
        <>
            {/* <Handle_User_Permission webpageRole={"staff"}> */}

            <Navbar pageType="View & Manage Book Borrows"/>

            <table className="table" id="viewBorrows-tableHead">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Customer Email</th>
                    <th scope="col">Book ISBN</th>
                    <th scope="col">Staff Approval Of Borrow</th>
                    <th scope="col">Borrow Completion</th>
                    <th scope="col">Borrow Date</th>
                    <th scope="col">Borrow Deadline</th>
                    <th scope="col">Manage Completion</th>
                    </tr>
                </thead>
                <tbody id="viewBorrows-tableBody">
                {borrows.map((borrow, index)=>{
                    borrow.borrow_date = validateBorrowDateAndBorrowDeadline(borrow.borrow_approved_by_staff);
                    borrow.deadline_date = validateBorrowDateAndBorrowDeadline(borrow.borrow_approved_by_staff);
                    return(
                        <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{borrow.customer_email}</td>
                        <td>{borrow.book_isbn}</td>
                        <td>{borrow.borrow_approved_by_staff}</td>
                        <td>{borrow.borrow_completed}</td>
                        <td>{borrow.borrow_date}</td>
                        <td>{borrow.deadline_date}</td>
                        <td>
                            <button type="button" className="btn btn-success" onClick={()=>{handleBorrowCompletion("YES", borrow.customer_email, borrow.book_isbn)}}>Mark As Completed</button>
                            <button type="button" className="btn btn-danger" onClick={()=>{handleBorrowCompletion("NO", borrow.customer_email, borrow.book_isbn)}}>Mark As Not-Completed</button>
                        </td>
                    </tr>
                    );
                })}
                </tbody>
            </table>

        {/* </Handle_User_Permission> */}
        </>
    );
}

export default ViewBorrows;