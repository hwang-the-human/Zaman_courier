import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Dialog from 'react-native-dialog';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import MainButton from '../extensions/MainButton';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {clearStore, setLoading} from '../../redux/Reducers';

function mapStateToProps(state) {
  return {
    user: state.userReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    clearStore: () => dispatch(clearStore()),
    setLoading: (opened, done) => dispatch(setLoading(opened, done)),
  };
}

function CourierScreen({user, setLoading, clearStore}) {
  const [exitWindow, setExitWindow] = useState(false);
  const navigation = useNavigation();

  function handleOrdersHistory() {
    navigation.push('OrderHistory');
  }

  function handleExit() {
    setLoading(true, false);
    setExitWindow(false);
    try {
      AsyncStorage.clear();
      clearStore();
    } catch (error) {
      console.log(error);
    }
    setLoading(true, true);
  }

  return (
    <ScrollView style={styles.cafeScreen}>
      <View style={{width: '100%', height: 200}} />
      <Text style={styles.cafeScreen__title}>
        {user.name} {user.surname}
      </Text>

      <MainButton
        title="История заказов"
        handlePress={handleOrdersHistory}
        marginTop={30}
      />

      <MainButton
        title="Выйти"
        handlePress={() => setExitWindow(true)}
        marginTop={30}
      />

      <Dialog.Container visible={exitWindow}>
        <Dialog.Title>Выйти</Dialog.Title>
        <Dialog.Description>Вы действительно хотите выйти?</Dialog.Description>
        <Dialog.Button label="Отмена" onPress={() => setExitWindow(false)} />
        <Dialog.Button label="Выйти" onPress={handleExit} />
      </Dialog.Container>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cafeScreen: {
    height: '100%',
    width: '100%',
  },

  cafeScreen__title: {
    alignSelf: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CourierScreen);
