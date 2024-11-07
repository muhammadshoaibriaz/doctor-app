import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { Component } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Carousel from "react-native-snap-carousel";

export default function PrivacyPolicy() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: "#f7f7f7" }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu-sharp" size={22} />
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: "MontserratMedium",
            fontSize: 18,
            alignSelf: "center",
            marginRight: 10,
          }}
        >
          PrivacyPolicy
        </Text>
        <View></View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 14 }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "MontserratMedium",
            }}
          >
            HotDoc App Privacy Policy
          </Text>
          <Text
            style={{
              fontFamily: "MontserratRegular",
              color: "#707070",
              marginTop: 10,
            }}
          >
            At HotDoc, we prioritize the protection of your privacy and the
            security of your personal information. Our commitment to
            safeguarding your data is reflected in every aspect of our mobile
            application and the services we provide. By using the HotDoc App,
            you entrust us with your personal information, and we take this
            responsibility seriously. This Privacy Policy outlines how we
            collect, use, and safeguard your data to ensure transparency and
            build trust with our users. When you use the HotDoc App, we may
            collect various types of information to enhance your experience and
            facilitate the services we offer. This includes personal data such
            as your name, contact details, date of birth, and address, as well
            as any medical information you choose to share with us. We may also
            collect usage data, including information about your interactions
            with the App, such as the features you use, the pages you visit, and
            your preferences. We use the information we collect for several
            purposes, including but not limited to: 1. **Appointment
            Scheduling**: We use your personal information to facilitate the
            booking and management of appointments with healthcare providers. 2.
            **Service Improvement**: By analyzing usage data, we gain insights
            into how users interact with the App, allowing us to identify areas
            for improvement and enhance the user experience. 3.
            **Communication**: We use your contact information to communicate
            with you about your appointments, health-related information, and
            other relevant updates and reminders. At HotDoc, we are committed to
            protecting the security and confidentiality of your personal
            information. We implement a range of technical, administrative, and
            physical safeguards to prevent unauthorized access, disclosure,
            alteration, or destruction of your data. These measures include
            encryption, access controls, regular security assessments, and
            compliance with industry standards and regulations. While we take
            every precaution to protect your data, it's important to note that
            no method of transmission over the internet or electronic storage is
            completely secure. Despite our best efforts, we cannot guarantee the
            absolute security of your information. However, we continuously
            monitor and update our security measures to adapt to new threats and
            ensure the highest level of protection for your data. HotDoc does
            not sell, trade, or rent your personal information to third parties
            for marketing purposes. However, we may share your information with
            healthcare providers, clinics, and other entities involved in
            facilitating your appointments and providing healthcare services to
            you. We may also disclose your information in response to legal
            requirements, court orders, or governmental regulations, or to
            protect the rights, property, or safety of HotDoc, our users, or
            others. Your use of the HotDoc App constitutes your consent to the
            collection, use, and sharing of your information as described in
            this Privacy Policy. If you do not agree with any part of this
            Privacy Policy, please do not use the HotDoc App. You have the right
            to access, update, and correct your personal information stored in
            the App, and you can choose to delete your account and personal data
            from our systems, subject to certain limitations and legal
            requirements. HotDoc may update this Privacy Policy from time to
            time to reflect changes in our practices or legal requirements. We
            will notify you of any changes by posting the updated Privacy Policy
            on this page. It's important to review this Privacy Policy
            periodically for any updates or changes. If you have any questions
            or concerns about our Privacy Policy or the practices implemented
            within the HotDoc App, please contact us at [insert contact
            information]. Thank you for trusting HotDoc with your healthcare
            needs.
          </Text>
        </View>
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
  book: {
    backgroundColor: "teal",
    height: 50,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginHorizontal: 14,
    width: "92%",
    marginTop: 30,
  },
  card: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    height: "auto",
    marginHorizontal: 14,
    marginTop: 20,
  },
  input: {
    height: 40,
    fontFamily: "MontserratRegular",
  },
});
