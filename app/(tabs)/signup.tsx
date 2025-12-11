import { Image } from 'expo-image';
import { Link } from 'expo-router';
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

import { Picker } from '@react-native-picker/picker'; // Dropdown

export default function SignupScreen() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [gender, setGender] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    address: '',
    dateOfBirth: '',
  });

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const riseAnim = useRef(new Animated.Value(40)).current;
  const logoFloat = useRef(new Animated.Value(0)).current;

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

    Animated.loop(
      Animated.sequence([
        Animated.timing(logoFloat, {
          toValue: -6,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(logoFloat, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  // Format DOB
  const formatDOB = (text: string) => {
    let cleaned = text.replace(/[^\d]/g, '');
    let formatted = '';

    if (cleaned.length >= 2) formatted = cleaned.slice(0, 2) + '/';
    if (cleaned.length >= 4) formatted += cleaned.slice(2, 4) + '/';
    if (cleaned.length >= 5) formatted += cleaned.slice(4, 8);

    return formatted;
  };

  const handleSignup = () => {
    if (!selectedRole) return alert('Please select your role');

    alert(`${selectedRole} registered successfully!`);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.glowTop} />
      <View style={styles.glowBottom} />

      <Animated.View
        style={[styles.card, { opacity: fadeAnim, transform: [{ translateY: riseAnim }] }]}
      >
        <Animated.View style={{ transform: [{ translateY: logoFloat }] }}>
          <Image source={require('@/assets/images/logo_osra.png')} style={styles.logo} />
        </Animated.View>

        <Text style={styles.title}>Create an Account</Text>

        {/* ROLE DROPDOWN */}
        <View style={styles.dropdownWrapper}>
          <Picker
            selectedValue={selectedRole}
            onValueChange={(value) => setSelectedRole(value)}
            style={styles.dropdown}
            dropdownIconColor="#2563eb"
            itemStyle={{ color: '#0f172a', fontSize: 15 }}
          >
            <Picker.Item label="Select Role" value={null} color="#64748b" />
            <Picker.Item label="Patient" value="Patient" color="#0f172a" />
            <Picker.Item label="Doctor" value="Doctor" color="#0f172a" />
          </Picker>
        </View>

        {/* COMMON FIELDS */}
        <TextInput
          style={styles.input}
          placeholder="First Name"
          placeholderTextColor="#94a3b8"
          value={formData.firstName}
          onChangeText={(t) => handleInputChange('firstName', t)}
        />

        <TextInput
          style={styles.input}
          placeholder="Last Name"
          placeholderTextColor="#94a3b8"
          value={formData.lastName}
          onChangeText={(t) => handleInputChange('lastName', t)}
        />

        <TextInput
          style={styles.input}
          placeholder="Phone"
          placeholderTextColor="#94a3b8"
          keyboardType="phone-pad"
          value={formData.phone}
          onChangeText={(t) => handleInputChange('phone', t)}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#94a3b8"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={(t) => handleInputChange('email', t)}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#94a3b8"
          secureTextEntry
          value={formData.password}
          onChangeText={(t) => handleInputChange('password', t)}
        />

        {/* PATIENT FIELDS */}
        {selectedRole === 'Patient' && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Address"
              placeholderTextColor="#94a3b8"
              value={formData.address}
              onChangeText={(t) => handleInputChange('address', t)}
            />

            <TextInput
              style={styles.input}
              placeholder="Date of Birth (DD/MM/YYYY)"
              placeholderTextColor="#94a3b8"
              keyboardType="numeric"
              maxLength={10}
              value={formData.dateOfBirth}
              onChangeText={(text) =>
                handleInputChange('dateOfBirth', formatDOB(text))
              }
            />

            {/* GENDER DROPDOWN */}
            <View style={styles.dropdownWrapper}>
              <Picker
                selectedValue={gender}
                onValueChange={(value) => setGender(value)}
                style={styles.dropdown}
                dropdownIconColor="#2563eb"
                itemStyle={{ color: '#0f172a', fontSize: 15 }}
              >
                <Picker.Item label="Select Gender" value={null} color="#64748b" />
                <Picker.Item label="Male" value="Male" color="#0f172a" />
                <Picker.Item label="Female" value="Female" color="#0f172a" />
              </Picker>
            </View>
          </>
        )}

        {/* DOCTOR FIELDS */}
        {selectedRole === 'Doctor' && <></>}

        <TouchableOpacity style={styles.button} onPress={handleSignup} activeOpacity={0.85}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.loginText}>
          Already have an account?{' '}
          <Link href="/login" style={styles.loginLink}>
            Login
          </Link>
        </Text>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f9fbff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  glowTop: {
    position: 'absolute',
    top: -120,
    right: -100,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#bfdbfe',
    opacity: 0.35,
  },

  glowBottom: {
    position: 'absolute',
    bottom: -100,
    left: -80,
    width: 260,
    height: 260,
    borderRadius: 140,
    backgroundColor: '#93c5fd',
    opacity: 0.25,
  },

  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#ffffffee',
    borderRadius: 28,
    padding: 30,
    alignItems: 'center',
    elevation: 6,
  },

  logo: {
    width: 90,
    height: 90,
    marginBottom: 8,
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1742cfff',
    marginBottom: 18,
  },
  

  dropdownWrapper: {
    width: '100%',
    backgroundColor: '#f1f5f9',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 14,
    overflow: 'hidden',
    justifyContent: 'center',
  },

  dropdown: {
    height: 52,
    paddingLeft: 20,
    color: '#0f172a',
    fontSize: 15,
  },

  input: {
    width: '100%',
    height: 52,
    backgroundColor: '#f1f5f9',
    borderRadius: 50,
    paddingHorizontal: 20,
    borderColor: '#e2e8f0',
    borderWidth: 1,
    fontSize: 15,
    color: '#0f172a',
    marginBottom: 14,
  },

  button: {
    width: '100%',
    height: 54,
    borderRadius: 50,
    marginTop: 16,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
  },

  loginText: {
    marginTop: 18,
    color: '#64748b',
    fontSize: 14,
  },

  loginLink: {
    color: '#2563eb',
    fontWeight: '600',
  },
});
