import { Router } from "express";
import { projectController } from "./projects.controller";
import { authenticateUserFromCookie, authorizeRoles } from "../../api/authorization";





const router = Router()


router.get('/',projectController.getAllProject)
router.get('/:id',projectController.getSingleProject)
router.post('/',

projectController.createProject)
router.patch('/update/:id',

projectController.updateProject)
router.delete('/delete/:id',


projectController.deleteProject)

export const projectRouter = router