import { getConnection, sql, queries } from '../database/index.js'

export const getAlumnosRepository = async () => {
    const pool = await getConnection();

    try {
        await pool.request().query('USE IFTS11')
        const resultado = await pool.request().query(queries.getAllAlumnos);

        //console.log(resultado.recordset.length)
        
        console.table(resultado.recordset)

        return resultado

    } catch (error) {
        console.error('Error en el repositorio: ', error)
        throw new Error('Error en la consulta a la Base de Datos');

    } finally {
        pool.close()
    }
}

export const agregarAlumnoRepository = async (nuevoAlumno) => {
    const { nombre, materia_id, turno_id, comision, debe_correlativa } = nuevoAlumno
    const pool = await getConnection();

    try {
        await pool.request().query('USE IFTS11')

        const resultado = await pool.request()
            .input('nombre', sql.NVarChar, nombre)
            .input('materia_id', sql.Int, materia_id)
            .input('turno_id', sql.Int, turno_id)
            .input('comision', sql.NVarChar, comision)
            .input('debe_correlativa', sql.Bit, debe_correlativa)
            .query(queries.agregarAlumno)

        const alumnoNuevo = { id: resultado.recordset[0].ID, nombre, materia_id, turno_id, comision, debe_correlativa }

        console.table(alumnoNuevo)

        return alumnoNuevo
    } catch (error) {
        console.error('Error en el repositorio: ', error)
        throw new Error('Error en la insercion a la Base de Datos');
    } finally {
        pool.close()
    }
}

export const getAlumnoByIdRepository = async (id) => {
    const pool = await getConnection();

    try {
        await pool.request().query('USE IFTS11')
        const alumnoEncontrado = await pool.request().input('id', sql.Int, id).query(queries.getAlumnoById)

        if (alumnoEncontrado.recordset.length == 0) {
            console.log("Alumno no encontrado");
        } else {
            console.table(alumnoEncontrado.recordset[0])
        }

        return alumnoEncontrado.recordset[0]

    } catch (error) {
        console.error('Error en el repositorio: ', error)
        throw new Error('Error al obtener el alumno de la Base de Datos');
    } finally {
        pool.close()
    }
}

export const eliminarAlumnoRepository = async (id) => {
    const pool = await getConnection();

    try {
        await pool.request().query('USE IFTS11')

        const alumnoEncontrado = await pool.request().input('id', sql.Int, id).query(queries.getAlumnoById)

        if (alumnoEncontrado.recordset.length == 0) {
            console.log("Alumno no encontrado");
        } else {
            console.log('Se eliminó el siguiente alumno de la base de datos:')
            console.table(alumnoEncontrado.recordset[0])
        }

        const alumnoEliminado = alumnoEncontrado.recordset[0]

        await pool.request().input('id', sql.Int, id).query(queries.eliminarAlumno)

        return alumnoEliminado;

    } catch (error) {
        console.error('Error en el repositorio: ', error)
        throw new Error('Error al eliminar el alumno de la Base de Datos');
    } finally {
        pool.close()
    }
}

export const actualizarAlumnoRepository = async (id, alumno) => {
    const {nombre, materia_id, turno_id, comision, debe_correlativa} = alumno
    const pool = await getConnection();

    try {
        await pool.request().query('USE IFTS11')

        const requestActualizado = pool.request().input('id', sql.Int, id)
        if (nombre != null) requestActualizado.input('nombre', sql.NVarChar, nombre)
        if (materia_id != null) requestActualizado.input('materia_id', sql.Int, materia_id)
        if (turno_id != null) requestActualizado.input('turno_id', sql.Int, turno_id)
        if (comision != null) requestActualizado.input('comision', sql.NVarChar, comision)
        if (debe_correlativa != null) requestActualizado.input('debe_correlativa', sql.Bit, debe_correlativa);

        let queryActualizada = 'UPDATE Alumnos SET ';
        if(nombre != null) queryActualizada +='nombre = @nombre, ';
        if(materia_id != null) queryActualizada +='materia_id = @materia_id, ';
        if(turno_id != null) queryActualizada +='turno_id = @turno_id, ';
        if(comision != null) queryActualizada +='comision = @comision, ';
        if(debe_correlativa != null) queryActualizada +='debe_correlativa = @debe_correlativa ';

        queryActualizada = queryActualizada.trim().replace(/,$/,'');

        queryActualizada += ' WHERE id = @id';

        const alumnoActualizado = await requestActualizado.query(queryActualizada)

        if (alumnoActualizado.rowsAffected[0] === 0) {
            return null;
        }

        return {nombre, materia_id, turno_id, comision, debe_correlativa}
        
    } catch (error) {
        console.error('Error en el repositorio: ', error)
        throw new Error('Error al actualizar el alumno');
    } finally {
        pool.close()
    }
}

export const getAlumnosJoinRepository = async () => {
    const pool = await getConnection();

    try {
        await pool.request().query('USE IFTS11')
        
        const resultadoJoin = await pool.request().query(queries.getAlumnosJoin)
        
       console.table(resultadoJoin.recordset)

        return resultadoJoin.recordset
    } catch (error) {
        console.error('Error en el repositorio: ', error)
        throw new Error('Error al obtener el Join');
    } finally {
        pool.close()
    }
}