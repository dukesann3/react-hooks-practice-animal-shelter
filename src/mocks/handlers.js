import { rest } from "msw";
import { getAll, getByType } from "./data";

let pets = getAll();

export const handlers = [
  rest.get("http://localhost:3001/pets", (req, res, ctx) => {
    const type = req.url.searchParams.get("type");
    if (type) {
      return res(ctx.json(getByType(type)));
    }
    return res(ctx.json(getAll()));
  }),
  rest.patch("http://localhost:3001/pets/:id", (req, res, ctx) => {
    const { id } = req.params;
    const isAdopted = req.json()
    .then((response) => {
      return response.isAdopted;
    });
    const pet = pets.find((p) => p.id === id);
    if (!pet) {
      return res(ctx.status(404), ctx.json({ message: "Invalid ID" }));
    }
    pet.isAdopted = isAdopted;
    return res(ctx.json(pet));
  }),
];
