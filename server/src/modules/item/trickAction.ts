import type { RequestHandler } from "express";

// Import access to data
import trickRepository from "./trickRepository";

/**
 * @swagger
 * tags:
 *   name: Items
 *   description: Gestion des items
 */

// The B of BREAD - Browse (Read All) operation
/**
 * @swagger
 * /api/items:
 *   get:
 *     summary: Liste tous les items
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: Liste de tous les items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 */
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all items
    const items = await trickRepository.readAll();

    // Respond with the items in JSON format
    res.json(items);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
/**
 * @swagger
 * /api/items/{id}:
 *   get:
 *     summary: Récupère un item par ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'item à récupérer
 *     responses:
 *       200:
 *         description: Item trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       404:
 *         description: Item non trouvé
 */
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific item based on the provided ID
    const trickId = Number(req.params.id);
    const trick = await trickRepository.read(trickId);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
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
 * /api/items:
 *   post:
 *     summary: Crée un nouvel item
 *     tags: [Items]
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
 *         description: Item créé
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
    // Extract the item data from the request body
    const newTrick = {
      name: req.body.name,
      video: req.body.video,
      level: req.body.level,
      xp: req.body.xp,
      isValidated: req.body.isValidated,
    };

    // Create the item
    const insertId = await trickRepository.create(newTrick);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse, read, add };
