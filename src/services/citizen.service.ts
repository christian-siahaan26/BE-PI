import { PaginatedResult, PaginationParams } from "../types/pagination";
import CitizenRepository from "../repositories/citizen.repository";
import { CitizenDTO, CitizenFilters, CreateCitizen, UpdateCitizen } from "../types/citizen";
import { getErrorMessage } from "../utils/error";
import CitizenModel from "../models/citizent.model";
import { CipherMode } from "crypto";

class CitizenService {
  private citizenRepository: CitizenRepository;

  constructor(citizenRepository: CitizenRepository) {
    this.citizenRepository = citizenRepository;
  }

  async getAllCitizens(
    pagination?: PaginationParams,
    filters?: CitizenFilters
  ): Promise<PaginatedResult<CitizenModel> | string> {
    try {
      const data = await this.citizenRepository.getAllCitizens(
        pagination,
        filters
      );

      if (typeof data === "string") {
        return data;
      }

      const { citizens, total } = data;

      const page = pagination?.page || 1;
      const limit = pagination?.limit || 12;
      const lastPage = Math.ceil(total / limit);

      return {
        data: citizens,
        meta: {
          total,
          page,
          lastPage,
          hasNextPage: page < lastPage,
          hasPrevPage: page > 1,
        },
      };
    } catch (error) {
      return getErrorMessage(error);
    }
  }

  async getCitizenById(id: number): Promise<CitizenModel | string> {
    try {
      const citizen = await this.citizenRepository.getCitizenById(id);

      if (typeof citizen === "string") {
        return citizen;
      }

      if (!citizen) {
        return "Citizen not found";
      }

      return citizen;
    } catch (error) {
      return getErrorMessage(error);
    }
  }

  async createCitizen(citizen: CreateCitizen): Promise<{
    name: string | null;
    block: string | null;
    nik: string | null;
    createdAt: Date | null;
    error: string | null;
  }> {
    try {
      const { name, nik, block, createdAt } =
        await this.citizenRepository.createCitizen({
          ...citizen,
        });

      return {
        name,
        nik,
        block,
        createdAt,
        error: null,
      };
    } catch (error) {
      return {
        name: null,
        nik: null,
        block: null,
        createdAt: null,
        error: getErrorMessage(error),
      };
    }
  }

  async updateCitizen(
    id: number,
    citizenData: UpdateCitizen
  ): Promise<CitizenModel | string> {
    try {
      const existingCitizen = await this.citizenRepository.getCitizenById(id);

      if (!existingCitizen) {
        return "Citizen not found";
      }

      if (typeof existingCitizen === "string") {
        return existingCitizen;
      }

      const data = await this.citizenRepository.updateCitizen(id, citizenData);

      if (typeof data === "string") {
        return data;
      }

      return data;
    } catch (error) {
      return getErrorMessage(error);
    }
  }

  async deleteCitizen(id: number) {
    try {
      const existingCitizen = await this.citizenRepository.getCitizenById(id);

      if (!existingCitizen) {
        return "Citizen not found";
      }

      if (typeof existingCitizen === "string") {
        return existingCitizen;
      }

      const data = await this.citizenRepository.deleteCitizen(id);
      if (typeof data === "string") {
        return data;
      }

      return data;
    } catch (error) {
      return getErrorMessage(error);
    }
  }
}

export default CitizenService;
