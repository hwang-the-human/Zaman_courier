import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import colors from '../extensions/Colors';
import CourierScreen from '../courier/CourierScreen';
import OrdersScreen from '../orders/OrdersScreen';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../extensions/Api';
import axios from 'axios';
import {setOrder, setLoading} from '../../redux/Reducers';

function mapStateToProps(state) {
  return {
    user: state.userReducer,
    order: state.orderReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setOrder: order => dispatch(setOrder(order)),
    setLoading: (opened, done) => dispatch(setLoading(opened, done)),
  };
}

function SubRoot({user, order, setOrder, setLoading}) {
  const Tab = createBottomTabNavigator();

  async function updateDeviceToken(token) {
    const deviceToken = await AsyncStorage.getItem('deviceToken');

    if (!deviceToken || deviceToken !== token) {
      try {
        await axios.patch(
          Api.couriers.save_device_token,
          {
            platform: Platform.OS === 'ios' ? 'ios' : 'android',
            deviceToken: token,
          },
          {
            headers: {'x-auth-token': user.authToken},
          },
        );
        await AsyncStorage.setItem('deviceToken', token);
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function updateOrder() {
    setLoading(true, false);
    try {
      const response = await axios.get(Api.orders.get_order_for_courier, {
        headers: {'x-auth-token': user.authToken},
      });
      setOrder(response.data);
    } catch (error) {
      console.log(error);
    }

    setLoading(true, true);
  }

  useEffect(() => {
    PushNotification.configure({
      onRegister: function (tokenData) {
        const {token} = tokenData;
        updateDeviceToken(token);
      },
      onNotification: function (notification) {
        updateOrder();
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerTintColor: 'black',
        headerStyle: {backgroundColor: colors.grey},
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          if (route.name === 'OrderScreen') {
            return (
              <MaterialIcons
                name="menu-book"
                size={25}
                color={focused ? colors.blue : 'black'}
              />
            );
          }
          if (route.name === 'CourierScreen') {
            return (
              <MaterialIcons
                name="delivery-dining"
                size={25}
                color={focused ? colors.blue : 'black'}
              />
            );
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.blue,
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        name="OrderScreen"
        component={OrdersScreen}
        options={{title: 'Заказ', tabBarBadge: order ? 1 : null}}
      />

      <Tab.Screen
        name="CourierScreen"
        component={CourierScreen}
        options={{title: 'Курьер'}}
      />
    </Tab.Navigator>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SubRoot);
