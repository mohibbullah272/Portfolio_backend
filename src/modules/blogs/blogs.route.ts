import { Router } from "express";
import { blogController } from "./blogs.controller";




const router = Router()


router.get('/',blogController.getAllBlogs)
router.get('/:id',blogController.getSingleBlog)
router.post('/',blogController.createBlog)
router.patch('/update',blogController.updateBlog)
router.delete('/delete',blogController.deleteBlog)

export const blogRouter = router