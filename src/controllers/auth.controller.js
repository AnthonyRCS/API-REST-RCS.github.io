import db from "../conexdb.js";
import jwt from "jsonwebtoken";
import {encryptPassword} from "../models/user.js";
import { validarContraseña } from "../models/user.js";
import { comparePassword } from "../models/user.js";
import {JWT_SECRET} from "../app.js";
const pool = db;

export const signUp = async (req, res) => {
  const { NOMBRE_USUARIO, CONTRASENA_USUARIO, ID_TIPO_USUARIO } = req.body;

  if (!NOMBRE_USUARIO ||!CONTRASENA_USUARIO) {
    return res.status(400).json("Faltan datos");
  }
  if (!validarContraseña(CONTRASENA_USUARIO)) {
    return res.status(400).json({ message: "La contraseña debe tener al menos 8 caracteres, contener al menos un número, una letra minúscula y una letra mayúscula." });

  }

  try {
    const results = await pool.query(
      'SELECT COUNT(*) as count FROM TIPO_USUARIO WHERE ID_TIPO_USUARIO=?',
      [ID_TIPO_USUARIO]
    );

    const count = results[0].count;

    let newUser;
    if (count === 1) {
      newUser = {
        NOMBRE_USUARIO,
        CONTRASENA_USUARIO: await encryptPassword(CONTRASENA_USUARIO),
        ESTADO: 'activo',
        ID_TIPO_USUARIO,
      };
    } else {
      newUser = {
        NOMBRE_USUARIO,
        CONTRASENA_USUARIO: await encryptPassword(CONTRASENA_USUARIO),
        ESTADO: 'activo',
        ID_TIPO_USUARIO: 5,
      };
    }

    const result = await pool.query('INSERT INTO USUARIO SET ?', [newUser]);

    const payload = {
      user: {
        id: result.insertId,
      },
    };

    jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) {
        console.error(err.message);
        return res.status(500).send("Server Error");
      }
      return res.json({ token });
    });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ msg: 'El usuario ya existe.' });
    }
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
};



export const signIn = async(req, res) =>{
  const { NOMBRE_USUARIO, CONTRASENA_USUARIO} = req.body;

  try {
    const results = await pool.query("SELECT * FROM USUARIO WHERE NOMBRE_USUARIO = ?", [
      NOMBRE_USUARIO,
    ]);
    const user = results[0];
    

    if (!user) {
      return res.status(401).json({ msg: "Credenciales inválidas" });
    }

    const validPassword = await comparePassword(
      CONTRASENA_USUARIO,
      user.CONTRASENA_USUARIO
    );

    if (!validPassword) {
      return res.status(401).json({ msg: "Credenciales inválidas" });
    }

    const payload = {
      user: {
        ID_USUARIO: user.ID_USUARIO,
        NOMBRE_USUARIO: user.NOMBRE_USUARIO
      },
    };

    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        console.log(`Token generado: ${token}`, payload);
        res.status(200).json({ token });
      }
    );
    
    
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en el servidor");
  }
};
