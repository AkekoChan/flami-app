import { AuthContext } from "./authContext";

interface AuthContextProviderInterface {
  children: React.ReactNode;
}

export const AuthContextProvider = ({
  children,
}: AuthContextProviderInterface) => {
  const contextValues = {};

  const login = async () => {};

  const logout = async () => {};

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};
