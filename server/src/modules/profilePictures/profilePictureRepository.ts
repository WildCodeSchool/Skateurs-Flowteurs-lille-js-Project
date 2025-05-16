import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type ProfilePicture = {
  id: number;
  img: string;
  class: string;
  user_id: number;
};

class ProfilePictureRepository {
  // The C of CRUD - Create operation

  async create(profilePicture: Omit<ProfilePicture, "id">) {
    // Execute the SQL INSERT query to add a new item to the "item" table
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO profile_pictures (img, class, user_id) VALUES (?, ?, ?)",
      [profilePicture.img, profilePicture.class, profilePicture.user_id]
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await databaseClient.query<Rows>(
      `SELECT * FROM profile_pictures LIMIT 100`
    );

    // Return the first row of the result, which represents the item
    return rows[0] as ProfilePicture;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await databaseClient.query<Rows>(
      "select * from profile_pictures"
    );

    // Return the array of items
    return rows as ProfilePicture[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing item

  async update(profilePicture: Omit<ProfilePicture, "id">) {
    const [result] = await databaseClient.query<Result>(
      `
    UPDATE profile_pictures
    SET img = ?, class = ?
    WHERE user_id = ?
    `,
      [profilePicture.img, profilePicture.class, profilePicture.user_id]
    );
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an item by its ID

  // async delete(id: number) {
  //   ...
  // }
}

export default new ProfilePictureRepository();
