import Client from "../database";
export type Weapon = {
  id?: string;
  name: string;
  type: string;
  weight: number;
};

export class MythicalWeaponStore {
  async index(): Promise<Weapon[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * from mythical_weapons";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get weapons ${err}`);
    }
  }
  async show(id: string): Promise<Weapon> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * from mythical_weapons WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot get weapons ${err}`);
    }
  }
  async create(weapon: Weapon): Promise<Weapon> {
    try {
      const sql =
        "INSERT INTO mythical_weapons (name , type, weight) VALUES($1, $2, $3) RETURNING *";
      const conn = await Client.connect();

      const result = await conn.query(sql, [
        weapon.name,
        weapon.type,
        weapon.weight,
      ]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add new weapon ${name}. Error: ${err}`);
    }
  }
  async delete(id: string): Promise<Weapon> {
    try {
      const sql = "DELETE FROM mythical_weapons WHERE id=($1)";
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete weapon ${id}. Error: ${err}`);
    }
  }
}
