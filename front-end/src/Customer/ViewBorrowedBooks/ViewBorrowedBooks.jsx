import Navbar from "../../Nav/Navbar";

function Customer_ViewBorrowedBooks(){
    return(
        <>
            <Navbar pageType = "Current Books Borrowed" />
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Book Title</th>
                    <th scope="col">Author</th>
                    <th scope="col">Borrow Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

export default Customer_ViewBorrowedBooks;