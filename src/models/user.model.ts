import { type User as PrismaUser } from "@prisma/client";

export default class UserModel {
  private id: number;
  private nameCitizen: string;
  private nik: string;
  private block: string;
  private email: string;

  constructor(
    id: number,
    nameCitizen: string,
    nik: string,
    block: string,
    email: string
  ) {
    this.id = id;
    this.nameCitizen = nameCitizen;
    this.nik = nik;
    this.block = block;
    this.email = email;
  }

  static fromEntity(prismaUser: PrismaUser) {
    return new UserModel(
      prismaUser.id,
      prismaUser.nameCitizen,
      prismaUser.nik,
      prismaUser.block,
      prismaUser.email
    );
  }

  toDTO() {
    return {
      id: this.id,
      nameCitizen: this.nameCitizen,
      nik: this.nik,
      block: this.block,
      email: this.email,
    };
  }
}
