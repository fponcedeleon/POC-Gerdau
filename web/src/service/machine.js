import { post, get } from "../api/api";

const baseUrl = 'http://localhost:4000';
const machineURL = 'api/machine';

export const createNewMachine = async ({
  nombre,
  instalada,
  ultimoMantenimiento,
}) => {
  const { data: machine, error } = await post(`${baseUrl}/${machineURL}`, {
    nombre,
    instalada,
    ultimoMantenimiento,
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
  const { data: machines, error } = await get(`${baseUrl}/${machineURL}`);
  if (error) {
    throw error;
  }

  return machines;
};