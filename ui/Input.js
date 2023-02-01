import { StyleSheet, View, Text, TextInput } from "react-native";

export const Input = ({ label, style, inputConfig, editable }) => {
  const inputStyles = [styles.input];

  if (inputConfig && inputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={styles.label}> {label} </Text>
      <TextInput editable={editable} style={inputStyles} {...inputConfig} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    color: "white",
    marginBottom: 4,
  },
  input: {
    backgroundColor: "white",
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },

  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
});
