import jwt from "jsonwebtoken";

export const verifyToken = async(req, res, next)=>{

    try {
        let token = req.header("Authorization") 

        if(!token) return res.status(403).json({message: `Access denied`})
        if(token.startswith("Bearer ")){
            token = token.slice(7, token.length).trimLeft()
        }

        const verified = jwt.verify(token, process.env.SECRET)
        req.user = verified;
        next()

    } catch (error) {
        res.status(500).json(`Authorization failed: ${error.message}`);
    }
}