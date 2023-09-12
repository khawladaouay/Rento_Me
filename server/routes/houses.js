import express from "express";
import upload  from "../multer.js";
import House from "../models/House.js"
import { createError } from "../utils/error.js";
import { verifyAdmin} from "../utils/verifyToken.js"
import { countByCity, countByType, createHouse, deleteHouse, getHouse, getUserHouses, getHouses, updateHouse } from "../controllers/house.js";
const router = express.Router();

//CREATE
router.post('/', upload.array('images'), verifyAdmin, createHouse)

//UPDATE
router.put("/:id", verifyAdmin, updateHouse);

//DELETE
router.delete("/:id", verifyAdmin, deleteHouse);
//GET
router.get("/find/:id",  getHouse);
//GET USER HOUSES
router.get("/userHouse/:id", getUserHouses);
//GET ALL
router.get("/", getHouses);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);

export default router;
