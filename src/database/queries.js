export default {
    getAllAlumnos : 'SELECT * FROM Alumnos',
    agregarAlumno: 'INSERT INTO Alumnos (nombre, materia_id, turno_id, comision, debe_correlativa) OUTPUT INSERTED.ID VALUES (@nombre, @materia_id, @turno_id, @comision, @debe_correlativa)',
    getAlumnoById: 'SELECT * FROM Alumnos WHERE ID = @ID',
    eliminarAlumno: 'DELETE FROM Alumnos WHERE ID = @ID',
    getAlumnosJoin: `SELECT
     a.ID,
     a.NOMBRE,
     m.NOMBRE AS MATERIA,
     t.NOMBRE    AS TURNO,
     a.COMISION,
     CASE
        WHEN DEBE_CORRELATIVA = 1 THEN 'Si'
        ELSE 'No'
        END AS DEBE_CORRELATIVA
    FROM Alumnos a
    JOIN 
    TURNOS t ON a.turno_id = t.id
    JOIN
    MATERIAS m ON a.materia_id = m.id`
}