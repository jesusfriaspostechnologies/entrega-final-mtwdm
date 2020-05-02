import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import {APIUtils, APIStatusEnum} from '../utils/api.utils';

// al exportar como default,cuando se importa en otro archivo se puede mandar llamar el metodo bajo cualquier nombre de variable
export default (CONFIG: any) => {
    const apiUtils = APIUtils(CONFIG);
    return{
        verify: (req:Request, res:Response, next:NextFunction) =>{
            const bearerHeader = req.headers['authorization'];
            if(typeof bearerHeader !== 'undefined'){
                const bearer = bearerHeader.split(' ');
                const bearerToken = bearer[1];

                jwt.verify(bearerToken, CONFIG.TOKEN.SECRET_KEY, (err: any, tokenDecoded: any) => {
                    if(err){
                        return res.status(APIStatusEnum.Forbidden).json(
                            apiUtils.BodyResponse(
                                APIStatusEnum.Forbidden,
                                // Descripcion
                                'Acceso prohibido al verificar el Token (Middleware Tokens)',
                                //Mensaje
                                'El Token proporcionado, no es un Token válido, favor de verificarlo',
                                //Result
                                {},
                                //Error
                                err
                            )
                        )
                    }
                    req.body.authUser = tokenDecoded;
                    next();
                });
            }else{
                // Devolver estatus Unautorized
                return res.status(APIStatusEnum.Unauthorized).json(
                    apiUtils.BodyResponse(
                        APIStatusEnum.Unauthorized,
                        // Descripcion
                        'Acceso no autorizado (Middleware Tokens)',
                        //Mensaje
                        'Necesita proporcionar un token',
                        //Result
                        {},
                        //Error
                        {},
                    )
                )
            }
        }
    }
}