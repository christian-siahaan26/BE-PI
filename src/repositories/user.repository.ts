import { PrismaClient, Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { CreateUser, User } from "../types/user";
import { getErrorMessage } from "../utils/error";
import UserModel from "../models/user.model";

export default class UserRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async createUser(userData: CreateUser) {
    try {
      const citizen = await this.prisma.citizen.findUnique({
        where: {
          name: userData.nameCitizen,
        },
      });

      if (!citizen) {
        throw new Error(
          `Citizen with name '${userData.nameCitizen}' not found.`
        );
      }

      if (citizen.block !== userData.block) {
        throw new Error(`Citizen with block '${userData.block}' not found`);
      }

      if (citizen.nik !== userData.nik) {
        throw new Error(`Citizen with nik '${userData.nik}' not found`);
      }

      const user = await this.prisma.user.create({
        data: {
          nameCitizen: citizen.name,
          nik: citizen.nik,
          block: citizen.block,
          email: userData.email,
          password: userData.password,
          role: userData.role || "USER",
          citizen: {
            connect: {
              name: userData.nameCitizen,
            },
          },
        },
      });

      return UserModel.fromEntity(user).toDTO();
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          const target = error.meta?.target as string[];

          if (target.includes("nameCitizen") && target.includes("email")) {
            throw new Error(
              `User dengan nama '${userData.nameCitizen}' dan email '${userData.email}'sudah terdaftar.`
            );
          }

          if (target.includes("email")) {
            throw new Error(
              `User dengan email '${userData.email}' sudah terdaftar.`
            );
          }
          if (target.includes("nameCitizen")) {
            throw new Error(
              `User dengan nama '${userData.nameCitizen}' sudah terdaftar.`
            );
          }
        }

        if (error.code === "P2025") {
          throw new Error(
            "Failed to create user because the related citizen was not found."
          );
        }
      }

      if (error instanceof Error) {
        throw error;
      }

      console.error("Unexpected error in createUser:", getErrorMessage(error));
      throw new Error("An unexpected error occurred while creating the user.");
    }
  }

  async getUserByEmail(email: string) {
    try {
      return await this.prisma.user.findUnique({
        where: {
          email,
        },
      });
    } catch (error) {
      throw new Error("Error getting user");
    }
  }
}
