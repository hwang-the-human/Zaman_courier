import React from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {setLoading, setOrder} from '../../redux/Reducers';
import Order from './Order';
import Searching from './Searching';

function mapStateToProps(state) {
  return {
    order: state.orderReducer,
  };
}

function OrdersScreen({order}) {
  return (
    <View style={styles.ordersScreen}>
      {order ? <Order order={order} /> : <Searching />}
    </View>
  );
}

const styles = StyleSheet.create({
  ordersScreen: {
    width: '100%',
    height: '100%',
  },
});

export default connect(mapStateToProps)(OrdersScreen);
