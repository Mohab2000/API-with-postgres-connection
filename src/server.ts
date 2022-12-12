import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mythicalWeaponsRoutes from "./handlers/mythical_weapon";

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

const corsOptions = {
  origin: "http://someotherdomain.com",
  optionSucessStatus: 200,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

// app.get("/", function (req: Request, res: Response) {
//   res.send("Hello World!");
// });

mythicalWeaponsRoutes(app);

// app.get("/test-cors", cors(), function (req, res, next) {
//   res.json({ msg: "This is CORRS-enabled with a middle ware" });
// });

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
