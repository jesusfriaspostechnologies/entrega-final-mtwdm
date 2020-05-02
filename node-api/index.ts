// Express Imports
import Express from 'express';
import { Request, Response } from 'express'
// Debug and Color Imports
import { DEBUG, COLOR } from './utils/debug';
// API Utils Import
import { APIUtils, APIStatusEnum } from './utils/api.utils';
// JsonWebTokens Import
import jwt from 'jsonwebtoken';
// Acceder a las variables de entorno
import ENV from './environments/env.production'
// JSON Web Tokens Middleware
import GrilloColega from './middlewares/middleware_profe';
const token = GrilloColega(ENV);
// MongoDB Helper Import
import MongoDBHelper from './helpers/mongodb.helper';
import MongoDBClient from 'mongodb';


// Variables Declaration
const debug = DEBUG();
const color = COLOR();
const app = Express();
const apiUtils = APIUtils(ENV);
const mongodb = MongoDBHelper.getInstance(ENV);

app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());
// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Routes
app.post('/login', (req: Request, res: Response) => {

    console.log('BODY: ', req.body);

    const { userName, password } = req.body;
    const mockUser = {
        fullName: 'Francisco Jesus Frias Lopez',
        userName: 'jesus',
        password: 'jesus',
        email: 'jesusfriasmx@hotmail.com'
    }
    const mockRoles = ['Capture_Rol', 'Admon_Catalogs_Rol', 'Print_Rol']
    // Validar usuario y contraseña
    if (userName == mockUser.userName && password == mockUser.password) {
        // Build Payload
        const payload = {
            fullName: mockUser.fullName,
            userName: mockUser.userName,
            email: mockUser.email,
            roles: mockRoles
        }
        // Generar el Token para ese usuario
        jwt.sign(payload, ENV.TOKEN.SECRET_KEY, { expiresIn: ENV.TOKEN.EXPIRES }, (err, token) => {
            // Existe Error
            if (err) {
                return res.status(500).json(
                    apiUtils.BodyResponse(
                        APIStatusEnum.Internal_Server_Error,
                        'Internal Server Error',
                        'Error al intentar crear el Token',
                        null,
                        err
                    )
                )
            }

            // OK
            res.status(200).json(
                apiUtils.BodyResponse(
                    APIStatusEnum.Success,
                    'OK',
                    'Token generado de forma correcta',
                    {
                        userName: mockUser.userName,
                        token
                    },
                    null
                )
            )
        });
    }
    else {
        res.status(403).json(
            apiUtils.BodyResponse(
                APIStatusEnum.Forbidden,
                'La solicitud fue legal, pero el servidor rehúsa responderla dado que el cliente no tiene los privilegios para realizarla',
                'Credenciales Invalidas. El usuario y/o contraseña proporcionados no son válidos. Favor de verificar.',
                {
                    msg: 'Invalid Credentials'
                },
                null
            )
        )
    }
});

// para uso de tokens
//app.get('/products', token.verify, async(req: Request, res: Response) => {
app.get('/products', async(req: Request, res: Response) => {

    const productos = await mongodb.db.collection('cars').find({}).toArray();
    console.log('API-Productos: ', productos);

    res.status(200).json(
        apiUtils.BodyResponse(
            APIStatusEnum.Success, 'OK', 'La solicitud ha tenido éxito',
            {
                productos,
                authUser: req.body.authUser
            }
        )
    );

});

app.get('/product/:id', async(req: Request, res: Response) => {

    const {id} = req.params;
    const _id = new MongoDBClient.ObjectID(id);

    const productos = await mongodb.db.collection('cars').find({_id}).toArray();
    console.log('API-Productos: ', productos);

    res.status(200).json(
        apiUtils.BodyResponse(
            APIStatusEnum.Success, 'OK', 'La solicitud ha tenido éxito',
            {
                productos,
                authUser: req.body.authUser
            }
        )
    );
});


app.get('/products/:categoria', async(req: Request, res: Response) => {

    const {categoria} = req.params
    //const productos= await mongodb.db.collection('cars').find({categoria}).toArray()
    const productos= await mongodb.db.collection('cars').find({"categoria":{$regex:categoria,"$options" : "i"}}).toArray()
    
    res.status(200).json(
       apiUtils.BodyResponse(
           APIStatusEnum.Success,'OK','La solicitud ha tenido exito',
           {
                productos,
                authUser:req.body.authUser 
           }
       )
    );

});


app.get('/descripcion/:descripcion', async(req: Request, res: Response) => {

    const {descripcion} = req.params
    const productos= await mongodb.db.collection('cars').find({"descripcion":{$regex:descripcion,"$options" : "i"}}).toArray()
    
    res.status(200).json(
       apiUtils.BodyResponse(
           APIStatusEnum.Success,'OK','La solicitud ha tenido exito',
           {
                productos,
                authUser:req.body.authUser
           }
       )
    );

});

app.get('/codigo/:codigo', async(req: Request, res: Response) => {

    const {codigo} = req.params
    const productos= await mongodb.db.collection('cars').find({codigo}).toArray()
    
    res.status(200).json(
       apiUtils.BodyResponse(
           APIStatusEnum.Success,'OK','La solicitud ha tenido exito',
           {
                productos,
                authUser:req.body.authUser
           }
       )
    );

});




// Start Express Server
app.listen(ENV.API.PORT, async() => {
    // Conectando con MongoDB
    try{
        await mongodb.connect();
    }catch(error){
        process.exit();
    }
    debug.express(`El servidor ${color.express('Express')} se inicio ${color.warning('correctamente')} en el puerto ${color.info(ENV.API.PORT)}`);
});
