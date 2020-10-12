import { post, get } from "../api/api";

const baseUrl = process.env.NODE_URL;

export const createNewMachine = async ({
  name,
  date
}) => {
  const machineURL = process.env.MACHINE_URL;
  const { data: machine, error } = await post(`${baseUrl}/${machineURL}`, {
    name,
    date
  });
  if (error) {
    if (error.status === 409) {
      throw new Error("Machine already exists.");
    }
    throw error;
  }

  return machine;
};

export const getAllMachines = async () => {
  const machineURL = process.env.MACHINE_URL;
  const { data: machines, error } = await get(`${baseUrl}/${machineURL}`);

  if (error) {
    throw error;
  }

  return machines;
};