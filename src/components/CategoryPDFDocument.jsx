
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 30 },
  table: { display: "table", width: "auto", borderStyle: "solid", borderWidth: 1, borderColor: '#bfbfbf' },
  tableRow: { flexDirection: "row" },
  tableCol: { width: "25%", borderStyle: "solid", borderWidth: 1, borderColor: '#bfbfbf', padding: 5 },
  tableCell: { margin: "auto", marginTop: 5, fontSize: 10 },
  header: { backgroundColor: '#f0f0f0', fontWeight: 'bold' },
  image: { width: 50, height: 50 }
});

const CategoryPDFDocument = ({ categories }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.table}>
        <View style={[styles.tableRow, styles.header]}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>#</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Category Image</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Category Name</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Date</Text>
          </View>
        </View>
        {categories.map((category, index) => (
          <View style={styles.tableRow} key={category._id}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{index + 1}</Text>
            </View>
            <View style={styles.tableCol}>
              <Image style={styles.image} src={category.image_url} />
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{category.name}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{new Date(category.start_date).toLocaleDateString()}</Text>
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default CategoryPDFDocument;
