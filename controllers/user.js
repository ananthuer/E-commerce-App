const userInterface = require('../interfaces/user')


exports.updateUser =  async (req, res, next) =>{
    const existingUser = await userInterface.updateUser(
        req.user.id,
        req.body.name,
        req.body.location,
        req.body.role
    );
     
    if (existingUser == null) {
        return res.json({
            success: false,
            message: "User not found"
        })
    }
    

    res.json({
        success: true,
        user: existingUser
    })
}

exports.getUser =   async(req, res, next) =>{
    const existingUser = await userInterface.getUser(req.user.id);
     

    res.json({
        success: true,
        user: existingUser
    })
}
