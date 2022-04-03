import express from "express";
import cors from "cors";

export class App {
  public server = express();
  public dirname: string;
  public code?: string;

  constructor(dirname: string) {
    this.dirname = dirname;
    this.server.use(cors());
  }

  public createServer() {
    this.server.get("/getCode", (req, res) => {
      res.json({
        code: this.code,
      });
    });

    this.server.get("/callback", (req, res) => {
      this.code = req.query.code as string;

      res.set("Content-Type", "text/html");
      res.send(Buffer.from("<script>window.close()</script>"));
    });

    this.server.listen(8080);
  }

  public stopServer() {
    this.server.removeAllListeners();
  }
}
