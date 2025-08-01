import CitizenRepository from "../repositories/citizen.repository";
import { CitizenDTO } from "../types/citizen";
import { getErrorMessage } from "../utils/error";

class CitizenService {
  private citizenRepository: CitizenRepository;

  constructor(citizenRepository: CitizenRepository) {
    this.citizenRepository = citizenRepository;
  }

  async createCitizen(citizen: CitizenDTO): Promise<{
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
            error: null
        }
    } catch (error) {
        return {
            name: null,
            nik: null,
            block: null,
            createdAt: null,
            error: getErrorMessage(error)
        }
    }
  }
}

export default CitizenService;
