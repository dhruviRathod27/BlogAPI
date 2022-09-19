import Joi from 'joi'


export class BlogValidator {

    addBlog = async (req, res, next) => {
        try {
            const schema = Joi.object().keys({
                title: Joi.string().required(),
                description:Joi.string().optional(),
                publised_date: Joi.date().optional(),
                modify_date: Joi.date().optional(),
                status:Joi.string().required(),
                category:Joi.string().required(),
                author:Joi.string().required()
            }).options({ abortEarly: false, allowUnknown: false });

            const validation = schema.validate(req.body);
            if (validation.error) {
                return res.json({statusCode:400,error:validation.error.details, errorMessage:'INVALID_DATA'})
            }
            return next();
        } catch (error) {
            console.error('# BlogValidator -> addblog -> catch : ', error);
          //  response.serverError(req, res, error, 'INTRENAL_SERVER');
            return res.json({statusCode:400,error:error, errorMessage:'INTRENAL_SERVER'})

        }
    }
}

