import axios, { AxiosResponse } from 'axios';

interface Empresa {
  id: number;
  cnpj: string;
  name: string;
}

interface ApiResponse {
  // Define a estrutura da resposta da API, se houver alguma
  // ou pode ser deixado em branco se não houver resposta específica esperada
}

interface Payload {
  email: string;
  corporationIds: number[];
}

async function getEmpresaData(): Promise<Empresa[]> {
  try {
    const response: AxiosResponse<Empresa[]> = await axios.get<Empresa[]>(`http://localhost:8080/corporations`);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter dados da empresa:', error);
    throw error;
  }
}

async function postData(payload: Payload): Promise<ApiResponse> {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.post<ApiResponse>('http://localhost:8080/corporations/chosen', payload);
    return response.data;
  } catch (error) {
    console.error('Erro ao enviar os dados:', error);
    throw error;
  }
}

export {getEmpresaData, postData};