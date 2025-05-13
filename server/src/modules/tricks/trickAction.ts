import type { RequestHandler } from "express";

// Import access to data
import trickRepository from "./trickRepository";

/**
 * @swagger
 * tags:
 *   name: Tricks
 *   description: Gestion des tricks
 */

// The B of BREAD - Browse (Read All) operation
/**
 * @swagger
 * /api/tricks:
 *   get:
 *     summary: Liste tous les tricks
 *     tags: [tricks]
 *     responses:
 *       200:
 *         description: Liste de tous les tricks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               tricks:
 *                 $ref: '#/components/schemas/trick'
 */
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all tricks
    const tricks = await trickRepository.readAll();

    // Respond with the tricks in JSON format
    res.json(tricks);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
/**
 * @swagger
 * /api/tricks/{id}:
 *   get:
 *     summary: Récupère un trick par ID
 *     tags: [tricks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'trick à récupérer
 *     responses:
 *       200:
 *         description: trick trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/trick'
 *       404:
 *         description: trick non trouvé
 */
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific trick based on the provided ID
    const trickId = Number(req.params.id);
    const trick = await trickRepository.read(trickId);

    // If the trick is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the trick in JSON format
    if (trick == null) {
      res.sendStatus(404);
    } else {
      res.json(trick);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
/**
 * @swagger
 * /api/tricks:
 *   post:
 *     summary: Crée un nouvel trick
 *     tags: [tricks]
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
 *         description: trick créé
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
    // Extract the trick data from the request body
    const newTrick = {
      name: req.body.name,
      video: req.body.video,
      level: req.body.level,
      xp: req.body.xp,
      isValidated: req.body.isValidated,
    };

    // Create the trick
    const insertId = await trickRepository.create(newTrick);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted trick
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse, read, add };
