import { React } from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

export const MyDocument = ({ response, info }) => {
  const styles = StyleSheet.create({
    page: {
      display: "flex",
      flexDirection: "column",
      padding: 20,
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
    header: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      // Add other styles for the header here
    },
    studentInfo: {
      textAlign: "center",
      fontSize: 10,
      margin: 5,
    },
    leftHeader: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
  });

  return (
    <Document title={info?.topic === "" ? "Worksheet" : info?.topic}>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.studentInfo}>Name: _______________</Text>
          <View style={styles.leftHeader}>
            <Text style={styles.studentInfo}>Period: ____</Text>
            <Text style={styles.studentInfo}>Date: ______</Text>
          </View>
        </View>
        <Text style={styles.h1}>{info?.topic}</Text>
        <View style={styles.questionContainer}>
          {response[0].map((question, index) => (
            <Text wrap={false} style={styles.questions} key={index}>{`${
              index + 1
            }. ${question}`}</Text>
          ))}
        </View>
      </Page>
      {response[1].length ? (
        <Page styles={styles.page}>
          <Text style={styles.h1}>Answer Key</Text>
          <View style={styles.questionContainer}>
            {response[1].map((answer, index) => (
              <Text wrap={false} style={styles.questions} key={index}>{`${
                index + 1
              }. ${answer}`}</Text>
            ))}
          </View>
        </Page>
      ) : null}
    </Document>
  );
};
