exports.adminMiddleware = async (req, res, next) => {

  if(req.user.role === "admin") return next();

  return res.status(401).json({message:"UnAuthorized"})

  next();
}