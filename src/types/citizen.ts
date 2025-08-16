export type CitizenDTO = {
  id: number
  nameCitizen: string;
  nik: string;
  block: string;
  createdAt: Date
  updatedAt: Date
};

export type CreateCitizen = {
  nameCitizen: string;
  nik: string;
  block: string;
}

export type UpdateCitizen = {
  nameCitizen?: string
  nik?: string
  block?: string
}

export type CitizenFilters = {
  search?: string
}
