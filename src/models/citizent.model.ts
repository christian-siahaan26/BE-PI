import { Citizen as PrismaCitizen } from "@prisma/client/default";

class CitizenModel {
  private id: number;
  private name: string;
  private block: string;

  constructor(id: number, name: string, block: string) {
    this.id = id;
    this.name = name;
    this.block = block;
  }

  static formEntity(prismaCitizen: PrismaCitizen) {
    return new CitizenModel(
      prismaCitizen.id,
      prismaCitizen.name,
      prismaCitizen.block
    );
  }

  toDTO() {
    return {
      id: this.id,
      name: this.name,
      block: this.block,
    };
  }
}

export default CitizenModel;
