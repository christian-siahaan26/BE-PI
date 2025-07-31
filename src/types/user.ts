export type User = {
  id: number;
  citizen: {
    name: string;
    block: string;
  };
  email: string;
  password: string;
  role?: "USER" | "ADMIN";
  createdAt: Date;
  updatedAt: Date;
};

export type CreateUser = {
  nameCitizen: string;
  block: string
  email: string;
  password: string;
  role?: "USER" | "ADMIN";
};
