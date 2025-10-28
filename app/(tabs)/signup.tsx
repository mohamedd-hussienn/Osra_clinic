import Checkbox from 'expo-checkbox';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignupScreen() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    dateOfBirth: '',
    gender: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSignup = () => {
    if (!selectedRole) {
      alert('Please select your role');
      return;
    }
    console.log('Signup Data:', { role: selectedRole, ...formData });
    alert(`${selectedRole} registered successfully!`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo */}
      <Image source={require('@/assets/images/logo_osra.png')} style={styles.logo} />

      <Text style={styles.title}>Create an Account</Text>

      {/* Role Selection */}
      <View style={styles.checkboxContainer}>
        <View style={styles.checkboxRow}>
          <Checkbox
            value={selectedRole === 'Patient'}
            onValueChange={() => setSelectedRole('Patient')}
            color={selectedRole === 'Patient' ? '#007AFF' : undefined}
          />
          <Text style={styles.checkboxLabel}>Patient</Text>
        </View>

        <View style={styles.checkboxRow}>
          <Checkbox
            value={selectedRole === 'Doctor'}
            onValueChange={() => setSelectedRole('Doctor')}
            color={selectedRole === 'Doctor' ? '#007AFF' : undefined}
          />
          <Text style={styles.checkboxLabel}>Doctor</Text>
        </View>

        <View style={styles.checkboxRow}>
          <Checkbox
            value={selectedRole === 'Admin'}
            onValueChange={() => setSelectedRole('Admin')}
            color={selectedRole === 'Admin' ? '#007AFF' : undefined}
          />
          <Text style={styles.checkboxLabel}>Admin</Text>
        </View>
      </View>

      {/* Common Fields */}
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={formData.firstName}
        onChangeText={(text) => handleInputChange('firstName', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={formData.lastName}
        onChangeText={(text) => handleInputChange('lastName', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        keyboardType="phone-pad"
        value={formData.phone}
        onChangeText={(text) => handleInputChange('phone', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={formData.email}
        onChangeText={(text) => handleInputChange('email', text)}
      />

      {/* Role-Specific Fields */}
      {selectedRole === 'Patient' && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={formData.address}
            onChangeText={(text) => handleInputChange('address', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Date of Birth"
            value={formData.dateOfBirth}
            onChangeText={(text) => handleInputChange('dateOfBirth', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Gender"
            value={formData.gender}
            onChangeText={(text) => handleInputChange('gender', text)}
          />
        </>
      )}

      {/* Signup Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Already have an account */}
      <Text style={styles.loginText}>
        Already have an account?{' '}
        <Link href="/login" style={styles.loginLink}>
          Login
        </Link>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F9FC',
    padding: 20,
  },
  logo: {
    width: 130,
    height: 130,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#007AFF',
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 15,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    marginLeft: 6,
    fontSize: 16,
    color: '#333',
  },
  input: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    width: '90%',
    paddingVertical: 14,
    marginTop: 15,
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  loginText: {
    marginTop: 20,
    fontSize: 15,
    color: '#333',
  },
  loginLink: {
    color: '#007affff',
    fontWeight: '600',
  },
});
