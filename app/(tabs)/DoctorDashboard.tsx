
// // DentistDashboard.tsx
// import { Image } from 'expo-image';
// import { useRouter } from 'expo-router';
// import React from 'react';
// import {
//   Dimensions,
//   FlatList,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// const PRIMARY = '#0EA5E9';
// const CARD_BG = '#FFFFFF';
// const BG = '#F8FAFC';
// const MUTED = '#6B7280';
// const CARD_SHADOW = {
//   shadowColor: '#000',
//   shadowOpacity: 0.08,
//   shadowRadius: 12,
//   shadowOffset: { width: 0, height: 6 },
//   elevation: 3,
// };

// const WINDOW_WIDTH = Dimensions.get('window').width;
// const logo = require('@/assets/images/logo_osra.png');

// type Appointment = {
//   id: string;
//   patientName: string;
//   datetimeISO: string;
//   treatment: string;
//   status?: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
//   room?: string;
// };

// const APPOINTMENTS: Appointment[] = [
//   { id: 'd1', patientName: 'John Doe', datetimeISO: '2025-10-29T09:00:00', treatment: 'Cleaning', status: 'scheduled', room: 'A1' },
//   { id: 'd2', patientName: 'Sara Ali', datetimeISO: '2025-10-29T10:30:00', treatment: 'Root Canal', status: 'scheduled', room: 'A2' },
//   { id: 'd3', patientName: 'Omar Khaled', datetimeISO: '2025-10-29T14:00:00', treatment: 'Crown', status: 'scheduled', room: 'B1' },
//   { id: 'd4', patientName: 'Lina Hassan', datetimeISO: '2025-10-30T11:00:00', treatment: 'Consultation', status: 'scheduled', room: 'A1' },
//   { id: 'd5', patientName: 'Mona Farid', datetimeISO: '2025-11-01T08:30:00', treatment: 'Extraction', status: 'scheduled', room: 'B2' },
// ];

// type Patient = { id: string; name: string; lastVisitISO: string; phone?: string };
// const PATIENTS: Patient[] = [
//   { id: 'p1', name: 'John Doe', lastVisitISO: '2025-10-29T09:00:00', phone: '+201234567890' },
//   { id: 'p2', name: 'Sara Ali', lastVisitISO: '2025-09-12T11:00:00', phone: '+201112223334' },
//   { id: 'p3', name: 'Omar Khaled', lastVisitISO: '2025-10-05T14:00:00', phone: '+201199988877' },
// ];

// function formatTime(iso: string) {
//   const d = new Date(iso);
//   const hours = d.getHours();
//   const minutes = d.getMinutes().toString().padStart(2, '0');
//   const ampm = hours >= 12 ? 'PM' : 'AM';
//   const h12 = ((hours + 11) % 12) + 1;
//   return `${h12}:${minutes} ${ampm}`;
// }
// function formatDateShort(iso: string) {
//   const d = new Date(iso);
//   return d.toLocaleDateString();
// }
// function isSameDayISO(isoA: string, isoB: Date) {
//   const a = new Date(isoA);
//   return (
//     a.getFullYear() === isoB.getFullYear() &&
//     a.getMonth() === isoB.getMonth() &&
//     a.getDate() === isoB.getDate()
//   );
// }

// export default function DentistDashboard() {
//   const router = useRouter();
//   const today = new Date();

//   const todaysAppointments = APPOINTMENTS.filter((ap) =>
//     isSameDayISO(ap.datetimeISO, today)
//   ).sort((a, b) => new Date(a.datetimeISO).getTime() - new Date(b.datetimeISO).getTime());

//   const upcoming = APPOINTMENTS.filter(
//     (ap) => new Date(ap.datetimeISO).getTime() >= today.setHours(0, 0, 0, 0)
//   )
//     .sort((a, b) => new Date(a.datetimeISO).getTime() - new Date(b.datetimeISO).getTime())
//     .slice(0, 6);

//   const numToday = todaysAppointments.length;
//   const totalPatients = PATIENTS.length;
//   const nextAppointment =
//     todaysAppointments[0] ??
//     APPOINTMENTS.sort(
//       (a, b) => new Date(a.datetimeISO).getTime() - new Date(b.datetimeISO).getTime()
//     )[0];

//   return (
//     <ScrollView style={styles.page} contentContainerStyle={styles.content}>
//       {/* Header */}
//       <View style={styles.headerRow}>
//         <View style={styles.brand}>
//           <Image source={logo} style={styles.logo} />
//           <Text style={styles.brandText}>Osra Clinic — Dentist</Text>
//         </View>

