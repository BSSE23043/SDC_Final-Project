import Navbar from "../Nav/Navbar";
import { useState } from "react";
import Handle_User_Permission from "../Shared_Functions/Sessions_Functions";

function Website_Admin_Add_Account(){

    const [accountName, setAccountName] = useState("");
    const [accountRole, setAccountRole] = useState("");
    const [accountEmail, setAccountEmail] = useState("");

    function submitForm(e){
        e.preventDefault();
        
        fetch("http://localhost:5000/accounts/addAccount", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name: accountName, email: accountEmail, role: accountRole}),
        })
        .then((response)=>{return response.text()})
        .then((textResponse)=>{
            if (textResponse == "missing_entries"){
                window.alert("Please fill all entries!");
            }
            else if (textResponse == "email_already_stored"){
                window.alert("This staff member already exists!");
            }
            else if (textResponse == "new_row_added"){
                window.alert("New staff member has been added!");
            }
            else if (textResponse == "error"){
                window.alert("An unexpected error has occurred, please contact the developers!");
            }
            window.location.reload(); //Reload the window
            }
        );
        }

    return(
        <>
        <Handle_User_Permission webpageRole={"website_admin"}>

        <Navbar pageType="Add Account"/>

        <div id="addInventory-div_1" style={{
            minHeight: "100vh",
            background: "#f5f6fa",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        }}>
        <form onSubmit={submitForm} id="inventory-div_1-form_1" style={{
            background: "#fff",
            borderRadius: "18px",
            boxShadow: "0 8px 32px 0 rgba(0,33,71,0.10), 0 2px 8px 0 rgba(0,33,71,0.08)",
            padding: "2rem 2.2rem",
            maxWidth: "370px",
            width: "100%",
            border: "2px solid #002147",
            color: "#002147"
        }}>
        <h2 style={{
            textAlign: "center",
            marginBottom: "1.5rem",
            color: "#002147",
            fontWeight: 800,
            letterSpacing: "1px",
            fontFamily: "'Segoe UI', 'Roboto', 'Arial', sans-serif"
        }}>Add User Account</h2>
        <div className="mb-3">
            <label htmlFor="add-inventory-item-name" className="form-label" style={{fontWeight: 500, color: '#002147'}}>Name</label>
            <input onChange={(e)=>{setAccountName(e.target.value);}} type="text" className="form-control" id="add-inventory-item-name" style={{borderRadius: "8px", background: '#fff', color: '#002147', border: '1px solid #0056b3'}} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
            <label htmlFor="add-inventory-item-name" className="form-label" style={{fontWeight: 500, color: '#002147'}}>Email</label>
            <input onChange={(e)=>{setAccountEmail(e.target.value);}} type="email" className="form-control" id="add-inventory-item-name" style={{borderRadius: "8px", background: '#fff', color: '#002147', border: '1px solid #0056b3'}} aria-describedby="emailHelp" />
            <div className="form-text" style={{color: '#002147'}}>University assigned email for this person.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="add-inventory-quantity" className="form-label" style={{fontWeight: 500, color: '#002147'}}>Role</label>
            <select onChange={(e)=>{setAccountRole(e.target.value);}} className="form-select" aria-label="Default select example" style={{borderRadius: "8px", background: '#fff', color: '#002147', border: '1px solid #0056b3'}}>
                <option selected value="">Choose Role</option>
                <option value="desk_person">Desk Person</option>
            </select>
        </div>
        <button type="submit" className="inventory-go-btn w-100" style={{
            borderRadius: "25px",
            fontWeight: 700,
            fontSize: "1.1rem",
            background: 'linear-gradient(90deg, #ffd700 0%, #ffb400 100%)',
            color: "#002147",
            border: "none",
            boxShadow: "0 2px 8px 0 rgba(0,33,71,0.10)",
            marginTop: "1rem"
        }}>Submit</button>
        </form>
        </div>

        </Handle_User_Permission>
        
        </>
    );
}

export default Website_Admin_Add_Account;