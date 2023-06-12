import React, {useEffect} from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import {connect} from 'react-redux';
import axios from 'axios';
import {setOrder, setLoading, setUser} from '../../redux/Reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';
import SignIn from '../authorization/SignIn';
import SubRoot from './SubRoot';
import Api from '../extensions/Api';

function mapStateToProps(state) {
  return {
    user: state.userReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setOrder: order => dispatch(setOrder(order)),
    setUser: user => dispatch(setUser(user)),
    setLoading: (opened, done) => dispatch(setLoading(opened, done)),
  };
}

function Root({user, setUser, setLoading, setOrder}) {
  useEffect(() => {
    async function getUser() {
      setLoading(true, false);
      try {
        const authToken = await AsyncStorage.getItem('authToken');

        if (authToken) {
          const response = await axios.get(Api.couriers.me, {
            headers: {'x-auth-token': authToken},
          });

          setUser({
            ...response.data.courier,
            authToken: authToken,
          });
          setOrder(response.data.order);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(true, true);
    }

    getUser();
  }, []);

  return (
    <View style={styles.app}>
      <StatusBar animated={true} barStyle="dark-content" />
      {user.authToken ? <SubRoot /> : <SignIn />}
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    width: '100%',
    height: '100%',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
