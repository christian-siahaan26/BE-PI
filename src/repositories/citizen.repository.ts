import { PrismaClient, Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { CitizenFilters, CreateCitizen, UpdateCitizen } from "../types/citizen";
import { getErrorMessage } from "../utils/error";
import { PaginationParams } from "../types/pagination";
import CitizenModel from "../models/citizent.model";

class CitizenRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getAllCitizens(
    pagination?: PaginationParams,
    filters?: CitizenFilters
  ): Promise<{ citizens: CitizenModel[]; total: number } | string> {
    try {
      const page = pagination?.page || 1;
      const limit = pagination?.limit || 12;
      const skip = (page - 1) * limit;

      const where: Prisma.CitizenWhereInput = {
        ...(filters?.search && {
          OR: [
            {
              nameCitizen: {
                contains: filters.search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
            {
              nik: {
                contains: filters.search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
            {
              block: {
                contains: filters.search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
          ],
        }),
      };

      const [citizens, total] = await Promise.all([
        this.prisma.citizen.findMany({
          where,
          skip,
          take: limit,
          orderBy: {
            createdAt: "desc",
          },
        }),
        this.prisma.citizen.count({ where }),
      ]);

      return {
        citizens: citizens.map((citizen) => CitizenModel.formEntity(citizen)),
        total,
      };
    } catch (error) {
      return getErrorMessage(error);
    }
  }

  async getCitizenById(idCitizen: number): Promise<CitizenModel | null | string> {
    try {
      const citizen = await this.prisma.citizen.findFirst({
        where: { idCitizen } as Prisma.CitizenWhereInput,
      });

      return citizen ? CitizenModel.formEntity(citizen) : null;
    } catch (error) {
      return getErrorMessage(error);
    }
  }

  async createCitizen(citizen: CreateCitizen) {
    try {
      return await this.prisma.citizen.create({
        data: citizen,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          const target = error.meta?.target as string[];

          if (target.includes("nameCitizen") && target.includes("nik")) {
            throw new Error(
              `User dengan nama '${citizen.nameCitizen}' dan nik '${citizen.nik}'sudah terdaftar.`
            );
          }

          if (target.includes("nameCitizen")) {
            throw new Error(
              `User dengan name '${citizen.nameCitizen}' sudah terdaftar.`
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

  async updateCitizen(
    idCitizen: number,
    citizenData: UpdateCitizen
  ): Promise<CitizenModel | string> {
    try {
      const citizen = await this.prisma.citizen.update({
        where: {
          idCitizen,
        } as Prisma.CitizenWhereUniqueInput,
        data: {
          ...citizenData,
          updatedAt: new Date(),
        },
      });

      return CitizenModel.formEntity(citizen);
    } catch (error) {
      return getErrorMessage(error);
    }
  }

  async deleteCitizen(idCitizen: number) {
    try {
      const citizen = await this.prisma.citizen.delete({
        where: { idCitizen },
      });

      return citizen;
    } catch (error) {
      return getErrorMessage(error);
    }
  }

  async getCitizenByName(nameCitizen: string) {
    try {
      return await this.prisma.citizen.findUnique({
        where: {
          nameCitizen,
        },
      });
    } catch (error) {
      throw new Error("Error getting citizen");
    }
  }
}

export default CitizenRepository;
