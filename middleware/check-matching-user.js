module.exports = (req,res,next) => {
    if( req.userData.id == req.params.id){
      next();
    }else{
      res.status(401).json({error:"Authorization failed"});
    }
};
