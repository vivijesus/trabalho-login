import axios from "axios";

const api = axios.create({
    baseURL: `http://localhost:3000`,
});

export const useApi = () => ({
    signin: async (email: string, senha: string) => {     
        const response = await api.post('/usuarios/login', { email, senha }, {
            headers: {
                'Content-Type': 'application/json'
            }
          });
        return response.data;
    },

    cadastroUser: async (data: any) => { 
        console.log(data)    
        const response = await api.post('/usuarios/cadastro', data, {
            headers: {
                'Content-Type': 'application/json'
            }
          });
        return response.data;
    },

    usuarioList: async () => {     
        const response = await api.get('/usuarios/listar', {
            headers: {
                'Content-Type': 'application/json'
            }
          });
        return response.data;
    },

    logout: async () => {
        return { status: true };
    }
});