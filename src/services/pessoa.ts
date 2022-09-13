import { api } from "./api";

interface IPhones {
  phone: string;
  id: string;
}

export interface IData {
  name: string;
  birthday: Date;
  id: string;
  phoneQuantity: number;
  phones: IPhones[];
}

export const getPessoa: () => Promise<IData[]> = async () => {
  const { data } = await api.get("/pessoa");

  return data;
};

export const getPessoaByQuantity: (
  quantity: number
) => Promise<IData[]> = async (quantity) => {
  const { data } = await api.get(`/pessoa?phoneQuantity=${quantity || 0}`);

  return data;
};

export const getPessoaById: (id: string) => Promise<IData> = async (id) => {
  const { data } = await api.get(`/pessoa/${id}`);

  return data;
};
