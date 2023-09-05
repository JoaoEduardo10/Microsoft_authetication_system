export interface CacheDTO {
  key: string;
  valueId: string;
}

class CacheLocal {
  private validateConnect: boolean;
  private values: string[] = [];

  constructor() {
    this.validateConnect = false;
    this.values = [];
  }

  connect() {
    this.validateConnect = true;
  }

  set(key: string, valueId: string) {
    const obj = {
      key,
      valueId,
    };

    if (this.validateConnect) {
      this.values.push(JSON.stringify(obj));
      return "ok";
    }

    return `falha`;
  }

  get(valueId: string) {
    if (this.validateConnect) {
      const string_values = this.values;

      for (const value of string_values) {
        const key = JSON.parse(value) as CacheDTO;

        if (key.valueId === valueId) {
          return JSON.stringify(key);
        }
      }
      return "falha";
    }

    return "falha";
  }
}

const cache = new CacheLocal();

export { cache };
