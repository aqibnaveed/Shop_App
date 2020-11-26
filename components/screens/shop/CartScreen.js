import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import Colors from '../../../constants/Colors';
import Fonts from '../../../constants/Fonts';
import CartItem from '../../shop/CartItem';
import * as cartActions from '../../../store/actions/cart';
import * as orderActions from '../../../store/actions/orders';
import Card from '../../UI/Card';

const CartScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const cartTotalAmount = useSelector(
    (state) => state.cart.totalAmount,
  ).toFixed(2);

  const cartItems = useSelector((state) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        title: state.cart.items[key].title,
        price: state.cart.items[key].price.toFixed(2),
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }

    return transformedCartItems;
  });

  const dispatch = useDispatch();

  const sendOrderHandler = async () => {
    setIsLoading(true);
    await dispatch(orderActions.addOrder(cartItems, cartTotalAmount));
    setIsLoading(false);
  };

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.priceText}>
            ${Math.round(cartTotalAmount * 100) / 100}
          </Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.primary} />
        ) : (
          <Button
            title="Confirm Order"
            color={Colors.secondary}
            disabled={cartItems.length === 0}
            onPress={sendOrderHandler}
          />
        )}
      </Card>
      <View>
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.productId}
          renderItem={(itemData) => (
            <CartItem
              title={itemData.item.title}
              quantity={itemData.item.quantity}
              amount={itemData.item.sum}
              deletable
              onDeleteCart={() => {
                dispatch(cartActions.deleteFromCart(itemData.item));
              }}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: 'row',
    height: 100,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  summaryText: {
    fontFamily: Fonts.regular,
    fontSize: 20,
    color: 'grey',
  },
  priceText: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    color: 'black',
  },
});

CartScreen.navigationOptions = {
  headerTitle: 'Your Cart',
};

export default CartScreen;
