interface CacheDTO {
  key: string;
  valueId: string;
}

class CacheLocal {
  private validateConnect: boolean;
  private values: CacheDTO[] = [];

  constructor() {
    this.validateConnect = false;
    this.values = [];
  }

  connect() {
    this.validateConnect = true;
  }

  set(params: CacheDTO): string {
    const { key, valueId } = params;

    if (!this.validateConnect) {
      return "falha";
    }

    if (this.values.some((item) => item.valueId === valueId)) {
      return "falha";
    }

    const obj: CacheDTO = {
      key,
      valueId,
    };

    this.values.push(obj);
    return "ok";
  }

  get(valueId: string): string {
    if (!this.validateConnect) {
      return "falha";
    }

    const foundItem = this.values.find((item) => item.valueId === valueId);

    if (foundItem) {
      return JSON.stringify(foundItem);
    }

    return "falha";
  }

  findMany() {
    if (!this.validateConnect) {
      return "falha";
    }

    return this.values;
  }

  delete(valueId: string): string {
    if (!this.validateConnect) {
      return "falha";
    }

    const foundIndex = this.values.findIndex(
      (item) => item.valueId === valueId
    );

    if (foundIndex !== -1) {
      this.values.splice(foundIndex, 1);
      return "ok";
    }

    return "falha";
  }
}

const cache = new CacheLocal();

export { cache, CacheLocal, CacheDTO };
