import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type User = {
  id: number;
  name: string;
  email: string;
  xp: number;
};

type Trick = {
  isValidated: boolean;
  id: number;
};

type UserData = {
  id: number;
  name: string;
  email: string;
  xp: number;
  img: string;
  class: string;
  tricks: Trick[];
};

class UserRepository {
  // The C of CRUD - Create operation

  async create(user: Omit<User, "id">) {
    // Execute the SQL INSERT query to add a new item to the "item" table
    const [result] = await databaseClient.query<Result>(
      "insert into users (name, email, xp) values (?, ?, ?)",
      [user.name, user.email, user.xp ?? 0]
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(email: string) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await databaseClient.query<Rows>(
      `SELECT U.id, U.name, U.email, U.xp, P.class, P.img, V.is_validated, V.trick_id FROM users as U LEFT JOIN profile_pictures as P ON U.id = P.user_id LEFT JOIN validated_tricks as V ON U.id = V.user_id WHERE U.email = ?`,
      [email]
    );
    const user: UserData = {
      id: rows[0].id,
      name: rows[0].name,
      email: rows[0].email,
      xp: rows[0].xp,
      img: rows[0].img,
      class: rows[0].class,
      tricks: [],
    };

    if (rows.length > 1) {
      rows.map((row) => {
        user.tricks.push({
          isValidated: row.is_validated === 1 ? true : false,
          id: row.trick_id,
        });
      });
    }
    // Return the first row of the result, which represents the item
    return user as User;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await databaseClient.query<Rows>("select * from users");

    // Return the array of items
    return rows as User[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing item

  async update(user: User) {
    const [result] = await databaseClient.query<Result>(
      `
    UPDATE users
    SET name = ?, email = ?, xp = ?
    WHERE id = ?
    `,
      [user.name, user.email, user.xp, user.id]
    );
    return result.affectedRows === 1;
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an item by its ID

  // async delete(id: number) {
  //   ...
  // }
}

export default new UserRepository();
