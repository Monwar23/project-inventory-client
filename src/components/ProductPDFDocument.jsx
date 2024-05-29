import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  product: {
    width: '45%',
    margin: '2.5%',
    padding: 10,
    border: '1 solid #ccc',
  },
  productName: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productDetails: {
    fontSize: 10,
    marginBottom: 5,
  },
});

const ProductPDFDocument = ({ products }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.container}>
        {products.map((product, index) => (
          <View key={index} style={styles.product}>
            <Text style={styles.productName}>{product.product_name}</Text>
            <Text style={styles.productDetails}>Category: {product.category}</Text>
            <Text style={styles.productDetails}>Quantity: {product.quantity}</Text>
            <Text style={styles.productDetails}>Supplier: {product.supplier_name}</Text>
            <Text style={styles.productDetails}>Purchase Price: ${product.purchase_price}</Text>
            <Text style={styles.productDetails}>Sales Price: ${product.sales_price}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default ProductPDFDocument;
