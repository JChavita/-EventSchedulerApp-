import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Alert,
  KeyboardAvoidingView, 
  Platform
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import { insertEvent } from '../database';

const Form = ({ navigation }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { 
    control, 
    handleSubmit, 
    formState: { errors }, 
    setValue,
    reset
  } = useForm({
    defaultValues: {
      eventTitle: '',
      eventDescription: '',
      eventDate: new Date(),
      organizerName: '',
      organizerEmail: '',
      organizerPhone: ''
    }
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Format the data to match database field names
      const eventData = {
        event_title: data.eventTitle,
        event_description: data.eventDescription,
        event_date: data.eventDate.toISOString().split('T')[0], // Format date as YYYY-MM-DD
        organizer_name: data.organizerName,
        organizer_email: data.organizerEmail,
        organizer_phone: data.organizerPhone
      };
      
      await insertEvent(eventData);
      
      Alert.alert(
        "Success",
        "Event has been saved successfully!",
        [{ 
          text: "OK", 
          onPress: () => {
            reset();
          } 
        }]
      );
    } catch (error) {
      Alert.alert("Error", "Failed to save event: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(false);
    setValue('eventDate', currentDate);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}> 
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Create New Event</Text>
        
        {/* Event Title */}
        <Text style={styles.label}>Event Title *</Text>
        <Controller
          control={control}
          rules={{
            required: 'Event title is required',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter event title"
            />
          )}
          name="eventTitle"
        />
        {errors.eventTitle && (
          <Text style={styles.errorText}>{errors.eventTitle.message}</Text>
        )}
        
        {/*event */}
        <Text style={styles.label}>Event Description *</Text>
        <Controller
          control={control}
          rules={{
            required: 'Event description is required',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, styles.textArea]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter event description"
              multiline
              numberOfLines={4}
            />
          )}
          name="eventDescription"
        />
        {errors.eventDescription && (
          <Text style={styles.errorText}>{errors.eventDescription.message}</Text>
        )}
        
        {/*date */}
        <Text style={styles.label}>Event Date *</Text>
        <Controller
          control={control}
          rules={{
            required: 'Event date is required',
          }}
          render={({ field: { value } }) => (
            <TouchableOpacity 
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text>{value.toDateString()}</Text>
            </TouchableOpacity>
          )}
          name="eventDate"
        />
        {showDatePicker && (
          <DateTimePicker
            value={control._formValues.eventDate}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}
        {errors.eventDate && (
          <Text style={styles.errorText}>{errors.eventDate.message}</Text>
        )}
        
        {/*user name */}
        <Text style={styles.label}>Organizer Name *</Text>
        <Controller
          control={control}
          rules={{
            required: 'Organizer name is required',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter organizer name"
            />
          )}
          name="organizerName"
        />
        {errors.organizerName && (
          <Text style={styles.errorText}>{errors.organizerName.message}</Text>
        )}
        
        {/*email*/}
        <Text style={styles.label}>Organizer Email *</Text>
        <Controller
          control={control}
          rules={{
            required: 'Organizer email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter organizer email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
          name="organizerEmail"
        />
        {errors.organizerEmail && (
          <Text style={styles.errorText}>{errors.organizerEmail.message}</Text>
        )}
        
        {/*Phone */}
        <Text style={styles.label}>Organizer Phone *</Text>
        <Controller
          control={control}
          rules={{
            required: 'Organizer phone is required',
            pattern: {
              value: /^\d{8}$/,
              message: 'Phone number must be 8 digits',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter organizer phone (10 digits)"
              keyboardType="phone-pad"
            />
          )}
          name="organizerPhone"
        />
        {errors.organizerPhone && (
          <Text style={styles.errorText}>{errors.organizerPhone.message}</Text>
        )}
        
  
        <TouchableOpacity
          style={[styles.button, isSubmitting && styles.disabledButton]}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          <Text style={styles.buttonText}>
            {isSubmitting ? 'Saving...' : 'Save Event'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10,
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  dateButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#4a90e2',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  disabledButton: {
    backgroundColor: '#a0c3e8',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    marginTop: -10,
    fontSize: 12,
  },
});

export default Form;