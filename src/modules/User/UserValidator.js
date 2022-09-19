import Joi from 'joi'


export class UserValidator {

    register = async (req, res, next) => {
        try {
            const schema = Joi.object().keys({
                name: Joi.string().required(),
                email:Joi.string().required(),
                password: Joi.string().required(),
                dob: Joi.date().optional(),
                role:Joi.string().required(),
            }).options({ abortEarly: false, allowUnknown: false });

            const validation = schema.validate(req.body);
            if (validation.error) {
                return res.json({statusCode:400,error:validation.error.details, errorMessage:'INVALID_DATA'})
            }
            return next();
        } catch (error) {
            console.error('# userValidator -> adduser -> catch : ', error);
          //  response.serverError(req, res, error, 'INTRENAL_SERVER');
            return res.json({statusCode:400,error:error, errorMessage:'INTRENAL_SERVER'})

        }
    }
    login = async (req, res, next) => {
        try {
            const schema = Joi.object().keys({
                email:Joi.string().required(),
                password: Joi.string().required()
            }).options({ abortEarly: false, allowUnknown: false });

            const validation = schema.validate(req.body);
            if (validation.error) {
                return res.json({statusCode:400,error:validation.error.details, errorMessage:'INVALID_DATA'})
            }
            return next();
        } catch (error) {
            console.error('# userValidator -> adduser -> catch : ', error);
          //  response.serverError(req, res, error, 'INTRENAL_SERVER');
            return res.json({statusCode:400,error:error, errorMessage:'INTRENAL_SERVER'})

        }
    }
    
}

