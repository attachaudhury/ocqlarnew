module.exports = (roles) =>
{
    return (req,res,next)=>{
        try{
            const userrole = req.cookies['userrole'];
            if(roles.includes(userrole))
            {
                req.userrole=userrole;
                next()
            }
            else{
                res.redirect('/home/index')
            }
        }catch(err){
             res.redirect('/home/index')
        }
    }
} 