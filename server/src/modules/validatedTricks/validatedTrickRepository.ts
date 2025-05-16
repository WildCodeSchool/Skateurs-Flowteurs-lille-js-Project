import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Trick = {
  id: number;
  isValidated: boolean;
  trickId: number;
  userId: number;
};

class validatedTrickRepository {
  // The C of CRUD - Create operation

  async create(trick: Omit<Trick, "id">) {
    // Execute the SQL INSERT query to add a new item to the "item" table
    const [result] = await databaseClient.query<Result>(
      "insert into validated_tricks (trick_id, is_validated, user_id) values (?, ?, ?)",
      [trick.trickId, trick.isValidated, trick.userId]
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(trickId: number, userId: number) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await databaseClient.query<Rows>(
      `SELECT * FROM validated_tricks WHERE trick_id = ? and user_id = ?`,
      [trickId, userId]
    );
    // Return the first row of the result, which represents the item
    return rows[0] as Trick;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await databaseClient.query<Rows>(
      "select * from validated_tricks"
    );

    // Return the array of items
    return rows as Trick[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing item

  async update(trick: Omit<Trick, "userId, trickId">) {
    const [result] = await databaseClient.query<Result>(
      `
    UPDATE validated_tricks
    SET is_validated = ?
    WHERE id = ?
    `,
      [trick.isValidated, trick.id]
    );
    return result.affectedRows === 1;
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an item by its ID

  // async delete(id: number) {
  //   ...
  // }
}

export default new validatedTrickRepository();
