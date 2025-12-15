import "./signUp.css";
import Navbar from "../Nav/Navbar";
import { useNavigate, useNavigation } from "react-router-dom";
import { useState } from "react";

function SignUp() {

    //These are the variables of the form
    //When the form gets submitted, the input values get saved in these variables
    const [userName, setUserName] = useState("");
    const [userPass, setUserPass] = useState("");
    const [accountType, setAccountType] = useState("");
    const [userEmail, setUserEmail] = useState("");

    const navigate = useNavigate();

    function goToLabEngineerDashboard() {
        console.log("Changing navigation to dashboard!");         
        navigate("/labEngineerDashboard");
    }

    function goToUserAlreadyExists(){
        navigate("/useralreadyexists");
    }

    //Submit the form
    function submitForm(e){
        e.preventDefault();

        fetch("http://localhost:5000/auth/signup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username : userName, password: userPass, email: userEmail, accountType: accountType})
        }).then((res) => res.text())
        .then((textResponse) => {
            console.log(textResponse);
            if (textResponse == "user_already_exists"){
                window.alert("Account on this email already exists!");
            }
            else if (textResponse == "success"){
                window.alert("Account has been created!");
                goToDashboard();
            }
            else if (textResponse == "missing_entries"){
                window.alert("Please fill all the form!");
            }
        });
           
    }

    return (
        <>
            <Navbar pageType="Sign Up" style={{background: '#bfa14a'}}/>
            <div style={{
                minHeight: "100vh",
                background: "radial-gradient(ellipse at center, #a83232 0%, #2b0909 60%, #000 100%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start"
            }}>
                <div style={{
                    marginTop: "1rem",
                    marginBottom: "1rem",
                    background: "linear-gradient(135deg, #231c1cff 30%, #cd0b0bff 70%)",
                    borderRadius: "20px",
                    boxShadow: "0 8px 32px 0 rgba(80,0,0,0.35), 0 2px 8px 0 rgba(128,0,0,0.25)",
                    padding: "0.2rem 0.7rem",
                    minHeight: "180px",
                    maxWidth: "420px",
                    width: "100%",
                    border: "2px solid #800000",
                    color: "#fff"
                }}>
                    <form onSubmit={submitForm} id="form_1">
                        <h1 style={{
                            textAlign: "center",
                            marginBottom: "2rem",
                            color: "#fff",
                            fontWeight: 800,
                            letterSpacing: "1px",
                            fontFamily: "'Segoe UI', 'Roboto', 'Arial', sans-serif"
                        }}>Sign Up</h1>

                        <div className="mb-3">
                            <label htmlFor="signup-name" className="form-label" style={{fontWeight: 500, color: '#fff'}}>Name</label>
                            <input onChange={(e) => setUserName(e.target.value)} type="text" className="form-control" id="signup-name" style={{borderRadius: "8px", background: '#232526', color: '#fff', border: '1px solid #800000'}} aria-describedby="emailHelp" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="signup-email" className="form-label" style={{fontWeight: 500, color: '#fff'}}>Email address</label>
                            <input onChange={(e) => setUserEmail(e.target.value)} type="email" className="form-control" id="signup-email" style={{borderRadius: "8px", background: '#232526', color: '#fff', border: '1px solid #800000'}} aria-describedby="emailHelp" />
                            <div id="emailHelp" className="form-text" style={{color: '#fff'}}>We'll never share your email with anyone else.</div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="signup-password" className="form-label" style={{fontWeight: 500, color: '#fff'}}>Password</label>
                            <input onChange={(e) => setUserPass(e.target.value)} type="password" className="form-control" id="signup-password" style={{borderRadius: "8px", background: '#232526', color: '#fff', border: '1px solid #800000'}} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="signup-accountType" className="form-label" style={{fontWeight: 500, color: '#fff'}}>Account Type</label>
                            <select onChange={(e) => setAccountType(e.target.value)} className="form-select" id="signup-accountType" style={{borderRadius: "8px", background: '#232526', color: '#fff', border: '1px solid #800000'}} aria-label="Default select example">
                                <option value="not_selected">Account Type</option>
                                <option value="customer">Customer</option>
                            </select>
                        </div>

                        <button type="submit" className="btn w-100" style={{
                            borderRadius: "25px",
                            fontWeight: 700,
                            fontSize: "1.1rem",
                            background: "linear-gradient(90deg, #232526  0%)",
                            color: "#fff",
                            border: "none",
                            boxShadow: "0 2px 8px 0 rgba(191, 161, 74, 0.10)"
                        }}>Sign Up</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignUp;