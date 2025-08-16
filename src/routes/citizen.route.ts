import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import CitizenRepository from "../repositories/citizen.repository";
import CitizenService from "../services/citizen.service";
import CitizenController from "../controllers/citizen.controller";
import exp from "constants";

const router = Router();

const prisma = new PrismaClient();
const citizenRepository = new CitizenRepository(prisma);
const citizenService = new CitizenService(citizenRepository);
const citizenController = new CitizenController(citizenService);

router.post("/", (req, res, next) =>
  citizenController.createCitizen(req, res, next)
);
router.get("/", (req, res, next) =>
  citizenController.getAllCitizens(req, res, next)
);
router.get("/:idCitizen", (req, res, next) =>
  citizenController.getCitizenById(req, res, next)
);
router.put("/:idCitizen", (req, res, next) =>
  citizenController.updateCitizen(req, res, next)
);
router.delete("/:idCitizen", (req, res, next) =>
  citizenController.deleteCitizen(req, res, next)
);

export default router;
