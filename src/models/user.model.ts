import { type User as PrismaUser } from "@prisma/client";

export default class UserModel {
  private idUser: number;
  private nameCitizen: string;
  private nik: string;
  private block: string;
  private email: string;

  constructor(
    idUser: number,
    nameCitizen: string,
    nik: string,
    block: string,
    email: string
  ) {
    this.idUser = idUser;
    this.nameCitizen = nameCitizen;
    this.nik = nik;
    this.block = block;
    this.email = email;
  }

  static fromEntity(prismaUser: PrismaUser) {
    return new UserModel(
      prismaUser.idUser,
      prismaUser.nameCitizen,
      prismaUser.nik,
      prismaUser.block,
      prismaUser.email
    );
  }

  toDTO() {
    return {
      idUser: this.idUser,
      nameCitizen: this.nameCitizen,
      nik: this.nik,
      block: this.block,
      email: this.email,
    };
  }
}
