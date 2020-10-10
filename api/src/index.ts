import express, { Request, Response } from "express";
import bodyParser from "body-parser";

// create express app
const app: any = express();
app.use(bodyParser.json());
const port = process.env.PORT || 8080; // default port to listen

app.get("/", (req: Request, res: Response) => {
  res.send("welcome to resumehub's api")
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
