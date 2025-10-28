// app/(tabs)/patient-dashboard.tsx
import { Image } from 'expo-image';
import React from 'react';
import {
    Dimensions,
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

// Replace with your asset path
const logo = require('@/assets/images/logo_osra.png');

const WINDOW_WIDTH = Dimensions.get('window').width;

type Appointment = {
  id: string;
  title: string;
  doctor: string;
  datetime: string;
  status?: 'upcoming' | 'next' | 'in-progress' | 'completed';
};
type RecordItem = { id: string; title: string; date: string };
type Invoice = { id: string; title: string; due: string; amount: string };

const APPOINTMENTS: Appointment[] = [
  { id: 'a1', title: 'Cleaning', doctor: 'Dr. Smith', datetime: 'Today, 10:00 AM', status: 'upcoming' },
  { id: 'a2', title: 'Consultation', doctor: 'Dr. Jones', datetime: 'Next Wed, 2:30 PM', status: 'upcoming' },
];

const RECORDS: RecordItem[] = [
  { id: 'r1', title: 'Routine Check-up', date: 'Oct 15, 2023' },
  { id: 'r2', title: 'Cavity Filling', date: 'Jul 22, 2023' },
];

const INVOICES: Invoice[] = [
  { id: 'i1', title: 'Invoice #2023-01', due: 'Due: Nov 30, 2023', amount: '$150.00' },
  { id: 'i2', title: 'Invoice #2023-02', due: 'Due: Oct 25, 2023', amount: '$275.00' },
];

export default function PatientDashboard() {
  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View style={styles.brand}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.brandText}>Osra Clinic</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconBtn}>
            <Text style={styles.iconBtnText}>🔔</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.welcomeTitle}>Welcome back, Jane Doe!</Text>
      <Text style={styles.subText}>Here's a summary of your account.</Text>

      {/* Cards row */}
      <View style={styles.cardsRow}>
        <Card style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>Upcoming Appointments</Text>
          <FlatList
            data={APPOINTMENTS}
            keyExtractor={(i) => i.id}
            renderItem={({ item }) => <AppointmentRow item={item} />}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            scrollEnabled={false}
          />
          <TouchableOpacity style={styles.linkRow}>
            <Text style={styles.linkText}>See All Appointments</Text>
          </TouchableOpacity>
        </Card>

        <Card style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>Latest Medical Records</Text>
          <FlatList
            data={RECORDS}
            keyExtractor={(i) => i.id}
            renderItem={({ item }) => <RecordRow item={item} />}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            scrollEnabled={false}
          />
          <TouchableOpacity style={styles.linkRow}>
            <Text style={styles.linkText}>See All Medical Records</Text>
          </TouchableOpacity>
        </Card>

        <Card style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>Unpaid Invoices</Text>
          <FlatList
            data={INVOICES}
            keyExtractor={(i) => i.id}
            renderItem={({ item }) => <InvoiceRow item={item} />}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            scrollEnabled={false}
          />
          <TouchableOpacity style={styles.linkRow}>
            <Text style={styles.linkText}>See All Invoices</Text>
          </TouchableOpacity>
        </Card>
      </View>

      {/* Optional "Up Next" panel similar to your example */}
      <View style={styles.upNextRow}>
        <View style={styles.upNextCard}>
          <Text style={styles.upNextTitle}>Up Next</Text>
          <View style={styles.upNextContent}>
            <View style={styles.avatarBox}>
              <Text style={styles.avatarText}>JD</Text>
            </View>
            <View style={{ flex: 1, paddingLeft: 12 }}>
              <Text style={styles.upNextName}>John Doe</Text>
              <Text style={styles.upNextSub}>9:00 AM · Annual Checkup</Text>
              <Text style={styles.noteTitle}>Notes</Text>
              <Text style={styles.noteBody}>
                Patient reported sensitivity in upper right molar. Last X-rays were 12 months ago.
              </Text>

              <View style={styles.upNextButtons}>
                <TouchableOpacity style={styles.primaryBtn}><Text style={styles.primaryBtnText}>Start Appointment</Text></TouchableOpacity>
                <TouchableOpacity style={styles.ghostBtn}><Text style={styles.ghostBtnText}>View Patient Chart</Text></TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.calendarBtn}>
          <Text style={styles.calendarBtnText}>Go to Full Calendar →</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

/* ----- Mini components ----- */

function Card({ children, style }: { children: React.ReactNode; style?: any }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

function AppointmentRow({ item }: { item: Appointment }) {
  return (
    <View style={styles.row}>
      <View style={styles.rowLeft}>
        <View style={styles.eventIcon}><Text style={{ fontSize: 18 }}>📅</Text></View>
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.rowTitle}>{item.title}</Text>
          <Text style={styles.rowSub}>{item.doctor} · {item.datetime}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.detailBtn}>
        <Text style={styles.detailBtnText}>Details</Text>
      </TouchableOpacity>
    </View>
  );
}

