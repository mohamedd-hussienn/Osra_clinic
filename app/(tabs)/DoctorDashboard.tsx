import { Image } from 'expo-image';
import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CARD_BG, CARD_SHADOW, MUTED, PRIMARY } from './PatientDashboard';

const WINDOW_WIDTH = Dimensions.get('window').width;

const NAV_ITEMS = [
  { label: 'Dashboard', icon: '🏠', path: '/DoctorDashboard' },
  { label: 'Appointments', icon: '🗓️', path: '/DentistAppointments' },
  { label: 'My Patients', icon: '🧍‍♂️', path: '/MyPatients' },
  { label: 'EMR', icon: '🩺', path: '/emr' },
  { label: 'Treatments & Drugs', icon: '💊', path: '/TreatmentsDrugs' },
  { label: 'Reports', icon: '📊', path: '/Reports' },
  { label: 'Profile', icon: '👤', path: '/profile' },
  { label: 'Logout', icon: '🚪', path: '/login' },
];

const STATS = [
  { id: 1, title: "Today's Appointments", value: '5', change: '+1 from yesterday', icon: '🗓️' },
  { id: 2, title: 'Total Patients', value: '28', change: '+3 new this week', icon: '👥' },
  { id: 3, title: 'Pending EMRs', value: '3', change: 'Needs update', icon: '🩺' },
];

const SCHEDULE = [
  { id: 1, time: '09:00 AM', name: 'Ahmed Ali', detail: 'Consultation' },
  { id: 2, time: '10:30 AM', name: 'Sara Mohamed', detail: 'Follow-up' },
  { id: 3, time: '12:00 PM', name: 'Omar Khaled', detail: 'Check-up' },
];

export default function DoctorDashboard() {
  const router = useRouter();
  const currentPath = usePathname();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <View style={styles.sidebar}>
        <View style={styles.logoSection}>
          <Image source={require('@/assets/images/logo_osra.png')} style={styles.logo} />
          <Text style={styles.brandText}>Osra Clinic</Text>
        </View>

        <View style={styles.navSection}>
          {NAV_ITEMS.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <TouchableOpacity
                key={item.label}
                style={[styles.navItem, isActive && styles.navItemActive]}
                onPress={() => handleNavigation(item.path)}
              >
                <Text style={[styles.navIcon, isActive && styles.navIconActive]}>{item.icon}</Text>
                <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>{item.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <Text style={styles.searchBar}>🔍 Search patients, treatments...</Text>
          <View style={styles.profileBox}>
            <Text style={styles.profileName}>Dr. Ahmed Hassan</Text>
            <Text style={styles.profileRole}>Dentist</Text>
          </View>
        </View>

        {/* Scrollable Body */}
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.pageTitle}>Dashboard</Text>
          <Text style={styles.subText}>Daily summary and appointments</Text>

          {/* Stats Cards */}
          <View style={styles.cardsRow}>
            {STATS.map((item) => (
              <View key={item.id} style={styles.card}>
                <Text style={styles.cardIcon}>{item.icon}</Text>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardValue}>{item.value}</Text>
                <Text style={styles.cardChange}>{item.change}</Text>
              </View>
            ))}
          </View>

          {/* Schedule Section */}
          <View style={styles.largeCard}>
            <Text style={styles.sectionTitle}>Today's Schedule - Oct 29</Text>
            {SCHEDULE.map((item) => (
              <View key={item.id} style={styles.scheduleRow}>
                <View style={styles.timeBadge}>
                  <Text style={styles.timeText}>{item.time}</Text>
                </View>
                <View>
                  <Text style={styles.scheduleName}>{item.name}</Text>
                  <Text style={styles.scheduleDetail}>{item.detail}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={{ height: 60 }} />
        </ScrollView>
      </View>
    </View>
  );
}

/* ----- Styles ----- */
const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', backgroundColor: '#F8FAFC' },
  sidebar: {
    width: 230,
    backgroundColor: '#fff',
    borderRightColor: '#E5E7EB',
    borderRightWidth: 1,
    paddingVertical: 20,
    justifyContent: 'space-between',
    ...CARD_SHADOW,
  },
  logoSection: { alignItems: 'center', marginBottom: 30 },
  logo: { width: 42, height: 42, marginBottom: 6 },
  brandText: { fontSize: 18, fontWeight: '800', color: '#0f172a' },
  roleText: { fontSize: 13, color: MUTED },

  navSection: { gap: 20, paddingHorizontal: 10 },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  navItemActive: { backgroundColor: '#E0F2FE' },
  navIcon: { fontSize: 18, marginRight: 8, color: MUTED },
  navLabel: { fontSize: 15, color: '#374151' },
  navIconActive: { color: PRIMARY },
  navLabelActive: { color: PRIMARY, fontWeight: '700' },

  mainContent: { flex: 1 },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: 1,
  },
  searchBar: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    color: MUTED,
  },
  profileBox: { alignItems: 'flex-end' },
  profileName: { fontWeight: '700', color: '#0f172a' },
  profileRole: { color: MUTED, fontSize: 13 },

  content: { padding: 20 },
  pageTitle: { fontSize: 28, fontWeight: '800', color: '#0f172a' },
  subText: { color: MUTED, marginBottom: 18 },

  cardsRow: {
    flexDirection: WINDOW_WIDTH > 900 ? 'row' : 'column',
    gap: 16,
    marginBottom: 20,
  },
  card: {
    backgroundColor: CARD_BG,
    borderRadius: 12,
    padding: 18,
    flex: 1,
    ...CARD_SHADOW,
  },
  cardIcon: { fontSize: 24, marginBottom: 6 },
  cardTitle: { color: '#0f172a', fontWeight: '700' },
  cardValue: { fontSize: 24, fontWeight: '800', marginVertical: 4 },
  cardChange: { fontSize: 13, color: '#10B981' },

  largeCard: {
    backgroundColor: CARD_BG,
    borderRadius: 12,
    padding: 18,
    ...CARD_SHADOW,
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 10 },

  scheduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 10,
  },
  timeBadge: {
    backgroundColor: '#E0F2FE',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  timeText: { color: PRIMARY, fontWeight: '700', fontSize: 12 },
  scheduleName: { fontWeight: '700', color: '#0f172a' },
  scheduleDetail: { color: MUTED, fontSize: 13 },
});
