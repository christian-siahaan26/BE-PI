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

router.post("/", (req, res) => citizenController.createCitizen(req, res));

export default router
