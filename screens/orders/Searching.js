import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withRepeat,
  withSequence,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import colors from '../extensions/Colors';
import {TapGestureHandler} from 'react-native-gesture-handler';
import Pulse from './Pulse';
import Api from '../extensions/Api';
import axios from 'axios';
import {connect} from 'react-redux';
import {setOrder, setLoading} from '../../redux/Reducers';

function mapStateToProps(state) {
  return {
    user: state.userReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setOrder: order => dispatch(setOrder(order)),
    setLoading: (opened, done) => dispatch(setLoading(opened, done)),
  };
}

function Searching({user, setOrder, setLoading}) {
  const pressed = useSharedValue(false);
  const [search, setSearch] = useState(user.status ? true : false);

  async function updateStates() {
    setLoading(true, false);
    try {
      const response = await axios.patch(
        Api.orders.find_order_for_courier,
        {
          status: !search,
        },
        {
          headers: {'x-auth-token': user.authToken},
        },
      );

      if (response.data) {
        setOrder(response.data);
      }
    } catch (error) {
      console.log(error);
    }
    setSearch(search ? false : true);
    setLoading(true, true);
  }

  const tapGestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      pressed.value = true;
    },
    onFail: (e, ctx) => {
      pressed.value = false;
    },
    onEnd: _ => {
      pressed.value = false;
      runOnJS(updateStates)();
    },
  });

  const config = {
    duration: 1000,
  };

  const buttonStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: search ? colors.red : colors.green,
      transform: [
        {
          scale: pressed.value
            ? withTiming(0.8)
            : withRepeat(
                withSequence(withTiming(0.9, config), withTiming(1, config)),
                -1,
                true,
              ),
        },
      ],
    };
  }, [pressed.value, search]);

  return (
    <View style={styles.searching}>
      {search &&
        [...Array(4)].map((e, i) => (
          <Pulse index={i} duration={config.duration} key={i} />
        ))}
      <TapGestureHandler
        onGestureEvent={tapGestureHandler}
        shouldCancelWhenOutside={true}>
        <Animated.View style={[styles.searching__button, buttonStyle]}>
          <Text style={styles.searching__buttonText}>
            {search ? 'Отмена' : 'Поиск'}
          </Text>
        </Animated.View>
      </TapGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  searching: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },

  searching__button: {
    width: 200,
    height: 200,
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searching__buttonText: {
    fontSize: 25,
    color: 'white',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Searching);
