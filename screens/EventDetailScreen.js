import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EventDetailScreen = ({ route }) => {
  const { event } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.event_title}</Text>
      <Text style={styles.description}>{event.event_description}</Text>
      <Text style={styles.date}>📅 Date: {event.event_date}</Text>
      <Text style={styles.organizer}>👤 Organizer: {event.organizer_name}</Text>
      <Text style={styles.email}>📧 Email: {event.organizer_email}</Text>
      <Text style={styles.phone}>📞 Phone: {event.organizer_phone}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  description: { fontSize: 16, marginBottom: 10 },
  date: { fontSize: 16, fontWeight: 'bold', color: '#007bff', marginBottom: 10 },
  organizer: { fontSize: 16, fontWeight: 'bold', color: '#28a745', marginBottom: 10 },
  email: { fontSize: 16, color: '#6c757d', marginBottom: 10 },
  phone: { fontSize: 16, color: '#6c757d' },
});

export default EventDetailScreen;
