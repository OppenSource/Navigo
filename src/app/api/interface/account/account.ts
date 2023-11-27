export interface Bus {
  id?: string;
  fullname: string;
  username: string;
  password: string;

  matricule: string;
  cycle: string;
  class: string;
  level: string;

  email: number;
  phone: number;

  status: boolean;
  account: boolean;

  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
}
