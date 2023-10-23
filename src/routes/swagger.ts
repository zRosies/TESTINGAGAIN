import express from "express";
import swaggerUI from "swagger-ui-express";
import { swaggerDocument } from "../swagger";
import swaggerDoc from "../swagger.json";

const router: any = express.Router();

router.use("/", swaggerUI.serve);
router.get("/", swaggerUI.setup(swaggerDoc));

export default router;
