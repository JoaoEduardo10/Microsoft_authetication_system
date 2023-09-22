export interface IDeleteUserPermissions {
  delete(id: string): Promise<void>;
}
