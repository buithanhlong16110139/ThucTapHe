import userService from '../services/user.Service'
import userHandler from '../handlers/user.Handler'

export default {
    async signup(req, res) {
        //console.log(req.body);
       try {
        const {
            value,
            error
        } = userService.validateSignup(req.body);
        if (error) {
            return res.send(error);
        }
        if (userService.validateConfirmPassword(req.body.password, req.body.confirmPassword) == false) {
            {
                return res.send("Xác nhận mật khẩu không chính xác");
            }
        }
        var hashedPassword = await userService.hashPassword(req.body.password);
        const result = await userHandler.createNewUser(
            req.body.fullName,
            req.body.email,
            req.body.phone,
            req.body.address,
            req.body.username,
            hashedPassword,
            req.body.age
        )
        return res.send({
            data:result,
            error:null,
            success:'Ok'
        });
       } catch (error) {
        return res.send({
            data:null,
            error:error,
            success: null
        });
       }
    }
}