import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import SingleOrderItem from '../items/SingleOrderItem';

const windowWidth = Dimensions.get('window').width;

export default function Orders({order}) {
  return (
    <View style={styles.orders}>
      <View style={styles.orders__contianer}>
        <Text style={styles.orders__title}>
          Заказ{' '}
          <Text style={{fontSize: 16, color: 'grey'}}>
            #{order._id.substr(-4)}
          </Text>
        </Text>
        {order.orders.map((order, i) => (
          <SingleOrderItem order={order} key={i} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  orders: {
    alignItems: 'center',
    marginTop: 30,
  },

  orders__contianer: {
    width: windowWidth - 30,
  },

  orders__title: {
    fontSize: 25,
    marginBottom: 15,
    fontWeight: '600',
  },
});
