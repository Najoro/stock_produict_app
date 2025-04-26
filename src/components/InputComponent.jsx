import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';

const InputComponent = ({ value, onChangeText, placeholder, keyboardType = 'default', suffix = null }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
      {suffix && <Text style={styles.suffix}>{suffix}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginTop: 20,
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  suffix: {
    marginLeft: 10,
    fontSize: 16,
    color: '#555',
  },
});

export default InputComponent;
