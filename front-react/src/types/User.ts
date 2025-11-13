export type User = {
    token: string;
    id?: number;
    name?: string;
    controle: string;
    senha?: string;
    email?: string;
}

export type UserForm = {
    email: string;
    senha: string;
    controle?: string;
}

export type UsuarioForm = {
    name: string;
    email: string;
    index: string;
}

export type UserVaga = {
    id_vaga?: string;
    titulo: string;
    descricao: string;
    salario: string;
}

export type UserCadastro = {
    email: string;
    senha: string;
    controle: boolean;
}



