export interface UserDTO {
  id: string;
  name: string;
  email: string;
  jobTitle: string;
}

export interface UserMysqlDTO {
  id: string;
  id_grupo: string;
  email: string;
  grupo: string;
}

export interface UserMongoDTO {
  id: string;
  email: string;
  name: string;
  typeGroup:
    | "ADM"
    | "tecnico"
    | "atendimento"
    | "vendas_ativo"
    | "vendas_passivo"
    | "estoque"
    | "financeiro";
}
