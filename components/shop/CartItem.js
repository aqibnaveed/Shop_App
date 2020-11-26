import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import Fonts from '../../constants/Fonts';

const CartItem = (props) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{props.quantity} </Text>
        <Text style={styles.mainText}> {props.title}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>${props.amount.toFixed(2)}</Text>
        {props.deletable && (
          <TouchableOpacity
            onPress={props.onDeleteCart}
            style={styles.deleteButton}>
            <Icon
              name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
              color="red"
              size={23}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: 'row',
    padding: 10,
    marginHorizontal: 5,
    justifyContent: 'space-between',
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    marginLeft: 20,
  },
  quantity: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: '#888',
  },
  mainText: {
    fontFamily: Fonts.bold,
    fontSize: 16,
  },
});

export default CartItem;