//         <View style={styles.headerRight}>
//           <TouchableOpacity style={styles.iconBtn}>
//             <Text style={styles.iconBtnText}>🔔</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* 🔝 Quick Access Buttons */}
//       <Text style={styles.sectionTitle}>Quick Access</Text>
//       <View
//         style={{
//           flexWrap: 'wrap',
//           flexDirection: 'row',
//           gap: 12,
//           justifyContent: 'space-between',
//           marginBottom: 16,
//         }}
//       >
//         <TouchableOpacity
//           style={[styles.actionCard, { flexBasis: '48%' }]}
//           onPress={() => router.push('/DentistAppointments')}
//         >
//           <Text style={styles.actionTitle}>🗓 Appointments</Text>
//           <Text style={styles.actionSub}>Manage all appointments</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.actionCard, { flexBasis: '48%' }]}
//           onPress={() => router.push('/MyPatients')}
//         >
//           <Text style={styles.actionTitle}>🧍‍♂ My Patients</Text>
//           <Text style={styles.actionSub}>View patient history</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.actionCard, { flexBasis: '48%' }]}
//           onPress={() => router.push('/emr')}
//         >
//           <Text style={styles.actionTitle}>🩺 EMR</Text>
//           <Text style={styles.actionSub}>Add or edit records</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.actionCard, { flexBasis: '48%' }]}
//           onPress={() => router.push('/TreatmentsDrugs')}
//         >
//           <Text style={styles.actionTitle}>💊 Treatments & Drugs</Text>
//           <Text style={styles.actionSub}>Reference data</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.actionCard, { flexBasis: '48%' }]}
//           onPress={() => router.push('/DentistProfile')}
//         >
//           <Text style={styles.actionTitle}>👤 Profile</Text>
//           <Text style={styles.actionSub}>Manage account</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Stats */}
//       <View style={styles.statsRow}>
//         <StatCard
//           title="Appointments Today"
//           value={`${numToday}`}
//           subtitle={today.toDateString()}
//           onPress={() => router.push('/my-appointment')}
//         />
//         <StatCard
//           title="Next Appointment"
//           value={nextAppointment ? `${formatTime(nextAppointment.datetimeISO)}` : '—'}
//           subtitle={
//             nextAppointment
//               ? `${nextAppointment.patientName} · ${nextAppointment.treatment}`
//               : ''
//           }
//           onPress={() => router.push('/my-appointment')}
//         />
//         <StatCard
//           title="Patients"
//           value={`${totalPatients}`}
//           subtitle="Quick access"
//           onPress={() => router.push('/MyPatients')}
//         />
//       </View>

//       {/* Schedule */}
//       <View style={[styles.card, { marginTop: 12 }]}>
//         <Text style={styles.sectionTitle}>Today's Schedule</Text>
//         {todaysAppointments.length === 0 ? (
//           <Text style={styles.emptyText}>No appointments today.</Text>
//         ) : (
//           <FlatList
//             data={todaysAppointments}
//             keyExtractor={(i) => i.id}
//             ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
//             renderItem={({ item }) => (
//               <View style={styles.scheduleRow}>
//                 <View style={{ flex: 1 }}>
//                   <Text style={styles.scheduleTime}>{formatTime(item.datetimeISO)}</Text>
//                   <Text style={styles.scheduleName}>
//                     {item.patientName} · {item.treatment}
//                   </Text>
//                   <Text style={styles.scheduleMeta}>
//                     {item.room ? `Room ${item.room}` : ''} · {item.status}
//                   </Text>
//                 </View>
//                 <View style={styles.rowActions}>
//                   <TouchableOpacity
//                     style={styles.smallBtn}
//                     onPress={() => router.push(`/patient/${item.id}`)}
//                   >
//                     <Text style={styles.smallBtnText}>Open</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     style={styles.smallGhost}
//                     onPress={() => {}}
//                   >
//                     <Text style={styles.smallGhostText}>Reschedule</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             )}
//           />
//         )}
//       </View>

//       {/* Upcoming */}
//       <View style={[styles.card, { marginTop: 12 }]}>
//         <View
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//           }}
//         >
//           <Text style={styles.sectionTitle}>Upcoming</Text>
//           <TouchableOpacity onPress={() => router.push('/calendar')}>
//             <Text style={styles.linkText}>See full calendar</Text>
//           </TouchableOpacity>
//         </View>

//         <FlatList
//           data={upcoming}
//           keyExtractor={(i) => i.id}
//           ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
//           renderItem={({ item }) => (
//             <View style={styles.upcomingRow}>
//               <View>
//                 <Text style={styles.upcomingDate}>
//                   {formatDateShort(item.datetimeISO)} · {formatTime(item.datetimeISO)}
//                 </Text>
//                 <Text style={styles.upcomingPatient}>
//                   {item.patientName} — {item.treatment}
//                 </Text>
//               </View>
//               <TouchableOpacity
//                 style={styles.ghostBtn}
//                 onPress={() => router.push(`/patient/${item.id}`)}
//               >
//                 <Text style={styles.ghostBtnText}>Patient</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//         />
//       </View>

