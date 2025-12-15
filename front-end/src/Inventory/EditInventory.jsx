import { useState } from "react";
import Navbar from "../../../Nav/Navbar";

function EditInventory(){
    fetchAndDisplayData();

    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [id, setID] = useState("");

    return(
    <>
        <Navbar pageType="Edit Inventory"/>

        <div id="editInventory-div_1" style={{
            minHeight: "100vh",
            background: "#f5f6fa",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        }}>
        <div style={{
            background: "#fff",
            borderRadius: "18px",
            boxShadow: "0 8px 32px 0 rgba(0,33,71,0.10), 0 2px 8px 0 rgba(0,33,71,0.08)",
            padding: "2rem 2.2rem",
            maxWidth: "370px",
            width: "100%",
            border: "2px solid #002147",
            color: "#002147"
        }}>
            <div className="dropdown mb-4">
                <button className="btn btn-secondary dropdown-toggle w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{background: 'linear-gradient(90deg, #ffd700 0%, #ffb400 100%)', color: '#002147', fontWeight: 700, border: 'none', borderRadius: '12px'}}>
                    Current Inventory
                </button>
                <ul id="editInventory-dropDown" className="dropdown-menu w-100">
                </ul>
            </div>
            <div className="mb-3">
                <label htmlFor="editInventory-input_itemName" className="form-label" style={{fontWeight: 500, color: '#002147'}}>Item Name</label>
                <input onChange={(e)=>{setName(e.target.value)}} id="editInventory-input_itemName" type="text" className="form-control" placeholder="Item Name" style={{borderRadius: "8px", background: '#fff', color: '#002147', border: '1px solid #0056b3'}} />
            </div>
            <div className="mb-3">
                <label htmlFor="editInventory-input_quantity" className="form-label" style={{fontWeight: 500, color: '#002147'}}>Quantity</label>
                <input onChange={(e)=>{setQuantity(e.target.value)}} id="editInventory-input_quantity" type="text" className="form-control" placeholder="Quantity" style={{borderRadius: "8px", background: '#fff', color: '#002147', border: '1px solid #0056b3'}} />
                {/* Store the item ID but hide it from the user */}
                <input onChange={(e)=>{setID(e.target.value)}} id="editInventory-itemID" type="hidden" />
            </div>
            <button onClick={()=>{submitEditedInventory(name, quantity, id);}} type="button" className="btn w-100" style={{borderRadius: "25px", fontWeight: 700, fontSize: "1.1rem", background: 'linear-gradient(90deg, #ffd700 0%, #ffb400 100%)', color: '#002147', border: 'none', marginBottom: '0.5rem'}}>Save Changes</button>
            <button onClick={()=>{deleteInventoryItem(id);}} type="button" className="btn w-100" style={{borderRadius: "25px", fontWeight: 700, fontSize: "1.1rem", background: '#fff', color: '#002147', border: '2px solid #002147'}}>Delete This Item</button>
        </div>
        </div>
    
    </>
    )

    function displayAllDetails(itemName, inventoryItems){ //This function displays all the details of this inventory item
    //Including its name and quantity inside the empty input bars

    var itemQuantity = null;
    var itemID = null;

    for(let i=0; i<inventoryItems.length; i++){ //Search for the item quantity for this itemName
        if (itemName == inventoryItems[i].item_name){
            itemQuantity = inventoryItems[i].item_quantity;
            itemID = inventoryItems[i].id;
        } 
    }

    const input_itemName = document.getElementById("editInventory-input_itemName");
    const input_itemQuantity = document.getElementById("editInventory-input_quantity");
    const input_itemID = document.getElementById("editInventory-itemID");

    input_itemName.value = itemName;
    input_itemQuantity.value = itemQuantity;
    input_itemID.value = itemID;

    setName(input_itemName.value);
    setQuantity(input_itemQuantity.value);
    setID(input_itemID.value);

}

function fetchAndDisplayData(){ //This function fetches the current inventory items from backend and displays them inside the frontend
    
    fetch("http://localhost:5000/inventory/editInventory")
    .then((response) => {return response.json()})
    .then((jsonData) => {

        //This is the <ul> which will store the incoming data in the form of <li>
        const dropDown = document.getElementById("editInventory-dropDown");

        for(let i=0; i<jsonData.length; i++){

            const li = document.createElement("li");

            const a = document.createElement("a");
            a.href = "#";
            a.className = "dropdown-item";
            a.textContent = jsonData[i].item_name;

            a.onclick = ()=>{
                displayAllDetails(a.textContent, jsonData);
            }

            li.appendChild(a);
            dropDown.appendChild(li);
        }
    })
}

function submitEditedInventory(name, quantity, id){ //This function is called when user clicks on submit

    fetch("http://localhost:5000/inventory/submitEditedInventory", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({itemName: name, itemQuantity: quantity, itemID: id})
    })
    .then((res)=>{return res.text()})
    .then((textRes)=>{
        if (textRes == "missing_entries"){
            window.alert("Please select an item to edit first!");
        }
        else if (textRes == "success"){
            window.alert("Inventory has been edited!");
        }
        window.location.reload(); //Reload the window
    })
}

function deleteInventoryItem(id){ //This function is called when the user clicks on delete button

    fetch("http://localhost:5000/inventory/editInventoryDelete", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({itemID: id})
    })
    .then((res)=>{return res.text()})
    .then((textRes)=>{
        if (textRes == "missing_entries"){
            window.alert("Please select an item to remove first!");
        }
        else if (textRes == "success"){
            window.alert("Inventory item has been removed");
        }
        window.location.reload();
    })
}
}

export default EditInventory;

