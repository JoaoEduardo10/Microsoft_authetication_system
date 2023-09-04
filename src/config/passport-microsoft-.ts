import { MicrosoftAuthentication } from "../services/microsoft";

const configurePassport = () => {
  const microsoftAuth = new MicrosoftAuthentication();

  microsoftAuth.connectAuth();
};

export { configurePassport };
