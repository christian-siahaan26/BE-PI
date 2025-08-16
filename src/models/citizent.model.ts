import { Citizen as PrismaCitizen } from "@prisma/client/default";

class CitizenModel {
  private idCitizen: number;
  private nameCitizen: string;
  private nik: string;
  private block: string;

  constructor(idCitizen: number, nameCitizen: string, nik: string, block: string) {
    this.idCitizen = idCitizen;
    this.nameCitizen = nameCitizen;
    this.nik = nik;
    this.block = block;
  }

  static formEntity(prismaCitizen: PrismaCitizen) {
    return new CitizenModel(
      prismaCitizen.idCitizen,
      prismaCitizen.nameCitizen,
      prismaCitizen.nik,
      prismaCitizen.block
    );
  }

  toDTO() {
    return {
      idCitizen: this.idCitizen,
      nameCitizen: this.nameCitizen,
      nik: this.nik,
      block: this.block,
    };
  }
}

export default CitizenModel;
