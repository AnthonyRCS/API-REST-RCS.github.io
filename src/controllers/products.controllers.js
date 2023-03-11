import db from "../conexdb.js";
const pool = db;
export const createProduct = async(req,res)=>{
    const {
    NOMBRE_PRODUCTO,
    FECHA_ELABORACION_PRODUCTO,
    FECHA_VENCIMIENTO_PRODUCTO,
    COMPRA_PRODUCTO,
    VENTA_PRODUCTO,
    CANTIDAD_PRODUCTO,
    DESCRIPCION_PRODUCTO,
    IMAGENURL,
    ESTADO,
    ID_TIPO_PRODUCTO,
    ID_SUCURSAL_PRODUCTO,
    } = req.body;
    const newProducto=({
        NOMBRE_PRODUCTO,
        FECHA_ELABORACION_PRODUCTO,
        FECHA_VENCIMIENTO_PRODUCTO,
        COMPRA_PRODUCTO,
        VENTA_PRODUCTO,
        CANTIDAD_PRODUCTO,
        DESCRIPCION_PRODUCTO,
        IMAGENURL,
        ESTADO,
        ID_TIPO_PRODUCTO,
        ID_SUCURSAL_PRODUCTO,
    })
    await pool.query("INSERT INTO producto set?", [newProducto]);
    res.json('create product')
}
export const getProducts = async(req,res)=>{
    const listarProductos =await pool.query('SELECT*FROM producto')
    //console.log(listarProductos)
    res.json(listarProductos)
}
export const getProductByid =async(req,res)=>{
    const{productId} = req.params;
    const listarProductosID =await pool.query('SELECT*FROM producto WHERE ID_PRODUCTO=?',[productId]);
    res.json(listarProductosID)
    
}
export const updateProductByid = async(req,res)=>{
    const{productId} = req.params;
    const{NOMBRE_PRODUCTO,
        FECHA_ELABORACION_PRODUCTO,
        FECHA_VENCIMIENTO_PRODUCTO,
        COMPRA_PRODUCTO,
        VENTA_PRODUCTO,
        CANTIDAD_PRODUCTO,
        DESCRIPCION_PRODUCTO,
        IMAGENURL,
        ESTADO,
        ID_TIPO_PRODUCTO,
        ID_SUCURSAL_PRODUCTO}=req.body;
    const editProducto={
        NOMBRE_PRODUCTO,
    FECHA_ELABORACION_PRODUCTO,
    FECHA_VENCIMIENTO_PRODUCTO,
    COMPRA_PRODUCTO,
    VENTA_PRODUCTO,
    CANTIDAD_PRODUCTO,
    DESCRIPCION_PRODUCTO,
    IMAGENURL,
    ESTADO,
    ID_TIPO_PRODUCTO,
    ID_SUCURSAL_PRODUCTO,
    }
    //console.log(editProducto)
    await pool.query('UPDATE producto SET ? WHERE ID_PRODUCTO=?',[editProducto,productId]);
  
    res.json('update product')
    
}