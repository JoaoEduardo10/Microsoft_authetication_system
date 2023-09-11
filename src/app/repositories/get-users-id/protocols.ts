export interface IGetUserIdsRepository {
  get(): Promise<string[]>;
}
