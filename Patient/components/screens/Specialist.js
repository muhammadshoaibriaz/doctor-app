import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Category from "./Category";
import Category1 from "./Category1";

export default function Specialist() {
  const navigation = useNavigation();
  const onPressNavigate = (specialist) => {
    navigation.navigate("AllSpecialist", { specialist });
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backArrow}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={18} />
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: "MontserratMedium",
            fontSize: 18,
            marginRight: 40,
          }}
        >
          Our Specialist
        </Text>
        <Text style={{}}></Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 14,
        }}
      >
        <Category1
          image={require("../../assets/images/anesthesiologist.png")}
          name="Anesthesiologist"
          onPress={() => onPressNavigate("Anesthesiologist")}
        />
        <Category1
          image={require("../../assets/images/pas.png")}
          name="Cardiologist"
          onPress={() => onPressNavigate("Cardiologist")}
        />
        <Category1
          image={require("../../assets/images/dermatologist.png")}
          name="Dermatologist"
          onPress={() => onPressNavigate("Dermatologist")}
        />
        <Category1
          image={require("../../assets/images/x-ray.png")}
          name="Endocrinologist"
          onPress={() => onPressNavigate("Endocrinologist")}
        />
        <Category1
          image={require("../../assets/images/pas.png")}
          name="Gastroenterologist"
          onPress={() => onPressNavigate("Endocrinologist")}
        />
        <Category1
          image={require("../../assets/images/geneticist.png")}
          name="Geneticist"
          onPress={() => onPressNavigate("Geneticist")}
        />
        <Category1
          image={require("../../assets/images/floss.png")}
          name="Hematologist"
          onPress={() => onPressNavigate("Hematologist")}
        />
        <Category1
          image={require("../../assets/images/virus.png")}
          name="Nephrologist"
          onPress={() => onPressNavigate("Nephrologist")}
        />
        <Category1
          image={require("../../assets/images/pas.png")}
          name="Neurologist"
          onPress={() => onPressNavigate("Neurologist")}
        />
        <Category1
          image={require("../../assets/images/oncologist.png")}
          name="Oncologist"
          onPress={() => onPressNavigate("Oncologist")}
        />
        <Category1
          image={require("../../assets/images/urology.png")}
          name="Ophthalmologist"
          onPress={() => onPressNavigate("Ophthalmologist")}
        />
        <Category1
          image={require("../../assets/images/blood.png")}
          name="Orthopedist"
          onPress={() => onPressNavigate("Orthopedist")}
        />
        <Category1
          image={require("../../assets/images/pngwing.com (4).png")}
          name="Otolaryngologist"
          onPress={() => onPressNavigate("Otolaryngologist")}
        />
        <Category1
          image={require("../../assets/images/floss.png")}
          name="Osteopath"
          onPress={() => onPressNavigate("Osteopath")}
        />
        <Category1
          image={require("../../assets/images/pngegg (1).png")}
          name="Pathologist"
          onPress={() => onPressNavigate("Pathologist")}
        />
        <Category1
          image={require("../../assets/images/pas.png")}
          name="Pediatrician"
          onPress={() => onPressNavigate("Pediatrician")}
        />

        <Category1
          image={require("../../assets/images/floss.png")}
          name="Dentist"
          onPress={() => onPressNavigate("Dentist")}
        />
        <Category1
          image={require("../../assets/images/pas.png")}
          name="Radiologist"
          onPress={() => onPressNavigate("Radiologist")}
        />
        <Category1
          image={require("../../assets/images/pngwing.com (4).png")}
          name="Neurologist"
          onPress={() => onPressNavigate("Neurologist")}
        />
        <Category1
          image={require("../../assets/images/floss.png")}
          name="Dentist"
          onPress={() => onPressNavigate("Dentist")}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
  },
  backArrow: {
    width: 40,
    height: 40,
    justifyContent: "center",
  },
});
