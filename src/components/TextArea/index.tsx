import { styles } from './styles';
import { TextInput, TextInputProps } from 'react-native';

export function TextArea({...rest}: TextInputProps){
  return (
    <TextInput 
      style={styles.container}
      {...rest}
    />
  );
};