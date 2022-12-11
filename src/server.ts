import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mythical_weapon_routes from "./handlers/mythical_weapon";

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

const corsOptions = {
  origin: "http://someotherdomain.com",
  optionSucessStatus: 200,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

mythical_weapon_routes(app);

app.get("/test-cors", cors(), function (req, res, next) {
  res.json({ msg: "This is CORRS-enabled with a middle ware" });
});

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
