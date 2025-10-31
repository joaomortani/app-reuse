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
  profileContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    gap: 24,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  profileContent: {
    gap: 24,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: 'hidden',
    backgroundColor: '#ECEFF1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#263238',
    fontFamily: 'Montserrat-Bold',
  },
  profileEmail: {
    fontSize: 14,
    color: '#607D8B',
    marginTop: 4,
    fontFamily: 'Lato-Regular',
  },
  profileBio: {
    fontSize: 14,
    color: '#78909C',
    marginTop: 12,
    fontFamily: 'Lato-Regular',
  },
  profileActions: {
    flexDirection: width > 360 ? 'row' : 'column',
    gap: 12,
    justifyContent: width > 360 ? 'flex-end' : 'flex-start',
    alignItems: width > 360 ? 'center' : 'stretch',
  },
  editProfileButton: {
    backgroundColor: '#2E7D32',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 140,
  },
  editProfileButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'Nunito-Bold',
  },
});

export default styles;
