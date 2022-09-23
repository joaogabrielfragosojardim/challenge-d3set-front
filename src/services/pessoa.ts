import { api } from "./api";

export interface IPhones {
  phone: string;
  id: string;
}

export interface IData {
  name: string;
  birthday: Date | string;
  id: string;
  phoneQuantity: number;
  phones: IPhones[];
}

export interface ICreatePessoa {
  name: string;
  birthday: Date;
  phoneQuantity: number;
  phones: string[];
}

export const createPessoa = async (payload: ICreatePessoa) => {
  const { data } = await api.post("/pessoa", payload);

  return data;
};

export const editPessoa = async (payload: IData) => {
  const { data } = await api.put(`/pessoa/${payload.id}`, payload);

  return data;
};

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
