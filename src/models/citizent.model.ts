import { Citizen as PrismaCitizen } from "@prisma/client/default";

class CitizenModel {
  private id: number;
  private name: string;
  private nik: string;
  private block: string;

  constructor(id: number, name: string, nik: string, block: string) {
    this.id = id;
    this.name = name;
    this.nik = nik;
    this.block = block;
  }

  static formEntity(prismaCitizen: PrismaCitizen) {
    return new CitizenModel(
      prismaCitizen.id,
      prismaCitizen.name,
      prismaCitizen.nik,
      prismaCitizen.block
    );
  }

  toDTO() {
    return {
      id: this.id,
      name: this.name,
      nik: this.nik,
      block: this.block,
    };
  }
}

export default CitizenModel;
