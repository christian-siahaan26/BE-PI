import { type Complaint as PrismaComplaint } from "@prisma/client";

class Complaint {
  private idComplaint: number;
  private nameCitizen: string;
  private location: string;
  private description: string;
  private photo: string;
  private status: boolean;
  private createdAt: Date;

  constructor(
    idComplaint: number,
    nameCitizen: string,
    location: string,
    description: string,
    photo: string,
    status: boolean,
    createdAt: Date
  ) {
    this.idComplaint = idComplaint;
    this.nameCitizen = nameCitizen;
    this.location = location;
    this.description = description;
    this.photo = photo;
    this.status = status;
    this.createdAt = createdAt;
  }

  static fromEntity(prismaComplaint: PrismaComplaint) {
    return new Complaint(
      prismaComplaint.idComplaint,
      prismaComplaint.nameCitizen,
      prismaComplaint.location,
      prismaComplaint.description,
      prismaComplaint.photo,
      prismaComplaint.status,
      prismaComplaint.createdAt
    );
  }

  toDTO() {
    return {
      idComplaint: this.idComplaint,
      nameCitizen: this.nameCitizen,
      location: this.location,
      description: this.description,
      photo: this.photo,
      status: this.status,
      createdAt: this.createdAt,
    };
  }
}

export default Complaint;
