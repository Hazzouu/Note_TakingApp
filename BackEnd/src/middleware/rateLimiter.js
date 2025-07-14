import rateLimit from "../config/upstash.js";

 const rateLimiter = async (req, res, next) => {
    try {
        const {success} = await rateLimit.limit("ratelimit_key"); //req.ip is the ip address of the client
        if(!success){
            return res.status(429).json({message: "Too many requests"});
        }
    } catch (error) {
        console.error("RateLimit error",error);
        return res.status(500).json({message: "Internal server error"});
    }
    next();
};


export default rateLimiter;


