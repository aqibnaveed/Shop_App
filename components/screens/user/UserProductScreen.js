import React from 'react';
import {FlatList, View, Text, Button, Alert, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import HeaderButton from '../../UI/HeaderButton';
import ProductItem from '../../shop/ProductItem';
import Colors from '../../../constants/Colors';

import * as productsActions from '../../../store/actions/products';

const UserProductScreen = (props) => {
  const editProductHandler = (productId) => {
    props.navigation.navigate('EditProduct', {
      productId: productId,
    });
  };

  const deleteHandler = (id) => {
    Alert.alert('Are u sure', 'Do you really want to delete this item?', [
      {text: 'No', style: 'default'},
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(productsActions.deleteProduct(id));
        },
      },
    ]);
  };

  const userProduct = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  if (userProduct.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found. Maybe start creating some?</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={userProduct}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onSelect={() => {
              editProductHandler(itemData.item.id);
            }}>
            <Button
              title="Edit"
              color={Colors.primary}
              onPress={() => {
                editProductHandler(itemData.item.id);
              }}
            />
            <Button
              title="Delete"
              color={Colors.primary}
              onPress={() => {
                deleteHandler(itemData.item.id);
              }}
            />
          </ProductItem>
        )}
      />
    </View>
  );
};

UserProductScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: 'User Products',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'menu' : 'ios-menu'}
          onPress={() => {
            navigationData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          onPress={() => {
            navigationData.navigation.navigate('EditProduct');
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserProductScreen;
