import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_ERROR,
    PRODUCTO_ELIMINADO_EXITO,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR
} from '../types';

import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

//Crear nuevos productos
export function crearNuevoProductoAction(producto) {
    return async (dispatch) => {
        dispatch(agregarProducto());

        try {

            //Insertar en la API
            await clienteAxios.post('/productos', producto);

            //Si todo sale bien, actualizar el state
            dispatch(agregarProductoExito(producto));

            //Alerta
            Swal.fire(
                'Correcto',
                'El producto se agregó correctamente',
                'success'
            )

        } catch (error) {
            console.log(error);

            //Si hay un error cambiar el state
            dispatch(agregarProductoError(true));
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'hubo un error, intenta de nuevo'
            })
        }
    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true,
});

//Si el producto se guarda en la base de datos
const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
});

//Si har un error
const agregarProductoError = estado => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
});


//Funcion que descarga los productos de la base de datos
export function obtenerProductosAction() {
    return async (dispatch) => {
        dispatch(descargarProductos());

        try {
            const respuesta = await clienteAxios.get('/productos');
            dispatch(descargaProductosExitosa(respuesta.data));
        } catch (error) {
            console.log(error)
            dispatch(descargaProductosError());
        }
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
});

const descargaProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
});

const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
});

//Selecciona y elimina el producto
export function borrarProductoAction(id) {
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id));
        try {
            await clienteAxios.delete(`/productos/${id}`);
            dispatch(eliminarProductoExito());
            //Si se elimina mostrar alerta
            //Alerta
            Swal.fire(
                'Eliminado',
                'El producto se eliminó correctamente',
                'success'
            )
        } catch (error) {
            console.log(error);
            dispatch(eliminarProductoError());
        }
    }
}

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
});

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO
});

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
});

//Colocar producto en edición
export function obtenerProductoEditar(producto) {
    return (dispatch) => {
        dispatch(obtenerProductoEditarAction(producto))
    }
}

const obtenerProductoEditarAction = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})

//Edita un registro en la api y state
export function editarProductoAction(producto) {
    return async (dispatch) => {
        dispatch(editarProducto(producto));
        try {
            const resultado = await clienteAxios.put(`/productos/${producto.id}`, producto);
            console.log(resultado);
        } catch (error) {

        }
    }
}

const editarProducto = producto => ({
    type: COMENZAR_EDICION_PRODUCTO,
    payload: producto
})