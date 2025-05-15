import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Trick = {
  isValidated: boolean;
  id: number;
};

class validatedTrickRepository {
  // The C of CRUD - Create operation

  async create(trick: Trick) {
    // Execute the SQL INSERT query to add a new item to the "item" table
    const [result] = await databaseClient.query<Result>(
      "insert into validated_tricks (id, is_validated) values (?, ?)",
      [trick.isValidated, trick.id]
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await databaseClient.query<Rows>(
      `SELECT U.id, U.name, U.email, U.xp, P.class, P.img, V.is_validated, V.trick_id FROM users as U LEFT JOIN profile_pictures as P ON U.id = P.user_id LEFT JOIN validated_tricks as V ON U.id = V.user_id WHERE V.id = ?`,
      [id]
    );
    const trick: Trick = {
      id: rows[0].id,
      isValidated: rows[0].isValidated,
    };
    console.log([rows]);
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

  async update(trick: Trick) {
    const [result] = await databaseClient.query<Result>(
      `
    UPDATE trick
    SET isValidated = ?, id = ?
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
