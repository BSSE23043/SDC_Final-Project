import Navbar from "../Nav/Navbar";
// import addBookCard from "../../../assets/addInventory.png";
// import editBookCard from "../../../assets/editInventoryCard.png";
import { useNavigate } from "react-router-dom";

function Library_Dashboard(){

    const navigate = useNavigate();

    function goToAddBook(){
        navigate("/library/addBook");
    }

    function goToEditBook(){
        navigate("/Library/editBook");
    }

    return (
        <>
            <Navbar pageType="Library Dashboard"/>

            <div style={{
                marginTop: "3rem",
                display: "flex",
                gap: "2rem",
                justifyContent: "center",
                flexWrap: "wrap"
            }}>

            {/* Add Book */}
            <div onClick={goToAddBook} className="card" style={cardStyle}>
                <img src={addBookCard} className="card-img-top" style={imgStyle}/>
                <div className="card-body text-center">
                    <h5 style={titleStyle}>Add Book</h5>
                    <p>Add new books to library</p>
                    <button className="btn w-100" style={btnStyle}>Add</button>
                </div>
            </div>

            {/* Edit Book */}
            <div onClick={goToEditBook} className="card" style={cardStyle}>
                <img src={editBookCard} className="card-img-top" style={imgStyle}/>
                <div className="card-body text-center">
                    <h5 style={titleStyle}>Edit Books</h5>
                    <p>Edit or delete existing books</p>
                    <button className="btn w-100" style={btnStyle}>Edit</button>
                </div>
            </div>

            </div>
        </>
    );
}

const cardStyle = {
    width: "18rem",
    background: "#fff",
    borderRadius: "1rem",
    boxShadow: "0 4px 24px rgba(0,33,71,0.10)",
    border: "1.5px solid #002147",
    cursor: "pointer"
};

const imgStyle = {
    height: "140px",
    objectFit: "cover"
};

const titleStyle = {
    fontWeight: 700,
    color: "#002147"
};

const btnStyle = {
    background: "linear-gradient(90deg, #ffd700 0%, #ffb400 100%)",
    color: "#002147",
    borderRadius: "25px",
    fontWeight: 700,
    border: "none"
};

export default Library_Dashboard;
