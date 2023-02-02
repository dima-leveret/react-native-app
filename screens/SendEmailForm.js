import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Colors } from "../constants/colors";
import { Input } from "../ui/Input";
import { IconBtn } from "../ui/IconBtn";
import { useLayoutEffect, useState } from "react";
import { ErrorOverlay } from "../ui/ErrorOverlay";
import { LoaderOverlay } from "../ui/LoaderOverlay";

export const SendEmailForm = ({ route, navigation }) => {
  const userEmail = route.params?.userEmail;
  const userName = route.params?.userName;

  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

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

  const sendEmail = () => {
    if (inputs.subject.length > 0 && inputs.message.length > 0) {
      setIsLoading(true);
      fetch("https://api.emailjs.com/api/v1.0/email/send", {
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
      })
        .then((res) => {
          console.log(res.status);
          if (res.status !== 200) {
            setError("Can not send message. Try again later");
          } else {
            setIsLoading(false);
            navigation.goBack();
          }
        })
        .catch((err) => {
          console.log("err", err);
          setError(err.message);
        });
    } else {
      setIsValid(false);
    }
  };

  if (error) {
    return <ErrorOverlay message={error} />;
  }

  if (isLoading) {
    return <LoaderOverlay />;
  }

  return (
    <ScrollView style={styles.container}>
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
      <IconBtn
        iconStyle={styles.closeIcon}
        onPress={exitIconPess}
        icon="close"
        size={50}
        color="white"
      />
      <IconBtn
        iconStyle={styles.sendIcon}
        onPress={sendEmail}
        icon="send"
        size={70}
        color={Colors.primaryPistachio100}
      />

      {!isValid && (
        <Text style={styles.errortext}>
          Empty input. All inputs are required
        </Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryPistachio300,
    padding: 24,
  },
  closeIcon: {
    width: "100%",
    borderWidth: 4,
    borderRadius: 8,
    borderColor: "white",
    marginVertical: 30,
    opacity: 0.5,
  },
  sendIcon: {
    width: "100%",
    borderWidth: 4,
    borderRadius: 8,
    borderColor: Colors.primaryPistachio100,
  },

  errortext: {
    textAlign: "center",
    color: "tomato",
    margin: 8,
  },
});
