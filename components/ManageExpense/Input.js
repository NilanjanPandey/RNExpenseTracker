import { TextInput, View, StyleSheet, Text } from "react-native";
import { GlobalStyles } from "../../Constants/style";

function Input({ label, textInputConfig,isValid }) {
    // console.log(isValid)
  const inputStyles = [styles.input];
  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiLine);
  }

  if(!isValid){
    inputStyles.push(styles.inValildInput);
  }
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label,isValid?'':styles.invalidLabel]}>{label}</Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
    // flex:1
  },
  label: {
    fontSize: 14,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.primary700,
    minHeight:40
  },
  inputMultiLine: {
    minHeight: 100,
    textAlignVertical: "top",
    
    maxLength: 400,
  },
  invalidLabel:{
    color:GlobalStyles.colors.error500
  },
  inValildInput:{
    backgroundColor:GlobalStyles.colors.error50
  }
});
