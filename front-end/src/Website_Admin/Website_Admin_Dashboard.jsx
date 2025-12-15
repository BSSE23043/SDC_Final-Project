import Navbar from "../Nav/Navbar";
import { useNavigate } from "react-router-dom";
// import Handle_User_Permission from "../Shared_Functions/Sessions_Functions";
import { useEffect } from "react";
import { useState } from "react";

function Website_Admin_Dashboard(){

    const navigation = useNavigate();
    
    function goToViewWebsiteAccounts(){
        navigation("viewAccounts");
    }

    function goToAddAccount(){
        navigation("addAccount");
    }

    // useEffect(()=> {
    //     async function checkUserPermission(){
    //         await Validate_User_Permission("website_admin");
    //     }
    //     checkUserPermission();
    // }, []);

    return(
        <>
            {/* <Handle_User_Permission webpageRole = "website_admin"> */}

                <Navbar pageType="Website Admin Dashboard"/>
                <div>
                    <div className="d-flex flex-wrap justify-content-center gap-4" style={{ marginTop: '3rem' }}>
                        {/* View website accounts Card */}
                        <div className="card d-flex flex-column justify-content-between" style={{ width: "15rem", background: "#fff", borderRadius: "1rem", boxShadow: "0 4px 24px rgba(0,33,71,0.10)", border: "1.5px solid #002147", fontFamily: 'Segoe UI, Arial, sans-serif', minHeight: '340px', marginTop: '1rem' }}>
                            <img src={"https://chipincorp.com/wp-content/uploads/2019/09/nt06-01-user-vs-group.jpg"} className="card-img-top" alt="Inventory" style={{ borderTopLeftRadius: "0.5rem", borderTopRightRadius: "0.5rem", height: "140px", objectFit: "cover" }} />
                            <div className="card-body d-flex flex-column justify-content-between" style={{ background: "#fff", color: "#002147", borderRadius: "0 0 1rem 1rem", flex: 1 }}>
                                <div className="text-center">
                                    <h5 className="card-title" style={{ fontWeight: 700, color: '#002147', fontSize: '1.15rem', marginBottom: '0.5rem' }}>View Website Accounts</h5>
                                    <p className="card-text" style={{ color: '#002147', fontSize: '1rem', marginBottom: '0.5rem' }}>View and manage all the accounts registered to the website.</p>
                                </div>
                                <button onClick={goToViewWebsiteAccounts} className="btn w-100 mt-auto" style={{ background: "linear-gradient(90deg, #ffd700 0%, #ffb400 100%)", color: "#002147", borderRadius: "25px", fontWeight: 700, border: "none" }}>Go</button>
                            </div>
                        </div>
                        {/* Add accounts Card */}
                        <div className="card d-flex flex-column justify-content-between" style={{ width: "15rem", background: "#fff", borderRadius: "1rem", boxShadow: "0 4px 24px rgba(0,33,71,0.10)", border: "1.5px solid #002147", fontFamily: 'Segoe UI, Arial, sans-serif', minHeight: '340px', marginTop: '1rem' }}>
                            <img src={"https://www.cminds.com/wp-content/uploads/M2-Multi-User-Account.png"} className="card-img-top" alt="Inventory" style={{ borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem", height: "140px", objectFit: "cover" }} />
                            <div className="card-body d-flex flex-column justify-content-between" style={{ background: "#fff", color: "#002147", borderRadius: "0 0 1rem 1rem", flex: 1 }}>
                                <div className="text-center">
                                    <h5 className="card-title" style={{ fontWeight: 700, color: '#002147', fontSize: '1.15rem', marginBottom: '0.5rem' }}>Add Account</h5>
                                    <p className="card-text" style={{ color: '#002147', fontSize: '1rem', marginBottom: '0.5rem' }}>Add accounts for super manager and sub manager.</p>
                                </div>
                                <button onClick={goToAddAccount} className="btn w-100 mt-auto" style={{ background: "linear-gradient(90deg, #ffd700 0%, #ffb400 100%)", color: "#002147", borderRadius: "25px", fontWeight: 700, border: "none" }}>Go</button>
                            </div>
                        </div>
                    </div>
                </div>

            {/* </Handle_User_Permission> */}
            
        </>
    );

}

export default Website_Admin_Dashboard;