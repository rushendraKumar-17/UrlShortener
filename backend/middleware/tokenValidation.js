import jwt from "jsonwebtoken";
const SECRET = "@rushendra17";
const tokenValidation = (req,res,next)=>{
    const authHeader = req.headers['authorization']; 
    console.log(authHeader);
      if (!authHeader) {
         return res.status(401).json({ message: "Authorization header missing" });
      }
      else{
        const token = authHeader.split(' ')[1]; 

        if (!token) {
          return res.status(401).json({ message: "Token not found" });
        }
        try{
            const decoded = jwt.verify(token,SECRET);
            req.user = decoded;
        }
        catch(e){
            console.log(e);
            res.status(403).send("Invalid token");
        }
      }
    next();
}
export default tokenValidation;