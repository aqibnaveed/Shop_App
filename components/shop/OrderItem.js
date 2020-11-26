import React, {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

import CartItem from './CartItem';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';
import cart from '../../store/reducers/cart';
import Card from '../UI/Card';

const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <Card style={styles.item}>
      <View style={styles.text}>
        <Text style={styles.amount}>$ {props.amount}</Text>
        <Text style={styles.date}>{props.date.split(' GMT')[0]}</Text>
      </View>
      <Button
        title={showDetails ? 'Hide Details' : 'Show Details'}
        color={Colors.primary}
        onPress={() => {
          setShowDetails((prevState) => !prevState);
        }}
      />

      {showDetails && (
        <View>
          {props.items.map((cartItem) => (
            <CartItem
              key={cartItem.productId}
              title={cartItem.title}
              quantity={cartItem.quantity}
              amount={cartItem.sum}
            />
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  item: {
    margin: 20,
  },
  text: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  amount: {
    fontFamily: Fonts.bold,
    fontSize: 22,
    paddingHorizontal: 20,
  },
  date: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: '#888',
  },
});

export default OrderItem;
