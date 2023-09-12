import { Schema, model } from "mongoose";
import { UserMongoDTO } from "../interfaceDTO/user";

const User = model(
  "User",
  new Schema<Omit<UserMongoDTO, "id">>({
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      min: 4,
    },
    typeGroup: {
      type: String,
      enum: [
        "ADM",
        "tecnico",
        "atendimento",
        "vendas_ativo",
        "vendas_passivo",
        "estoque",
        "financeiro",
      ],
      required: true,
    },
  }),
  "users"
);

export { User };
