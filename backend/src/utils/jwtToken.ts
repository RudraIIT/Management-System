const sendToken = (user: any,statusCode: number,res: any) => {
    const token = user.getJWTToken();
    const options = {
        expires: new Date(Date.now() + 30*24*60*60*1000),
        httpOnly: true,
        sameSite: 'None',
    }
    res.status(statusCode).cookie("token",token,options).json({
        success: true,
        token,
        user,
    })
}

export default sendToken;