export type User = {
  id: number;
  citizen: {
    nameCitizen: string;
    block: string;
    nik: string;
  };
  email: string;
  password: string;
  role?: "USER" | "ADMIN";
  createdAt: Date;
  updatedAt: Date;
};

export type CreateUser = {
  nameCitizen: string;
  nik: string;
  block: string;
  email: string;
  password: string;
  role?: "USER" | "ADMIN";
};
