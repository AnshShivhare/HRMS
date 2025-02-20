import jwt from "jsonwebtoken";

export class auth {

    verifyToken(req, res, next){
        console.log(req.headers.token)
        const token = req.headers.token;
        if (!token) return res.status(401).json({ error: 'Access denied' });
        try {
          const verified = jwt.verify(token, 'jwtsecret');
          req.user = verified;
          next();
        } catch (err) {
          res.status(400).json({ error: 'Invalid token' });
        }
      }
      
}

export default new auth();