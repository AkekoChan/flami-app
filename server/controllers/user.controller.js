import userModel from "../models/user.model.js";
import auth from "../helpers/authMiddleware.js";
import bcrypt from "bcryptjs";

const userController = {
    getProfile: (req, res) => {
        let userdata = res.locals.user;
        return res.status(200).json({ data: {
            name: userdata.name,
            email: userdata.email,
            created_at: new Date(userdata.date).toDateString()
        }});
    },
    // getAccount: (req, res) => {
        
    // },
    getBadges: (req, res) => {
        let userdata = res.locals.user;
        return res.status(200).json({ data: {
            badges: userdata.badges
        }});
    },
    updateAccount: async (req, res) => {
        let userdata = res.locals.user;
        let patchdata = req.body;

        // Re-encode password
        if(patchdata.password) patchdata.password = bcrypt.hashSync(patchdata.password, bcrypt.genSaltSync(11));

        await userModel.updateOne({_id: userdata._id}, patchdata);

        let token = auth.encode({ email: patchdata.email ?? userdata.email });
        return res.status(200).json({ message: "Informations de compte misent à jour.", data: {
            jwt: token
        }});
    }
};

export default userController;