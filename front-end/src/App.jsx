import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Homepage from './Homepage/Homepage'
import SignUp from './SignUp/signUp';
import SignIn from './SignIn/SignIn';
import Website_Admin_Dashboard from './Website_Admin/Website_Admin_Dashboard';
import Website_Admin_View_Accounts from './Website_Admin/Website_Admin_View_Accounts';
import Website_Admin_Add_Account from './Website_Admin/Website_Admin_Add_Account';
import Inventory_Dashboard from './Inventory/Inventory_Dashboard';

function App() {
  return (
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path= "/signin" element = {<SignIn />} />
        <Route path= "/website_admin_dashboard" element = {<Website_Admin_Dashboard />} />
        <Route path= "/website_admin_dashboard/viewAccounts" element = {<Website_Admin_View_Accounts />} />
        <Route path= "/website_admin_dashboard/addAccount" element = {<Website_Admin_Add_Account />} />
        <Route path= "/inventory_dashboard" element = {<Inventory_Dashboard />} />
  
        </Routes>
      </BrowserRouter>
  )
}

export default App