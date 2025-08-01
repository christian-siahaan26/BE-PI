import CitizenService from "../services/citizen.service";
import { Request, Response, NextFunction } from "express";
import { getErrorMessage } from "../utils/error";

class CitizenController {
  private citizenService: CitizenService;

  constructor(citizenServise: CitizenService) {
    this.citizenService = citizenServise;
  }

  async createCitizen(req: Request, res: Response) {
    try {
      const { name, nik, block } = req.body;
      if (!name || !nik || !block) {
        return res.status(400).json({
          success: false,
          message: "All field are required",
        });
      }

      const {
        name: citizenName,
        nik: citizenNik,
        block: citizenBlock,
        error,
      } = await this.citizenService.createCitizen({
        name,
        nik,
        block,
      });

      console.log(error)

      if (error) {
        return res.status(500).json({
          success: false,
          message: error,
        });
      }

      return res.status(201).json({
        success: true,
        message: "Citizen successfuly created",
        data: {
          name,
          nik,
          block,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: getErrorMessage(error),
      });
    }
  }
}

export default CitizenController;
