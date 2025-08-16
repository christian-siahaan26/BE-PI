import CitizenService from "../services/citizen.service";
import { Request, Response, NextFunction } from "express";
import { getErrorMessage } from "../utils/error";
import { PaginationParams } from "../types/pagination";
import { CitizenFilters } from "../types/citizen";
import { responsesCitizen } from "../constants";

class CitizenController {
  private citizenService: CitizenService;

  constructor(citizenServise: CitizenService) {
    this.citizenService = citizenServise;
  }

  async getAllCitizens(req: Request, res: Response, next: NextFunction) {
    try {
      const pagination: PaginationParams = {
        page: req.query.page ? parseInt(req.query.page as string) : undefined,
        limit: req.query.limit
          ? parseInt(req.query.limit as string)
          : undefined,
      };

      const filters: CitizenFilters = {
        search: req.query.search as string,
      };

      const result = await this.citizenService.getAllCitizens(
        pagination,
        filters
      );

      if (typeof result === "string") {
        return res.status(400).json({
          success: false,
          message: result,
        });
      }

      return res.status(200).json({
        success: true,
        message: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getCitizenById(req: Request, res: Response, next: NextFunction) {
    try {
      const citizen = await this.citizenService.getCitizenById(
        Number(req.params.idCitizen)
      );

      if (typeof citizen === "string") {
        return res.status(400).json({
          success: false,
          message: citizen,
        });
      }

      return res.status(200).json({
        success: true,
        message: responsesCitizen.successGetCitizens,
        data: citizen,
      });
    } catch (error) {
      next(error);
    }
  }

  async createCitizen(req: Request, res: Response, next: NextFunction) {
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

      console.log(error);

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
      next(error)
    }
  }

  async updateCitizen(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.citizenService.updateCitizen(
        Number(req.params.idCitizen),
        req.body
      );

      if (typeof result === "string") {
        return res.status(400).json({
          success: false,
          message: result,
        });
      }

      return res.status(200).json({
        success: true,
        message: responsesCitizen.successUpdateCitizen,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteCitizen(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.citizenService.deleteCitizen(
        Number(req.params.idCitizen)
      );

      if (typeof result === "string") {
        return res.status(400).json({
          success: false,
          message: result,
        });
      }

      return res.status(204).json({
        success: true,
        message: responsesCitizen.successDeleteCitizen
      });
    } catch (error) {
      next(error)
    }
  }
}

export default CitizenController;
