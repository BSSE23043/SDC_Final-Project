import Navbar from "../Nav/Navbar";

function Website_Admin_View_Accounts(){

    function fetchAccountsFromDB(){ //This function will fetch the requests from the database, only those requests will be fetched which are marked as pending
    //..and then they will be displayed in the table

        fetch("http://localhost:5000/accounts/fetchAccounts", {
            method: "GET",
        })
        .then((res)=> {return res.json()})
        .then((data)=> {
            for (let i= 0; i< data.length; i++){
                const tBody = document.getElementById("websiteAdmin-viewAccounts-tableBody");

                const tR = document.createElement("tr");

                //Number of the row
                const rowCount = document.createElement("th");
                rowCount.scope = "row";
                rowCount.textContent = i + 1;

                //The name of the account
                const accountName = document.createElement("td");
                accountName.textContent = data[i].name;

                //The email of the account
                const accountEmail = document.createElement("td");
                accountEmail.textContent = data[i].email;

                //The role of the account
                const accountRole = document.createElement("td");
                accountRole.textContent = data[i].role;

                //The status of the account
                const accountStatus = document.createElement("td");
                accountStatus.textContent = data[i].account_status;

                //Terminate account button
                const terminateAccountButton = document.createElement("button");
                terminateAccountButton.type = "button";
                terminateAccountButton.className = "btn btn-danger";
                terminateAccountButton.textContent = "Terminate Account";
                terminateAccountButton.onclick = ()=>{terminateAccount(data[i].email);}
                if (data[i].email == "website_admin@itu.edu.pk") //Website admin can not disbale his own account
                    terminateAccountButton.disabled = true;

                //Restore account button
                const restoreAccountButton = document.createElement("button");
                restoreAccountButton.type = "button";
                restoreAccountButton.className = "btn btn-success";
                restoreAccountButton.textContent = "Restore Account";
                restoreAccountButton.onclick = ()=>{restoreAccount(data[i].email);}
                if (data[i].email == "website_admin@itu.edu.pk") //Website admin can not restore his own account
                    restoreAccountButton.disabled = true;

                tR.appendChild(rowCount);
                tR.appendChild(accountName);
                tR.appendChild(accountEmail);
                tR.appendChild(accountRole);
                tR.appendChild(accountStatus);
                tR.appendChild(terminateAccountButton);
                tR.appendChild(restoreAccountButton);
                    
                tBody.appendChild(tR);
            }
        })
    }

    function terminateAccount(targetEmail){ //This function gets called when user clicks on terminate account
        fetch("http://localhost:5000/accounts/terminateAccount", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email: targetEmail})
        })
        .then((res)=> {return res.text();})
        .then((textRes)=> {
            if (textRes == "success"){
                window.alert("Account has been terminated");
            }
            else if (textRes == "failure"){
                window.alert("Issue in terminating the account!");
            }
            window.location.reload();
        })
    }

    function restoreAccount(targetEmail){ //This function gets called when user clicks on Restore account
        fetch("http://localhost:5000/accounts/restoreAccount", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email: targetEmail})
        })
        .then((res)=> {return res.text();})
        .then((textRes)=> {
            if (textRes == "success"){
                window.alert("Account has been restored");
            }
            else if (textRes == "failure"){
                window.alert("Issue in restoring the account!");
            }
            window.location.reload();
        })
    }

    fetchAccountsFromDB(); //Fetch all the accounts inside the table

    return(
        <>
            <Navbar pageType="View & Manage Accounts"/>

            <table className="table" id="websiteAdmin-viewAccounts-tableHead">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody id="websiteAdmin-viewAccounts-tableBody">
                </tbody>
            </table>

        </>
    );
}

export default Website_Admin_View_Accounts;