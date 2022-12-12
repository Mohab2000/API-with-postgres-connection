import express, { Request, Response } from "express";
import { Weapon, MythicalWeaponStore } from "../models/mythical_weapon";

const store = new MythicalWeaponStore();

const index = async (req: Request, res: Response) => {
  const weapons = await store.index();
  res.json(weapons);
};
const show = async (req: Request, res: Response) => {
  const article = await store.show(req.body.id);
  res.json(article);
};
const create = async (req: Request, res: Response) => {
  try {
    const weapon: Weapon = {
      name: req.body.name,
      type: req.body.type,
      weight: req.body.weight,
    };

    const newBook = await store.create(weapon);
    res.json(newBook);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.body.id);
  res.json(deleted);
};
const mythicalWeaponsRoutes = (app: express.Application) => {
  app.get("/mythical-weapons", index);
  app.get("/mythical-weapons/:id", show);
  app.post("/mythical-weapons", create);
  app.delete("/articles", destroy);
};
export default mythicalWeaponsRoutes;
