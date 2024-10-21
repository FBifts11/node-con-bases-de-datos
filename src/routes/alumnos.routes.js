import { Router } from "express";
import { actualizarAlumnoController, agregarAlumnoController, eliminarAlumnoController, getAlumnoByIdController, getAlumnosJoinController, getAlumosController } from "../controllers/alumnos.controller.js";

const router = Router()

router.get('/alumnos', getAlumosController)
router.post('/alumnos', agregarAlumnoController)
router.get('/alumnos/:id', getAlumnoByIdController)
router.delete('/alumnos/:id', eliminarAlumnoController)
router.put('/alumnos/:id', actualizarAlumnoController)
router.get('/alumnosjoin', getAlumnosJoinController)

export default router