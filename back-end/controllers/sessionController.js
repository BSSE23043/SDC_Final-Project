async function validateUserRole(req, res){
    const {webpage_role} = req.body; //webpage_role is the user role that is allowed on that webpage
    
    if (req.session.user.role == webpage_role){
        console.log("session: permission granted!");
        res.write("permission_granted");
        res.end();
    }
    else if (req.session.user.role != webpage_role){
        console.log("session: permission denied!");
        res.write("permission_denied");
        res.end();
    }
}

module.exports = {validateUserRole}