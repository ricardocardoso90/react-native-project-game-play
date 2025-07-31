import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import {
  useAuthRequest,
  ResponseType,
  makeRedirectUri,
} from "expo-auth-session";

const extra = Constants.expoConfig?.extra || {};
const CLIENT_ID = extra.CLIENT_ID || "";
const CDN_IMAGE = extra.CDN_IMAGE || "https://cdn.discordapp.com";

const { COLLECTION_USERS } = require("../configs/database");

type User = {
  id: string;
  username: string;
  firstName: string;
  avatar: string;
  email?: string;
  token: string;
};

type AuthContextData = {
  user: User;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

const discovery = {
  authorizationEndpoint: "https://discord.com/api/oauth2/authorize",
  tokenEndpoint: "https://discord.com/api/oauth2/token",
  revocationEndpoint: "https://discord.com/api/oauth2/token/revoke",
};

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(false);

  // Detecta ambiente para usar o redirectUri correto
  const isExpoGo = Constants.appOwnership === "expo";
  const redirectUri = isExpoGo
    ? makeRedirectUri({ useProxy: true })
    : extra.REDIRECT_URI || makeRedirectUri({ useProxy: false });

  console.log("CLIENT_ID usado:", CLIENT_ID);
  console.log("Redirect URI enviada:", redirectUri);

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: CLIENT_ID,
      scopes: ["identify"],
      responseType: ResponseType.Token,
      redirectUri,
    },
    discovery
  );

  async function signIn() {
    try {
      setLoading(true);
      console.log("Iniciando login com Discord...");
      const result = await promptAsync();
      console.log("Resultado do promptAsync:", result);

      if (result.type !== "success") {
        console.log("Login cancelado ou falhou");
        setLoading(false);
      }
    } catch (error) {
      console.log("Erro ao autenticar", error);
      setLoading(false);
    }
  }

  async function signOut() {
    setUser({} as User);
    await AsyncStorage.removeItem(COLLECTION_USERS);
  }

  async function loadUserStorageData() {
    const storage = await AsyncStorage.getItem(COLLECTION_USERS);

    if (storage) {
      const userLogged = JSON.parse(storage) as User;
      setUser(userLogged);
    }
  }

  useEffect(() => {
    if (response?.type === "success" && response.authentication?.accessToken) {
      fetch("https://discord.com/api/users/@me", {
        headers: {
          Authorization: `Bearer ${response.authentication.accessToken}`,
        },
      })
        .then((res) => res.json())
        .then(async (userInfo) => {
          const firstName = userInfo.username.split(" ")[0];
          const avatar = `${CDN_IMAGE}/avatars/${userInfo.id}/${userInfo.avatar}.png`;

          const userData = {
            ...userInfo,
            firstName,
            token: response.authentication.accessToken,
            avatar,
          };

          await AsyncStorage.setItem(COLLECTION_USERS, JSON.stringify(userData));
          setUser(userData);
          setLoading(false);
        })
        .catch((err) => {
          console.log("Erro ao buscar usuário do Discord", err);
          setLoading(false);
        });
    } else if (response?.type !== undefined) {
      setLoading(false);
    }
  }, [response]);

  useEffect(() => {
    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth};