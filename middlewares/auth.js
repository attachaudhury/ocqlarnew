module.exports=(req,res,next)=>{
    try{
        const userid = req.cookies['userid'];
        if(userid!=undefined)
        {
            req.userid=userid;
            next()
        }
        else{
            res.redirect('/home/index')
        }
    }catch(err){
        return res.redirect('/home/index')
    }
}