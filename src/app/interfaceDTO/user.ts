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