function RecordRow({ item }: { item: RecordItem }) {
  return (
    <View style={styles.row}>
      <View style={styles.rowLeft}>
        <View style={styles.recordIcon}><Text style={{ fontSize: 18 }}>📄</Text></View>
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.rowTitle}>{item.title}</Text>
          <Text style={styles.rowSub}>{item.date}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.viewBtn}>
        <Text style={styles.viewBtnText}>View</Text>
      </TouchableOpacity>
    </View>
  );
}

function InvoiceRow({ item }: { item: Invoice }) {
  return (
    <View style={styles.row}>
      <View style={styles.rowLeft}>
        <View style={styles.invoiceIcon}><Text style={{ fontSize: 18 }}>🧾</Text></View>
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.rowTitle}>{item.title}</Text>
          <Text style={styles.rowSub}>{item.due} · {item.amount}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.payBtn}>
        <Text style={styles.payBtnText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
}

/* ----- Styles ----- */

const PRIMARY = '#0EA5E9'; // blue accent
const CARD_BG = '#FFFFFF';
const BG = '#F8FAFC';
const MUTED = '#6B7280';
const CARD_SHADOW = {
  shadowColor: '#000',
  shadowOpacity: 0.08,
  shadowRadius: 12,
  shadowOffset: { width: 0, height: 6 },
  elevation: 3,
};

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: BG },
  content: { paddingVertical: 26, paddingHorizontal: 18 },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  brand: { flexDirection: 'row', alignItems: 'center' },
  logo: { width: 44, height: 44, marginRight: 10 },
  brandText: { fontSize: 16, fontWeight: '700', color: '#111827' },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    ...CARD_SHADOW,
  },
  iconBtnText: { fontSize: 18 },

  welcomeTitle: { fontSize: 28, fontWeight: '800', color: '#0f172a', marginTop: 6 },
  subText: { color: MUTED, marginTop: 6, marginBottom: 18 },

  cardsRow: {
    flexDirection: WINDOW_WIDTH > 900 ? 'row' : 'column',
    gap: 16,
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: CARD_BG,
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
    ...CARD_SHADOW,
    minWidth: 260,
    marginRight: 0,
  },
  cardTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12, color: '#0f172a' },

  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  rowLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  eventIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#EEF8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  invoiceIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#FFF7ED',
    alignItems: 'center',
    justifyContent: 'center',
  },

  rowTitle: { fontSize: 15, fontWeight: '700', color: '#0f172a' },
  rowSub: { fontSize: 13, color: MUTED, marginTop: 3 },

  detailBtn: {
    backgroundColor: '#E6F4FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginLeft: 12,
  },
  detailBtnText: { color: PRIMARY, fontWeight: '700' },

  viewBtn: {
    backgroundColor: '#ECFFF6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginLeft: 12,
  },
  viewBtnText: { color: '#10B981', fontWeight: '700' },

  payBtn: {
    backgroundColor: '#FFEDD5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginLeft: 12,
  },
  payBtnText: { color: '#F59E0B', fontWeight: '700' },

  linkRow: { marginTop: 16, alignItems: 'flex-start' },
  linkText: { color: PRIMARY, fontWeight: '600' },

  upNextRow: {
    marginTop: 10,
    flexDirection: 'column',
  },
  upNextCard: {
    backgroundColor: CARD_BG,
    borderRadius: 12,
    padding: 16,
    ...CARD_SHADOW,
  },
  upNextTitle: { fontSize: 16, fontWeight: '800', marginBottom: 12 },
  upNextContent: { flexDirection: 'row' },
  avatarBox: {
    width: 84,
    height: 84,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontWeight: '800', color: '#0f172a', fontSize: 20 },

  upNextName: { fontSize: 16, fontWeight: '700' },
  upNextSub: { color: MUTED, marginTop: 4, marginBottom: 8 },

  noteTitle: { fontSize: 13, fontWeight: '700', marginTop: 8 },
  noteBody: { color: MUTED, marginTop: 6, lineHeight: 18 },

  upNextButtons: { flexDirection: 'row', marginTop: 12, gap: 12 },
  primaryBtn: {
    backgroundColor: PRIMARY,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  primaryBtnText: { color: '#fff', fontWeight: '700' },
  ghostBtn: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginLeft: 10,
  },
  ghostBtnText: { color: '#374151', fontWeight: '700' },

  calendarBtn: {
    marginTop: 12,
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  calendarBtnText: { color: '#374151', fontWeight: '700' },
});
