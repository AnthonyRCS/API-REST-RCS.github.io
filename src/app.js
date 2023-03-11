import Express from "express";
import morgan from "morgan";
import cors from "cors";
import { readFile } from 'fs/promises';
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import dotenv from 'dotenv';



//import routes from
import productosRuoters from "./routers/products.routes.js"
import authRouters from './routers/auth.routes.js'
import userRouters from './routers/user.routes.js'

const __dirname = dirname(fileURLToPath(import.meta.url));

// "Inicializacion"
const app= Express()
dotenv.config();
export const JWT_SECRET = process.env.JWT_SECRET;
//Configuracion para package.json
const data = await readFile('./package.json', 'utf-8');
const pkg = JSON.parse(data);

//Middlewares
app.use(morgan('dev'))
app.get('/',(req,res)=>{
    res.json({
        name:pkg.name,
        author:pkg.author,
        version:pkg.version
    })
})
app.use(cors());
app.use(Express.json());

//Public
app.use(Express.static(join(__dirname, "public")));

//Routes
app.use('/api/products',productosRuoters);
app.use('/api/auth',authRouters);
app.use('/api/user',userRouters);




export default app;