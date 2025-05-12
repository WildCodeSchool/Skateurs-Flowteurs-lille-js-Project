import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define tricks and users-related routes
import trickAction from "./modules/item/trickAction";
import userAction from "./modules/item/userAction";

router.get("/api/tricks", trickAction.browse);
router.get("/api/tricks/:id", trickAction.read);

router.get("/api/users", userAction.browse);
router.get("/api/users/:id", userAction.read);
router.post("/api/users", userAction.add);

/* ************************************************************************* */

export default router;
