import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { style } from "../../Theme";
import { FontAwesome } from "@expo/vector-icons";
import {
  format,
  addDays,
  differenceInWeeks,
  differenceInCalendarMonths,
} from "date-fns";
import { TextInput } from "react-native";

export default function Calculator() {
  const [lmp, setLmp] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [weeksCompleted, setWeeksCompleted] = useState(null);
  const [trimester, setTrimester] = useState(null);

  // BMI calculator
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");

  const calculateDueDate = () => {
    if (!lmp) {
      Alert.alert("Info!", "Please enter the last menstrual period date");
      return;
    }

    const lmpDate = new Date(lmp);
    const estimatedDueDate = addDays(lmpDate, 280);
    const weeks = differenceInWeeks(new Date(), lmpDate);
    const months = differenceInCalendarMonths(new Date(), lmpDate);

    let currentTrimester = "First Trimester";
    if (months >= 3 && months < 6) {
      currentTrimester = "Second Trimester";
    } else if (months >= 6) {
      currentTrimester = "Third Trimester";
    }

    setDueDate(estimatedDueDate);
    setWeeksCompleted(weeks);
    setTrimester(currentTrimester);
  };

  const calculateBMI = () => {
    if (!weight || !height) {
      Alert.alert("Please enter both weight and height");
      return;
    }

    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height) / 100; // Convert height from cm to meters
    const bmiValue = weightNum / (heightNum * heightNum);
    setBmi(bmiValue.toFixed(2)); // Round to 2 decimal places

    if (bmiValue < 18.5) {
      setCategory("Underweight");
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      setCategory("Normal weight");
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      setCategory("Overweight");
    } else {
      setCategory("Obesity");
    }
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 14 }}
    >
      <View style={[style.header, { backgroundColor: "#f7f7f7" }]}>
        <TouchableOpacity
          style={style.headerBackBtn}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome name="angle-left" size={24} />
        </TouchableOpacity>
        <Text style={style.header_text}>Calculators</Text>
      </View>
      <Text
        style={[
          styles.header,
          {
            marginTop: 20,
          },
        ]}
      >
        Pregnancy Checker
      </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Last Menstrual Period (LMP):</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={lmp}
          onChangeText={setLmp}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={calculateDueDate}>
        <Text style={styles.buttonText}>Calculate Due Date</Text>
      </TouchableOpacity>
      {dueDate && (
        <View style={styles.results}>
          <Text style={styles.resultText}>
            Estimated Due Date: {format(dueDate, "yyyy-MM-dd")}
          </Text>
          <Text style={styles.resultText}>
            Weeks Completed: {weeksCompleted}
          </Text>
          <Text style={styles.resultText}>Trimester: {trimester}</Text>
        </View>
      )}
      <Text
        style={[
          styles.header,
          {
            marginTop: 40,
          },
        ]}
      >
        BMI Calculator
      </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Weight (kg):</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your weight"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Height (cm):</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your height"
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={calculateBMI}>
        <Text style={styles.buttonText}>Calculate BMI</Text>
      </TouchableOpacity>
      {bmi && (
        <View style={styles.results}>
          <Text style={styles.resultText}>BMI: {bmi}</Text>
          <Text style={styles.resultText}>Category: {category}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontFamily: "MontserratMedium",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
    fontFamily: "MontserratMedium",
  },
  button: {
    backgroundColor: "teal",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "MontserratMedium",
  },
  results: {
    marginTop: 20,
    fontFamily: "MontserratMedium",
  },
  resultText: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: "MontserratMedium",
  },
  header: {
    fontFamily: "MontserratMedium",
    fontSize: 18,
  },
});
