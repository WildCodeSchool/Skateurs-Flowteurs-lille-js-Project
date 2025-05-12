import type { RequestHandler } from "express";

// Import access to data
import {
  default as UserRepository,
  default as userRepository,
} from "./userRepository";

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
    const users = await UserRepository.readAll();

    // Respond with the users in JSON format
    res.json(users);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Récupère un user par ID
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
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
    const userId = Number(req.params.id);
    const user = await userRepository.read(userId);

    // If the user is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the user in JSON format
    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
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
 *               - title
 *               - user_id
 *             properties:
 *               title:
 *                 type: string
 *               user_id:
 *                 type: integer
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
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      xp: req.body.xp,
      isConnected: req.body.isConnected,
      default_picture: req.body.default_picture,
      profile_picture_id: req.body.profile_picture_id,
    };

    // Create the user
    const insertId = await userRepository.create(newUser);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted user
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse, read, add };
