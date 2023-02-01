import { StyleSheet, View } from "react-native";
import { Colors } from "../constants/colors";
import { Input } from "../ui/Input";
import { IconBtn } from "../ui/IconBtn";
import { useLayoutEffect, useState } from "react";

export const SendEmailForm = ({ route, navigation }) => {
  const userEmail = route.params?.userEmail;
  const userName = route.params?.userName;

  const [isValid, setIsValid] = useState(true);
  const [status, setStatus] = useState();

  const [inputs, setInputs] = useState({
    subject: "",
    message: "",
    email: userEmail,
    name: userName,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Email to " + userName,
    });
  });

  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    setInputs((current) => {
      return {
        ...current,
        [inputIdentifier]: enteredValue,
      };
    });
  };

  const exitIconPess = () => {
    navigation.goBack();
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    if (inputs.subject.length > 0 || inputs.message > 0) {
      await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: "service_7hy6glp",
          template_id: "template_fr9zm0r",
          user_id: "OImIjZ4dlS0g6uBf2",
          accessToken: "IBIC7LOhJxROl0g4Q9M37",
          template_params: inputs,
        }),
      });

      navigation.goBack();
    } else {
      setIsValid(false);
    }
  };

  if (!isValid) {
    console.log(" invalid inputs ");
  }

  return (
    <View style={styles.container}>
      <Input
        label="Subject"
        inputConfig={{
          onChangeText: inputChangeHandler.bind(this, "subject"),
          value: inputs.subject,
        }}
      />
      <Input
        label="Message"
        inputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, "message"),
          value: inputs.message,
        }}
      />
      <IconBtn onPress={exitIconPess} icon="exit" size={50} />
      <IconBtn onPress={sendEmail} icon="send" size={70} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryPistachio300,
    padding: 24,
  },
});
