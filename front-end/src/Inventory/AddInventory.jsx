import { useState } from "react";
import Navbar from "../../../Nav/Navbar";

function AddInventory(){

    const [itemName, setItemName] = useState("");
    const [itemQuantity, setItemQuantity] = useState("");

    function submitForm(e){
        e.preventDefault();
    
        fetch("http://localhost:5000/inventory/addInventoryItem", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({itemName: itemName, itemQuantity: itemQuantity}),
        })
        .then((response)=>{return response.text()})
        .then((textResponse)=>{
            if (textResponse == "missing_entries"){
                window.alert("Please fill all entries!");
            }
            else if (textResponse == "new_item_added"){
                window.alert("New item detected! It has been added");
            }
            else if (textResponse == "item_updated"){
                window.alert("Item already exists! Quantity has been updated!");
            }
            else if (textResponse == "failure"){
                window.alert("Unexpected error occured! Please contact the developers!");
            }
            window.location.reload(); //Reload the window
        }
    );
    }

    return(
        <>
        <Navbar pageType="Add Inventory Item"/>

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
        }}>Add Inventory Item</h2>
        <div className="mb-3">
            <label htmlFor="add-inventory-item-name" className="form-label" style={{fontWeight: 500, color: '#002147'}}>Item Name</label>
            <input onChange={(e)=>{setItemName(e.target.value)}} type="text" className="form-control" id="add-inventory-item-name" style={{borderRadius: "8px", background: '#fff', color: '#002147', border: '1px solid #0056b3'}} aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text" style={{color: '#002147'}}>For example: PC, Circuit board, etc.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="add-inventory-quantity" className="form-label" style={{fontWeight: 500, color: '#002147'}}>Quantity</label>
            <input onChange={(e)=>{setItemQuantity(e.target.value)}} type="number" className="form-control" id="add-inventory-quantity" style={{borderRadius: "8px", background: '#fff', color: '#002147', border: '1px solid #0056b3'}} />
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
        </>
    );
}

export default AddInventory;