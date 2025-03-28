import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getEvents } from '../database';
import { useFocusEffect } from '@react-navigation/native';

const RecordScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const eventsData = await getEvents();
      setEvents(eventsData);
    } catch (err) {
      console.error('Failed to load events:', err);
      setError('Failed to load events. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  //reload events when we focus the screen
  useFocusEffect(
    useCallback(() => {
      loadEvents();
    }, [])
  );

  const renderEventItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.eventCard} 
      onPress={() => navigation.navigate('EventDetail', { event: item })}  
    >
      <Text style={styles.eventTitle}>{item.event_title}</Text>
      <Text style={styles.eventDescription}>
        {item.event_description.length > 50 ? item.event_description.substring(0, 50) + '...' : item.event_description}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (events.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.noEventsText}>No events found. Add some events to get started!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        renderItem={renderEventItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  listContent: { paddingBottom: 20 },
  eventCard: { backgroundColor: 'white', padding: 16, marginBottom: 12, borderRadius: 8, elevation: 2 },
  eventTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  eventDescription: { fontSize: 14, color: '#666' },
  errorText: { color: 'red', fontSize: 16, textAlign: 'center' },
  noEventsText: { fontSize: 16, color: '#666', textAlign: 'center' },
});

export default RecordScreen;
