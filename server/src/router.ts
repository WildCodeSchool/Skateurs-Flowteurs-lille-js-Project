import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define tricks and users-related routes
import trickAction from "./modules/tricks/trickAction";
import userAction from "./modules/users/userAction";

router.get("/api/tricks", trickAction.browse);
router.get("/api/tricks/:id", trickAction.read);

router.get("/api/users", userAction.browse);
router.get("/api/users/:id", userAction.read);
router.post("/api/users", userAction.add);
router.put("/api/users/:id", userAction.update);

/* ************************************************************************* */

export default router;
