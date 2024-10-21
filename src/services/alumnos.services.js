import { actualizarAlumnoRepository, agregarAlumnoRepository, eliminarAlumnoRepository, getAlumnoByIdRepository, getAlumnosJoinRepository, getAlumnosRepository } from "../repository/alumnos.repository.js";

export const getAlumnosService = () => {
    try {
        return getAlumnosRepository()
    } catch (error) {
        console.error('Error en serivce', error)
        throw new Error('Error al obtener los alumnos')
    }
}

export const agregarAlumnoService = async (nuevoAlumno) => {
    try {
        const alumnoNuevo = await agregarAlumnoRepository(nuevoAlumno)

        return alumnoNuevo;

    } catch (error) {
        console.error('Error en serivce', error)
        throw new Error('Error al agregar los alumnos')
    }
}

export const getAlumnoByIdService = async (id) => {
    try {
        const alumnoEncontrado = await getAlumnoByIdRepository(id)
        return alumnoEncontrado;
        
    } catch (error) {
        console.error('Error en serivce', error)
        throw new Error('Error al obtener un alumno')
    }
}

export const eliminarAlumnoService = async (id) => {
    try {
        const alumnoEliminado = await eliminarAlumnoRepository(id)
        return alumnoEliminado;
        
    } catch (error) {
        console.error('Error en serivce', error)
        throw new Error('Error al eliminar el alumno')
    }
}

export const actualizarAlumnoService = async (id, alumno) => {
    try {
        const alumnoActualizado = await actualizarAlumnoRepository(id, alumno);
        return alumnoActualizado;
        
    } catch (error) {
        console.error('Error en serivce', error)
        throw new Error('Error al actualizar el alumno') 
    }
}

export const getAlumnosJoinService = async () =>{
    try {
        return getAlumnosJoinRepository()
    } catch (error) {
        console.error('Error en serivce', error)
        throw new Error('Error al obtener el join de alumnos')
    }
}