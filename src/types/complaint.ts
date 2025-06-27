export type Complaint = {
  id: number;
  user: { name: string; };
  location: string;
  description: string;
  photo: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateComplaintDto = {
  name: string;
  location: string;
  description: string;
  photo: string;
  // status: boolean;
  email: string;
};

export type UpdateComplaintDto = {
  location?: string;
  description?: string;
  photo?: string;
  status?: boolean;
};

export type ComplaintFilters = {
  search?: string;
  startDate?: Date;
  endDate?: Date;
  status_completed?: boolean | undefined;
};
