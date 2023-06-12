import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Root from './screens/root/Root';
import {connect} from 'react-redux';
import Loading from './screens/extensions/Loading';
import OrderHistory from './screens/courier/OrderHistory';
import Order from './screens/orders/Order';

function mapStateToProps(state) {
  return {
    loading: state.loadingReducer,
  };
}

const Stack = createStackNavigator();

function App({loading}) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="OrderHistory"
          component={OrderHistory}
          options={{title: 'История заказов', headerBackTitle: 'Назад'}}
        />

        <Stack.Screen
          name="Order"
          component={Order}
          options={{title: 'Заказ', headerBackTitle: 'Назад'}}
        />
      </Stack.Navigator>
      {loading.opened && <Loading />}
    </NavigationContainer>
  );
}

export default connect(mapStateToProps, null)(App);
