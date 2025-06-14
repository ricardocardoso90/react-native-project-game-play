import { theme } from "../../global/styles/theme";
import { Container, Content, Image, SubTitle, Title } from "./styles";

import IllustrationImg from "../../assets/illustration.png";

import { useAuth } from "../../hooks/auth";
import { Alert, ActivityIndicator } from "react-native";

import { ButtonIcon } from "../../components/ButtonIcon";
import { Background } from "../../components/Background";
// import { useNavigation } from "@react-navigation/native";

export function SignIn() {
  const { primary } = theme.colors;

  const { loading, signIn } = useAuth();
  // const navigation = useNavigation();

  async function handleSignIn() {
    // navigation.navigate('Home' as never);
    try {
      await signIn();
    } catch (error) {
      Alert.alert('Error');
    };
  };

  return (
    <Background>
      <Container>
        <Image
          source={IllustrationImg}
          resizeMode="stretch"
        />
        <Content>
          <Title>
            Conecte-se {'\n'}
            e organize suas {'\n'}
            jogatinas!
          </Title>
          <SubTitle>
            Crie grupos para jogar seus games {'\n'}
            favoritos com seus amigos!
          </SubTitle>
          {loading
            ? <ActivityIndicator
              color={primary}
            />
            : <ButtonIcon
              // activeOpacity={0.7}
              title="Entrar com Discord"
              onPress={handleSignIn}
            />}
        </Content>
      </Container>
    </Background>
  )
}