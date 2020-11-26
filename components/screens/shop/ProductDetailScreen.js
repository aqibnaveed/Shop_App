import React from 'react';
import {View, Button, Text, ScrollView, Image, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import Colors from '../../../constants/Colors';
import Fonts from '../../../constants/Fonts';
import PRODUCTS from '../../../data/dummy-data';
import * as cartActions from '../../../store/actions/cart';

const ProductDetailScreen = (props) => {
  const dispatch = useDispatch();

  const productId = props.navigation.getParam('productId');

  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find(
      (product) => product.id === productId,
    ),
  );

  return (
    <ScrollView>
      <Image style={styles.image} source={{uri: selectedProduct.imageUrl}} />
      <Button
        title="Add to Cart"
        color={Colors.primary}
        onPress={() => {
          dispatch(cartActions.addToCart(selectedProduct));
        }}
      />
      <Text style={styles.price}>
        ${' '}
        {selectedProduct.price
          ? selectedProduct.price.toFixed(2)
          : selectedProduct.price}
      </Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: navigationData.navigation.getParam('productTitle'),
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  price: {
    color: Colors.primary,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: Fonts.bold,
  },
  description: {
    textAlign: 'center',
    fontFamily: Fonts.regular,
    color: '#888',
    marginHorizontal: 20,
  },
});

export default ProductDetailScreen;
