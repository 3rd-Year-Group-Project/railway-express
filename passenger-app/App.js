import 'react-native-gesture-handler';
import * as React from 'react';
import { theme } from './reactNativePaperTheme';
import { TailwindProvider } from 'tailwindcss-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { IconButton, Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider } from './src/contexts/authContext';

import CustomDrawer from './src/components/CustomDrawer';
import CustomNavigationBar from './src/components/CustomNavigationBar';

import SearchTrains from './src/screens/search/SearchTrains';
import SearchResults from './src/screens/search/SearchResults';
import SearchTimeTable from './src/screens/timeTables/SearchTimeTable';
import StationSchedule from './src/screens/timeTables/StationSchedule';
import Login from './src/screens/auth/Login';
import Register from './src/screens/auth/Register';
import ForgotPassword from './src/screens/auth/ForgotPassword';
import TrainDetails from './src/screens/search/TrainDetails';
import VerifyEmail from './src/screens/auth/VerifyEmail';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function SearchNavigators() {
  return (
    <Stack.Navigator
      initialRouteName="SearchTrains"
      screenOptions={{
        header: (props) => <CustomNavigationBar {...props} />,
      }}
    >
      <Stack.Screen
        name="SearchTrains"
        component={SearchTrains}
        initialParams={{ screenTitle: 'Search Trains' }}
      />
      <Stack.Screen
        name="SearchResults"
        component={SearchResults}
        initialParams={{ screenTitle: 'Available Trains' }}
      />
      <Stack.Screen
        name="TrainDetails"
        component={TrainDetails}
        initialParams={{ screenTitle: 'Train details' }}
      />
    </Stack.Navigator>
  );
}
function TimeTableNavigators() {
  return (
    <Stack.Navigator
      initialRouteName="SearchTimeTable"
      screenOptions={{
        header: (props) => <CustomNavigationBar {...props} />,
      }}
    >
      <Stack.Screen
        name="SearchTimeTable"
        component={SearchTimeTable}
        initialParams={{ screenTitle: 'Search Time Table' }}
      />
      <Stack.Screen
        name="StationSchedule"
        component={StationSchedule}
        initialParams={{ screenTitle: 'Station Schedule' }}
      />
    </Stack.Navigator>
  );
}
function MyTicketsNavigators() {
  return (
    <Stack.Navigator
      initialRouteName="MyTickets"
      screenOptions={{
        header: (props) => <CustomNavigationBar {...props} />,
      }}
    >
      <Stack.Screen
        name="MyTickets"
        component={SearchTimeTable}
        initialParams={{ screenTitle: 'My Tickets' }}
      />
    </Stack.Navigator>
  );
}
function AuthNavigators() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        header: (props) => <CustomNavigationBar {...props} />,
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        initialParams={{ screenTitle: 'Login - Railway Express' }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        initialParams={{ screenTitle: 'Register - Railway Express' }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        initialParams={{ screenTitle: 'Reset Password - Railway Express' }}
      />
      <Stack.Screen
        name="VerifyEmail"
        component={VerifyEmail}
        initialParams={{ screenTitle: 'Verify Email - Railway Express' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const drawerScreenOptions = ({ icon }) => {
    return {
      drawerIcon: ({ color }) => (
        <IconButton size={22} icon={icon} color={color} />
      ),
      drawerLabelStyle: {
        fontSize: 17,
        marginTop: 0,
        marginBottom: 0,
        paddingTop: 0,
        paddingBottom: 0,
      },
      drawerInactiveTintColor: '#94a3b8',
      drawerInactiveBackgroundColor: '#3d4252',
      drawerActiveTintColor: 'white',
      drawerActiveBackgroundColor: 'rgba(0, 0, 0, 0.06)',
      drawerItemStyle: { marginTop: 0, marginBottom: 0, padding: 0 },
    };
  };

  return (
    <AuthProvider>
      <TailwindProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer theme={theme}>
            <Drawer.Navigator
              initialRouteName="Search Trains"
              screenOptions={{
                header: () => undefined,
              }}
              drawerContent={CustomDrawer}
            >
              <Drawer.Screen
                name="Search Trains"
                component={SearchNavigators}
                options={drawerScreenOptions({ icon: 'magnify' })}
              />
              <Drawer.Screen
                name="My Tickets"
                component={MyTicketsNavigators}
                options={drawerScreenOptions({ icon: 'barcode' })}
              />
              <Drawer.Screen
                name="Time Tables"
                component={TimeTableNavigators}
                options={drawerScreenOptions({ icon: 'table-large' })}
              />

              <Drawer.Screen
                name="AuthNavigators"
                component={AuthNavigators}
                options={{
                  ...drawerScreenOptions({ icon: 'login' }),
                  drawerItemStyle: { display: 'none' },
                }}
              />
            </Drawer.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </TailwindProvider>
    </AuthProvider>
  );
}
