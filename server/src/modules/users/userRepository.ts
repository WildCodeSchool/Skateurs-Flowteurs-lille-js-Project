import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type User = {
  id: number;
  name: string;
  email: string;
  xp: number;
  isConnected: boolean;
  default_picture: string;
  profile_picture_id: number;
};

class UserRepository {
  // The C of CRUD - Create operation

  async create(user: Omit<User, "id">) {
    // Execute the SQL INSERT query to add a new item to the "item" table
    const [result] = await databaseClient.query<Result>(
      "insert into users (name, email, xp, isConnected, default_picture, profile_picture_id) values (?, ?, ?, ?, ?, ?)",
      [
        user.name,
        user.email,
        user.xp,
        user.isConnected,
        user.default_picture,
        user.profile_picture_id,
      ]
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from users where id = ?",
      [id]
    );

    // Return the first row of the result, which represents the item
    return rows[0] as User;
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
    SET name = ?, email = ?, xp = ?, isConnected = ?, default_picture = ?, profile_picture_id = ?
    WHERE id = ?
    `,
      [
        user.name,
        user.email,
        user.xp,
        user.isConnected,
        user.default_picture,
        user.profile_picture_id,
        user.id,
      ]
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
