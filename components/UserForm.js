import { StyleSheet, View, Text } from "react-native";
import { useState } from "react";
import { Colors } from "../constants/colors";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

export const UserForm = ({
  editable,
  onCalcel,
  onSubmit,
  submitButtonLabel,
  defaultValues,
}) => {
  const [input, setInput] = useState({
    name: {
      value: defaultValues ? defaultValues.name : "",
      isValid: true,
    },
    surname: {
      value: defaultValues ? defaultValues.surname : "",
      isValid: true,
    },
    email: {
      value: defaultValues ? defaultValues.email : "",
      isValid: true,
    },
  });

  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    setInput((current) => {
      return {
        ...current,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  };

  const submitHandler = () => {
    const userData = {
      name: input.name.value,
      surname: input.surname.value,
      email: input.email.value,
    };

    const nameIsValid = userData.name.trim().length > 0;
    const surnameIsValid = userData.surname.trim().length > 0;
    const emailIsValid =
      userData.email.trim().length > 0 && userData.email.trim().includes("@");

    if (!nameIsValid || !surnameIsValid || !emailIsValid) {
      setInput((current) => {
        return {
          name: { value: current.name.value, isValid: nameIsValid },
          surname: { value: current.surname.value, isValid: surnameIsValid },
          email: {
            value: current.email.value,
            isValid: emailIsValid,
          },
        };
      });
      return;
    }

    onSubmit(userData);
  };

  const formIsInvalid =
    !input.name.isValid || !input.surname.isValid || !input.email.isValid;

  return (
    <View>
      <Input
        editable={!editable}
        label="Name"
        inputConfig={{
          onChangeText: inputChangeHandler.bind(this, "name"),
          value: input.name.value,
        }}
      />
      <Input
        editable={!editable}
        label="Surname"
        inputConfig={{
          onChangeText: inputChangeHandler.bind(this, "surname"),
          value: input.surname.value,
        }}
      />
      <Input
        editable={!editable}
        label="Email"
        inputConfig={{
          autoCorrect: false,
          keyboardType: "email-address",
          onChangeText: inputChangeHandler.bind(this, "email"),
          value: input.email.value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input. Please check your inputs values
        </Text>
      )}
      <View style={styles.buttons}>
        <Button mode="flat" style={styles.button} onPress={onCalcel}>
          Cancel
        </Button>
        <Button
          disabled={editable}
          style={styles.button}
          onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formStyle: {
    marginTop: 80,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: "center",
    color: "tomato",
    margin: 8,
  },
});
