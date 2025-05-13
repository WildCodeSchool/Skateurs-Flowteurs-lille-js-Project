import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define tricks and users-related routes
import profilePictureAction from "./modules/profilePictures/profilePictureAction";
import trickAction from "./modules/tricks/trickAction";
import userAction from "./modules/users/userAction";

router.get("/api/tricks", trickAction.browse);
router.get("/api/tricks/:id", trickAction.read);

router.get("/api/users", userAction.browse);
router.post("/api/users", userAction.add);
router.get("/api/users/:email", userAction.read);
router.put("/api/users/:id", userAction.update);

router.get("/api/profilePictures", profilePictureAction.browse);
router.post("/api/profilePictures", profilePictureAction.add);
router.get("/api/profilePictures/:id", profilePictureAction.read);
router.put("/api/profilePictures/:id", profilePictureAction.update);

/* ************************************************************************* */

export default router;
