// /styles/styles.ts
import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  mainContent: {
    width: '100%',
    maxWidth: 480,
    marginHorizontal: 'auto',
    paddingHorizontal: 20,
    paddingVertical: 32,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#37474F",
    marginBottom: 24,
    fontFamily: 'Montserrat-Bold'
  },
  formFields: {
    gap: 20,
    marginBottom: 32,
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'Nunito-Bold',
  },
  formField: {
    gap: 8,
  },
  textInput: {
    width: '100%',
    height: 54,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderColor: '#B0BEC5',
    borderWidth: 1,
    paddingHorizontal: 16,
    fontFamily: 'Lato-Regular'
  },
  fieldLabel: {
    color: '#37474F',
    fontSize: 14,
    fontWeight: "500",
    fontFamily: 'Nunito-Bold'
  },
  formActions: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  menuText: {
    fontSize: 14,
    color: '#2E7D32',
    textAlign: 'center',
    marginTop: 16,
    fontFamily: 'Nunito-Bold'
  },
});

export default styles;
