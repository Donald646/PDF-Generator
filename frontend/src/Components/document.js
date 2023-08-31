import { React } from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

export const MyDocument = ({ response }) => {
  const questionList = [
    "Samantha has 5 apples and gives 2 to her friend. How many apples does she have left? If a pizza is divided into 8 equal slices and 3 are eaten, how many slices are left?",
    "A train travels 300 miles in 5 hours. What is its average speed?",
    "If a book has 350 pages and Jane reads 50 pages a day, how many days will it take her to finish the book?",
    "In a garden, there are 24 red roses and 16 white roses. What's the ratio of red to white roses?",
    "Tom bought a shirt for $25 and jeans for $40. How much did he spend in total?",
    "A rectangle has a length of 10 units and a width of 6 units. What's its area?",
    "If a pizza is divided into 8 equal slices and 3 are eaten, how many slices are left?",
    "Alex saved 20% of his monthly salary. If he earned $1000, how much did he save?",
  ];
  const styles = StyleSheet.create({
    page: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#E4E4E4",
    },
    questions: {
      margin: 5,
      padding: 10,
      lineHeight: "1.5pt",
      fontSize: 10,
    },
    h1: {
      marginTop: 5,
      fontSize: 20,
      textAlign: "center",
    },
  });

  return (
    <Document title="Worksheet">
      <Page style={styles.page}>
        <Text style={styles.h1}>Math Problems</Text>
        <View style={styles.questionContainer}>
          {response.map((question, index) => (
            <Text wrap={false} style={styles.questions} key={index}>{`${
              index + 1
            }. ${question}`}</Text>
          ))}
        </View>
      </Page>
    </Document>
  );
};
