import { RegistroScreen } from './RegistroScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { ListadoScreen } from './ListadoScreen';

const Stack = createStackNavigator();

export const Tabs=() =>{


    return (
        <Stack.Navigator initialRouteName='Registro'>
            <Stack.Screen name="Registro" component={RegistroScreen} />
            <Stack.Screen  name="Lista" component={ListadoScreen} />
        </Stack.Navigator>
    );
}