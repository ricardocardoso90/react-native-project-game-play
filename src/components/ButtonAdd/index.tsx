import React from 'react';
import { styles } from './styles';
import { theme } from '../../hooks/theme';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

export function ButtonAdd({...rest}: RectButtonProps) {
  return (
    <RectButton 
      style={styles.container}
      {...rest}
    >
      <MaterialCommunityIcons 
        name="plus"
        color={theme.colors.heading}
        size={24}
      />
    </RectButton>
  )
};