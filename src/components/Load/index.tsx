import { styles } from './styles';
import { theme } from '../../hooks/theme';

import { View, ActivityIndicator } from 'react-native';

export function Load() {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color={theme.colors.primary}
      />
    </View>
  );
};