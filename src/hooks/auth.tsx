import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useAuthRequest, ResponseType, makeRedirectUri, } from "expo-auth-session";

import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  tokenEndpoint: "https://discord.com/api/oauth2/token",
  authorizationEndpoint: "https://discord.com/api/oauth2/authorize",
  revocationEndpoint: "https://discord.com/api/oauth2/token/revoke",
};

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(false);

  const isExpoGo = Constants.executionEnvironment === "storeClient";
  const redirectUri = isExpoGo
    ? extra.REDIRECT_URI || makeRedirectUri()
    : makeRedirectUri();

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
      const result = await promptAsync();

      if (result.type !== "success") {
        setLoading(false);
      }
    } catch (error) {
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
    console.log("=== USEEFFECT RESPONSE ===");
    console.log("Response:", JSON.stringify(response, null, 2));
    
    if (response?.type === "success" && response.params?.code) {
      console.log("✅ Código de autorização recebido, trocando por token...");
      setLoading(true);
      
      const tokenData = {
        client_id: CLIENT_ID,
        client_secret: '',
        grant_type: 'authorization_code',
        code: response.params.code,
        redirect_uri: redirectUri,
      };
      
      fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(tokenData).toString(),
      })
        .then(res => res.json())
        .then(tokenResponse => {
          console.log('Token response:', tokenResponse);
          if (tokenResponse.access_token) {
            // Agora buscar os dados do usuário
            return fetch("https://discord.com/api/v9/users/@me", {
              headers: {
                Authorization: `Bearer ${tokenResponse.access_token}`,
              },
            });
          } else {
            throw new Error('Token não recebido');
          }
        })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          } else {
            return res.json();
          }
        })
        .then(async (userInfo) => {
          const firstName = userInfo.username.split(" ")[0];
          const avatar = `${CDN_IMAGE}/avatars/${userInfo.id}/${userInfo.avatar}.png`;

          const userData = {
            ...userInfo,
            firstName,
            token: response.authentication!.accessToken,
            avatar,
          };

          await AsyncStorage.setItem(COLLECTION_USERS, JSON.stringify(userData));
          setUser(userData);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Erro ao buscar usuário do Discord:", err);
          console.error("Response type:", response?.type);
          console.error("Authentication:", response?.authentication);
          setLoading(false);
        });
    } else if (response?.type === "error") {
      setLoading(false);
    } else if (response?.type === "cancel") {
      setLoading(false);
    } else if (response?.type === "dismiss") {
      setLoading(false);
    } else if (response?.type !== undefined) {
      setLoading(false);
    }
  }, [response]);

  useEffect(() => {
    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };