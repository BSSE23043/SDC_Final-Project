import { useState } from "react";
import Navbar from "../Nav/Navbar";
import { useNavigate } from "react-router-dom";

function SignIn(){

    const navigate = useNavigate();

    function goToCustomerDashboard() {
        navigate("/customer_dashboard");
    }

    function goToStaffDashboard() {
        navigate("/staff_dashboard");
    }

    function goToWebsiteAdminDashboard(){
        navigate("/website_admin_dashboard");
    }

    function goToDeskPersonDashboard(){
        navigate("/inventory_dashboard");
    }

    const [email, setEmail] = useState("");
    const [password, setPasseword] = useState("");

    function submitform(e) {
        e.preventDefault();
        fetch("http://localhost:5000/auth/signin", {
            method: "POST",
            // credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email, password: password })
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.status === "missing_fields") {
                    window.alert("Fill all the fields");
                } else if (res.status === "credentials_mismatch") {
                    window.alert("Credentials mismatched, try again");
                } else if (res.status === "success") {
                    window.alert(`Logged in as ${res.role}`);
                    if (res.role === "customer") {
                        goToCustomerDashboard();
                    }
                    else if (res.role === "staff") {
                        goToStaffDashboard();
                    }
                    else if (res.role === "website_admin"){
                        goToWebsiteAdminDashboard();
                    }
                    else if (res.role === "desk_person"){
                        goToWebsiteAdminDashboard();
                    }
                }
                else if (res.status === "error") {
                    window.alert("Unexpected response from server.");
                }
                else if (res.status === "terminated"){
                    window.alert("You can't login, your account is terminated!");
                }
            });
    }

    return (
        <>
            <Navbar pageType="Sign In" />

            <div style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #fff3e0 0%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start"
            }}>
                <div style={{
                    marginTop: "3rem",
                    backgroundColor: "white",
                    borderRadius: "1.5rem",
                    boxShadow: "0 8px 32px rgba(255, 152, 0, 0.18), 0 2px 8px rgba(255, 87, 34, 0.10)",
                    padding: "2.5rem 2rem",
                    maxWidth: "420px",
                    width: "100%",
                    border: "2.5px solid #05105cff",
                    color: "#0d0651ff",
                    fontWeight: 700,
                    backdropFilter: "blur(2px)",
                    transition: "box-shadow 0.3s, border 0.3s"
                }}>
                    <form onSubmit={submitform} id="form_1">
                        <h1 style={{
                            textAlign: "center",
                            marginBottom: "2rem",
                            color: "#05105cff",
                            fontWeight: 800,
                            letterSpacing: "1px",
                            fontFamily: "'Segoe UI', 'Roboto', 'Arial', sans-serif"
                        }}>Sign In</h1>

                        <div className="mb-3">
                            <label htmlFor="signin-email" className="form-label" style={{ fontWeight: 500, color: '#05105cff' }}>Email address</label>
                            <input onChange={(e) => { setEmail(e.target.value) }} type="email" className="form-control" id="signin-email" style={{ borderRadius: "8px", backgroundColor: ' #eb8f06ff', color: '#fff', border: '1px solid #800000' }} aria-describedby="emailHelp" />
                            <div id="emailHelp" className="form-text" style={{ color: '#05105cff' }}>We'll never share your email with anyone else.</div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="signin-password" className="form-label" style={{ fontWeight: 500, color: '#05105cff' }}>Password</label>
                            <input onChange={(e) => { setPasseword(e.target.value) }} type="password" className="form-control" id="signin-password" style={{ borderRadius: "8px", backgroundColor: '#eb8f06ff', color: '#fff', border: '1px solid #800000' }} />
                        </div>

                       
                             
                        <button type="submit" className="btn w-100" style={{
                            borderRadius: "25px",
                            fontWeight: 700,
                            fontSize: "1.1rem",
                            backgroundColor: " #eb8f06ff",
                            color: "#05105cff",
                            border: "2.5px solid #b25625ff",
                            boxShadow: "0 2px 8px 0 rgba(255, 152, 0, 0.10)"
                        }}>Sign In</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignIn;