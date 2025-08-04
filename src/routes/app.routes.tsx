import { theme } from '../global/styles/theme';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

import { Home } from '../screens/Home';
import { AppointmentProps } from '../components/Appointment';
import { AppointmentDetails } from '../screens/AppointmentDetails';
import { AppointmentCreate } from '../screens/AppointmentCreate';

export type RoutesProps = StackNavigationProp<{
  Home: undefined;
  AppointmentCreate: undefined;
  AppointmentDetails: { guildSelected: AppointmentProps };
}>;

const { Navigator, Screen } = createStackNavigator();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: theme.colors.secondary100
        }
      }}
    >
      <Screen name="Home" component={Home} />
      <Screen name="AppointmentDetails" component={AppointmentDetails} />
      <Screen name="AppointmentCreate" component={AppointmentCreate} />
    </Navigator>
  );
}
