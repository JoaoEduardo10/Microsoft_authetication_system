import { UserDTO } from "../interfaceDTO/user";

interface INewKey {
  key: string;
  valueId: string;
}

type IKeyFormated = UserDTO;

const formtJsonParse = (key: string) => {
  const new_key = JSON.parse(key) as INewKey;

  const key_fomated = JSON.parse(new_key.key) as IKeyFormated;

  return {
    key: key_fomated,
    valueId: new_key.valueId,
  };
};

export { formtJsonParse };
