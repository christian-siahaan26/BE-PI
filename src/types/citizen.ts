export type CitizenDTO = {
  id: number
  name: string;
  nik: string;
  block: string;
  createdAt: Date
  updatedAt: Date
};

export type CreateCitizen = {
  name: string;
  nik: string;
  block: string;
}

export type UpdateCitizen = {
  name?: string
  nik?: string
  block?: string
}

export type CitizenFilters = {
  search?: string
}
