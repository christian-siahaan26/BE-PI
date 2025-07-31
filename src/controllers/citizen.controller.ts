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
      const { name, block } = req.body;
      if (!name || !block) {
        return res.status(400).json({
          success: false,
          message: "All field are required",
        });
      }

      const {
        name: citizenName,
        block: citizenBlock,
        error,
      } = await this.citizenService.createCitizen({
        name,
        block,
      });

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
