import React from 'react';
import {StyleSheet, Text, View, Dimensions, Linking} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomButton from '../extensions/CustomButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../extensions/Colors';

const windowWidth = Dimensions.get('window').width;

export default function Info({order}) {
  function handleOpenMap() {
    Linking.openURL('https://m.2gis.kz/search/' + order.cafe.address);
  }

  function handleCallClient() {
    Linking.openURL(`tel:${order.client.phone}`);
  }

  return (
    <View style={styles.info}>
      <View style={styles.info__container}>
        <Text style={styles.info__title}>Информация о заказе</Text>

        <View style={styles.info__option}>
          <MaterialCommunityIcons
            name="comment-text-outline"
            size={30}
            color="grey"
          />
          <View style={styles.info__buttonBox}>
            <View style={styles.info__textBox}>
              <Text style={styles.info__text} numberOfLines={1}>
                Комментарий для ресторана:
              </Text>
              <Text style={styles.info__subText}>
                {order.client.comment ?? 'Не указано'}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.info__option}>
          <MaterialCommunityIcons name="store-outline" size={30} color="grey" />
          <View style={styles.info__buttonBox}>
            <View style={styles.info__textBox}>
              <Text style={styles.info__text} numberOfLines={1}>
                Адрес ресторана:
              </Text>
              <Text style={styles.info__subText}>
                {order.restaurant.address}
              </Text>
            </View>
            <CustomButton handleButton={handleOpenMap}>
              <View style={styles.info__callButton}>
                <Text style={styles.info__textButton}>Карта</Text>
              </View>
            </CustomButton>
          </View>
        </View>

        <View style={styles.info__option}>
          <AntDesign name="home" size={30} color="grey" />
          <View style={styles.info__buttonBox}>
            <View style={styles.info__textBox}>
              <Text style={styles.info__text} numberOfLines={1}>
                Адрес доставки:
              </Text>
              <Text style={styles.info__subText}>
                {order.client.address.street} {order.client.address.aptNumber}
              </Text>
            </View>
            <CustomButton handleButton={handleCallClient}>
              <View style={styles.info__callButton}>
                <Text style={styles.info__textButton}>Позвонить</Text>
              </View>
            </CustomButton>
          </View>
        </View>

        <View style={styles.info__option}>
          <MaterialCommunityIcons
            name="credit-card-outline"
            size={30}
            color="grey"
          />
          <View style={styles.info__buttonBox}>
            <View style={styles.info__textBox}>
              <Text style={styles.info__text} numberOfLines={1}>
                Способ оплаты:
              </Text>
              <Text style={styles.info__subText}>
                {order.client.payment.number ? 'Карта' : 'Наличные'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  info: {
    marginTop: 30,
    alignItems: 'center',
  },

  info__container: {
    width: windowWidth - 30,
  },

  info__option: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  info__title: {
    marginBottom: 15,
    fontSize: 25,
    fontWeight: '600',
  },

  info__buttonBox: {
    borderBottomWidth: 0.2,
    borderBottomColor: 'grey',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    paddingTop: 15,
    paddingBottom: 15,
  },

  info__textBox: {
    flex: 1,
    marginRight: 15,
  },

  info__text: {
    fontSize: 16,
  },

  info__subText: {
    color: 'grey',
  },

  info__callButton: {
    backgroundColor: colors.green,
    padding: 10,
    borderRadius: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  info__textButton: {
    color: 'white',
    fontWeight: '500',
  },
});
