import jwt from "jsonwebtoken";

export const shouldBeLoggedIn =(req,res)=> {
   console.log(req.userId);

   res.status(200).json({message: "You are  authenticated"})

}


export const shouldBeAdmin =(req,res)=> {
    const token = req.cookies.token
    
    if(!token) return res.status(401).json({message: "Not authenticated"})
    
   jwt.verify(token, process.env.SECRET, async(err, payload)=> {
    console.log(payload);
    if(err) return res.status(403).json({message:"Token is not valid"})
    if(!payload.isAdmin) return res.status(403).json({message:"Youre not authorized"})
   })

   res.status(200).json({message: "You are  authenticated"})

}