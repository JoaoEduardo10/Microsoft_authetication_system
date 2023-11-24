export interface IGetAllUserIdsRepository {
  get(): Promise<string[]>;
}
