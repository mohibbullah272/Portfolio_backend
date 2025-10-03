import { Router } from "express";
import { blogController, StatsController } from "./blogs.controller";
import { authenticateUserFromCookie, authorizeRoles } from "../../api/authorization";




const router = Router()


router.get('/',blogController.getAllBlogs)
router.get('/stats',StatsController.getStats)
router.get('/popular',blogController.getPopularBlogs)
router.get('/:id',blogController.getSingleBlog)

router.post(
    '/', 

    blogController.createBlog
  );
  
  router.patch(
    '/update/:id', 

    blogController.updateBlog
  );
  
  router.delete(
    '/delete/:id', 

    blogController.deleteBlog
  );
  
export const blogRouter = router