//       <View style={{ height: 60 }} />
//     </ScrollView>
//   );
// }

// /* --------------- Mini components & styles --------------- */

// function StatCard({
//   title,
//   value,
//   subtitle,
//   onPress,
// }: {
//   title: string;
//   value: string;
//   subtitle?: string;
//   onPress?: () => void;
// }) {
//   return (
//     <TouchableOpacity style={[styles.statCard]} onPress={onPress}>
//       <Text style={styles.statTitle}>{title}</Text>
//       <Text style={styles.statValue}>{value}</Text>
//       {subtitle ? <Text style={styles.statSubtitle}>{subtitle}</Text> : null}
//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({
//   page: { flex: 1, backgroundColor: BG },
//   content: { paddingVertical: 18, paddingHorizontal: 16 },

//   headerRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 12,
//     paddingHorizontal: 2,
//   },
//   brand: { flexDirection: 'row', alignItems: 'center' },
//   logo: { width: 44, height: 44, marginRight: 10 },
//   brandText: { fontSize: 18, fontWeight: '800', color: '#0f172a' },
//   headerRight: { flexDirection: 'row', alignItems: 'center' },
//   iconBtn: {
//     width: 38,
//     height: 38,
//     borderRadius: 10,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     ...CARD_SHADOW,
//   },
//   iconBtnText: { fontSize: 18 },

//   statsRow: { flexDirection: WINDOW_WIDTH > 900 ? 'row' : 'column', gap: 12 },
//   statCard: {
//     backgroundColor: CARD_BG,
//     borderRadius: 12,
//     padding: 14,
//     marginBottom: 12,
//     ...CARD_SHADOW,
//   },
//   statTitle: { fontSize: 13, color: MUTED, fontWeight: '700' },
//   statValue: { fontSize: 28, fontWeight: '900', marginTop: 6, color: '#0f172a' },
//   statSubtitle: { fontSize: 12, color: MUTED, marginTop: 4 },

//   card: {
//     backgroundColor: CARD_BG,
//     borderRadius: 12,
//     padding: 14,
//     marginBottom: 12,
//     ...CARD_SHADOW,
//   },
//   sectionTitle: { fontSize: 16, fontWeight: '800', color: '#0f172a', marginBottom: 8 },
//   emptyText: { color: MUTED, fontSize: 14 },

//   scheduleRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingVertical: 8,
//   },
//   scheduleTime: { fontSize: 15, fontWeight: '800', color: '#0f172a' },
//   scheduleName: { fontSize: 14, color: MUTED, marginTop: 4 },
//   scheduleMeta: { fontSize: 12, color: MUTED, marginTop: 4 },

//   rowActions: { flexDirection: 'row', gap: 8, marginLeft: 12 },
//   smallBtn: {
//     backgroundColor: '#E6F4FF',
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   smallBtnText: { fontWeight: '700', color: PRIMARY },
//   smallGhost: {
//     backgroundColor: '#F3F4F6',
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   smallGhostText: { fontWeight: '700', color: '#374151' },

//   upcomingRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 8,
//   },
//   upcomingDate: { fontSize: 13, color: MUTED, fontWeight: '700' },
//   upcomingPatient: { fontSize: 14, color: '#0f172a', marginTop: 4 },

//   linkText: { color: PRIMARY, fontWeight: '700' },
//   ghostBtn: {
//     backgroundColor: '#F3F4F6',
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 10,
//   },
//   ghostBtnText: { color: '#374151', fontWeight: '700' },

//   actionCard: {
//     backgroundColor: CARD_BG,
//     borderRadius: 12,
//     padding: 14,
//     ...CARD_SHADOW,
//     alignItems: 'flex-start',
//     justifyContent: 'center',
//   },
//   actionTitle: { fontSize: 16, fontWeight: '800' },
//   actionSub: { fontSize: 13, color: MUTED, marginTop: 6 },
// });


// app/(tabs)/DoctorDashboard.tsx
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
  { label: 'Appointments', icon: '🗓️', path: '/DoctorAppointments' },
  { label: 'My Patients', icon: '🧍‍♂️', path: '/MyPatients' },
  { label: 'EMR', icon: '🩺', path: '/emr' },
  { label: 'Treatments & Drugs', icon: '💊', path: '/TreatmentsDrugs' },
  { label: 'Reports', icon: '📊', path: '/DoctorReports' },
  { label: 'Profile', icon: '👤', path: '/DoctorProfile' },
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

  navSection: { gap: 28, paddingHorizontal: 10 },
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
