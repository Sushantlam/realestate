import jwt from "jsonwebtoken";

export const verifyToken =(req,res, next)=> {
    const token = req.cookies.token
    console.log(token);
    if(!token) return res.status(401).json({message: "Not authenticated"})
    
   jwt.verify(token, process.env.SECRET, async(err, payload)=> {
    console.log(payload);
    if(err) return res.status(403).json({message:"Token is not valid"})

        req.userId = payload.id
        next()
   })

  

}