import type { RequestHandler } from "express";

// Import access to data
import { default as profilePictureRepository } from "./profilePictureRepository";

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestion des users
 */

// The B of BREAD - Browse (Read All) operation
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Liste tous les users
 *     tags: [users]
 *     responses:
 *       200:
 *         description: Liste de tous les users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *                users:
 *                 $ref: '#/components/schemas/user'
 */
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all users
    const profilePictures = await profilePictureRepository.readAll();

    // Respond with the users in JSON format
    res.json(profilePictures);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
/**
 * @swagger
 * /api/users/{email}:
 *   get:
 *     summary: Récupère un user par ID
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'user à récupérer
 *     responses:
 *       200:
 *         description: user trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *       404:
 *         description: user non trouvé
 */
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific user based on the provided ID
    const profilePictureId = Number(req.params.id);
    const profilePicture = await profilePictureRepository.read(
      profilePictureId
    );

    // If the user is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the user in JSON format
    if (profilePicture == null) {
      res.sendStatus(404);
    } else {
      res.json(profilePicture);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crée un nouveau user
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - xp
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               xp:
 *                 type: number
 *     responses:
 *       201:
 *         description: user créé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 insertId:
 *                   type: integer
 */
const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the user data from the request body
    const newProfilePicture = {
      img: req.body.img,
      class: req.body.class,
      user_id: req.body.user_id,
    };
    console.log(newProfilePicture);
    // Create the user
    const insertId = await profilePictureRepository.create(newProfilePicture);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted user
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const update: RequestHandler = async (req, res, next) => {
  try {
    const profilePictureId = Number(req.params.id);

    const updatedProfilePicture = {
      id: req.body.id,
      img: req.body.img,
      class: req.body.class,
      user_id: req.body.user_id,
    };

    const profilePictureUpdate = await profilePictureRepository.update(
      updatedProfilePicture
    );

    res.status(200).json({ profilePictureUpdate });
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, update };
