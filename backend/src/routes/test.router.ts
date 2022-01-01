import express, { Request, Response } from 'express';

const router = express.Router();

router.get("/test/helloworld", (req: Request, res: Response) =>
  res.send("<h1>Hello World</h1>")
);
router.get("/test/query", (req: Request, res: Response) => {
  let params = req.query;
  res.json(params);
});

export {router as testRouter}