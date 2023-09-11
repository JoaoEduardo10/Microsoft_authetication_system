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

  set(key: string, valueId: string): string {
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
}

const cache = new CacheLocal();

export { cache, CacheLocal, CacheDTO };
