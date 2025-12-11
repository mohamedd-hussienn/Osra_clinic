import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Easing,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function MedicalRecordScreen() {
  const [record, setRecord] = useState({
    bloodType: '',
    height: '',
    weight: '',
    allergies: '',
    conditions: '',
    medications: '',
    notes: '',
  });

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const riseAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(riseAnim, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.back(1.3)),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setRecord({ ...record, [field]: value });
  };

  const saveRecord = () => {
    console.log("Saved Medical Record:", record);
    alert("Medical record saved successfully!");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.glowTop} />
      <View style={styles.glowBottom} />

      <Animated.View
        style={[styles.card, { opacity: fadeAnim, transform: [{ translateY: riseAnim }] }]}
      >
        <Text style={styles.title}>Medical Record</Text>

        {/* BLOOD TYPE */}
        <View style={styles.dropdownWrapper}>
          <Picker
            selectedValue={record.bloodType}
            onValueChange={(value) => handleInputChange('bloodType', value)}
            style={styles.dropdown}
            dropdownIconColor="#2563eb"
            itemStyle={{ color: "#0f172a", fontSize: 15 }}
          >
            <Picker.Item label="Blood Type" value="" color="#64748b" />
            <Picker.Item label="A+" value="A+" color="#0f172a" />
            <Picker.Item label="A-" value="A-" color="#0f172a" />
            <Picker.Item label="B+" value="B+" color="#0f172a" />
            <Picker.Item label="B-" value="B-" color="#0f172a" />
            <Picker.Item label="AB+" value="AB+" color="#0f172a" />
            <Picker.Item label="AB-" value="AB-" color="#0f172a" />
            <Picker.Item label="O+" value="O+" color="#0f172a" />
            <Picker.Item label="O-" value="O-" color="#0f172a" />
          </Picker>
        </View>

        {/* HEIGHT */}
        <TextInput
          style={styles.input}
          placeholder="Height (cm)"
          placeholderTextColor="#94a3b8"
          keyboardType="numeric"
          value={record.height}
          onChangeText={(t) => handleInputChange("height", t)}
        />

        {/* WEIGHT */}
        <TextInput
          style={styles.input}
          placeholder="Weight (kg)"
          placeholderTextColor="#94a3b8"
          keyboardType="numeric"
          value={record.weight}
          onChangeText={(t) => handleInputChange("weight", t)}
        />

        {/* ALLERGIES */}
        <TextInput
          style={styles.inputLarge}
          placeholder="Allergies"
          placeholderTextColor="#94a3b8"
          multiline
          value={record.allergies}
          onChangeText={(t) => handleInputChange("allergies", t)}
        />

        {/* CONDITIONS */}
        <TextInput
          style={styles.inputLarge}
          placeholder="Chronic Conditions"
          placeholderTextColor="#94a3b8"
          multiline
          value={record.conditions}
          onChangeText={(t) => handleInputChange("conditions", t)}
        />

        {/* MEDICATIONS */}
        <TextInput
          style={styles.inputLarge}
          placeholder="Medications"
          placeholderTextColor="#94a3b8"
          multiline
          value={record.medications}
          onChangeText={(t) => handleInputChange("medications", t)}
        />

        {/* NOTES */}
        <TextInput
          style={styles.inputLarge}
          placeholder="Additional Notes"
          placeholderTextColor="#94a3b8"
          multiline
          value={record.notes}
          onChangeText={(t) => handleInputChange("notes", t)}
        />

        {/* SAVE BUTTON */}
        <TouchableOpacity style={styles.button} onPress={saveRecord} activeOpacity={0.85}>
          <Text style={styles.buttonText}>Save Record</Text>
        </TouchableOpacity>

      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f9fbff",
    alignItems: "center",
    padding: 20,
  },

  glowTop: {
    position: "absolute",
    top: -120,
    right: -100,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: "#bfdbfe",
    opacity: 0.35,
  },

  glowBottom: {
    position: "absolute",
    bottom: -100,
    left: -80,
    width: 260,
    height: 260,
    borderRadius: 140,
    backgroundColor: "#93c5fd",
    opacity: 0.25,
  },

  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#ffffffee",
    borderRadius: 28,
    padding: 30,
    alignItems: "center",
    elevation: 6,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1e40af",
    marginBottom: 18,
  },

  dropdownWrapper: {
    width: "100%",
    backgroundColor: "#f1f5f9",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 14,
    overflow: "hidden",
  },

  dropdown: {
    height: 52,
    paddingLeft: 20,
    color: "#0f172a",
    fontSize: 15,
  },

  input: {
    width: "100%",
    height: 52,
    backgroundColor: "#f1f5f9",
    borderRadius: 50,
    paddingHorizontal: 20,
    borderColor: "#e2e8f0",
    borderWidth: 1,
    marginBottom: 14,
    fontSize: 15,
    color: "#0f172a",
  },

  inputLarge: {
    width: "100%",
    minHeight: 90,
    backgroundColor: "#f1f5f9",
    borderRadius: 22,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderColor: "#e2e8f0",
    borderWidth: 1,
    marginBottom: 14,
    fontSize: 15,
    color: "#0f172a",
    textAlignVertical: "top",
  },

  button: {
    width: "100%",
    height: 54,
    borderRadius: 50,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "700",
  },
});
