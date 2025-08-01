import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { CitizenDTO } from "../types/citizen";
import { getErrorMessage } from "../utils/error";

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
          const target = error.meta?.target as string[];

          if (target.includes("name") && target.includes("nik")) {
            throw new Error(
              `User dengan nama '${citizen.name}' dan nik '${citizen.nik}'sudah terdaftar.`
            );
          }

          if (target.includes("name")) {
            throw new Error(
              `User dengan name '${citizen.name}' sudah terdaftar.`
            );
          }
          if (target.includes("nik")) {
            throw new Error(
              `User dengan nik '${citizen.nik}' sudah terdaftar.`
            );
          }
        }

        if (error.code === "P2025") {
          throw new Error(
            "Failed to create user because the related citizen was not found."
          );
        }
      }

      throw new Error(getErrorMessage(error));
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
