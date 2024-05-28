import express from  "express" 


import { verifyToken } from "../middlewares/verifyToken.js";
import { getAll, getOneUser, updateUser, deleteUser } from "../controllers/user.controller.js";


const router = express.Router();


router.get("/getAll",  getAll)
router.get("/:id", verifyToken,  getOneUser)
router.put("/:id", verifyToken,  updateUser)
router.delete("/:id", verifyToken,  deleteUser)
// router.get("/should-be-admin", shouldBeAdmin)
// router.post("/login", login)
// router.post("/logout", logout)

export default router