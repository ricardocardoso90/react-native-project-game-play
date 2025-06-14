import styled from "styled-components/native";
import { theme } from "../../global/styles/theme";

export const Container = styled.TextInput`
  width: 100%;
  height: 95px;
  border-radius: 8px;
  font-size: 21px;
  margin-right: 4px;
  border-width: 1px;
  padding-top: 16px;
  padding: 0 16px;
  color: ${theme.colors.heading};
  font-family: ${theme.fonts.text400};
  background-color: ${theme.colors.secondary40};
  border-color: ${theme.colors.secondary50};
`;