import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Info from './Info';
import Orders from './Orders';
import Zigzag from '../extensions/Zigzag';
import Summary from './Summary';
import MainButton from '../extensions/MainButton';
import axios from 'axios';
import {connect} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import moment from 'moment';
import Api from '../extensions/Api';
import {setLoading, setOrder} from '../../redux/Reducers';

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

function Order({order, user, setLoading, setOrder}) {
  const selectedOrder = useRoute().params?.track ?? order;
  const [disabled, setDisabled] = useState(true);

  async function handleFinishOrder() {
    setLoading(true, false);
    try {
      await axios.post(
        Api.orders.finish_order_for_courier,
        {},
        {
          headers: {'x-auth-token': user.authToken},
        },
      );
      setOrder(null);
    } catch (error) {
      console.log(error);
    }
    setLoading(true, true);
  }

  useEffect(() => {
    const now = moment(new Date());
    const late = moment(selectedOrder.courier.date);
    var time = now.diff(late, 'minutes');

    if (time > 10) return setDisabled(false);

    const intervalId = setInterval(() => {
      time += 1;
      if (time > 10) {
        setDisabled(false);
      }
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.order}>
      <ScrollView scrollEventThrottle={16}>
        <View style={styles.order__container}>
          {!useRoute().params?.track && <View style={styles.order__space} />}
          <Orders order={selectedOrder} />
          <Info order={selectedOrder} />
          <Zigzag />
        </View>
        <Summary
          totalPrice={selectedOrder.total_price}
          commission={selectedOrder.total_price * 0.15}
        />
        <View style={{height: 80}} />
      </ScrollView>

      {!useRoute().params?.track && (
        <View style={styles.order__button}>
          <MainButton
            title="Завершить заказ"
            handlePress={handleFinishOrder}
            disabled={disabled}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  order: {
    width: '100%',
    height: '100%',
  },

  order__container: {
    backgroundColor: 'white',
    paddingBottom: 30,
  },

  order__button: {
    position: 'absolute',
    bottom: -30,
    backgroundColor: 'rgba(255,255,255,0.5)',
    width: '100%',
    borderRadius: 30,
    height: 110,
  },

  order__space: {
    width: '100%',
    height: 50,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Order);
