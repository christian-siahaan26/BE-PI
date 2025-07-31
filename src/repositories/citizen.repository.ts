import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { CitizenDTO } from "../types/citizen";

class CitizenRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async createCitizen(citizen: CitizenDTO) {
    try {
      return await this.prisma.citizen.create({
        data: citizen,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new Error("Name already exist");
        }
      }

      throw new Error("Error creating citizen");
    }
  }

  async getCitizenByName(name: string) {
    try {
      return await this.prisma.citizen.findUnique({
        where: {
          name,
        },
      });
    } catch (error) {
      throw new Error("Error getting citizen");
    }
  }
}

export default CitizenRepository;
