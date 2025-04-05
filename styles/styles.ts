import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  // Main Container
  container: {
    flex: 1,
    backgroundColor: "#008066",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  mainContent: {
    maxWidth: width,
    marginHorizontal: "auto",
    paddingHorizontal: 16,
    paddingVertical: 32,
  },

  // Header Styles
  headerContainer: {
    backgroundColor: "#008066",
  },
  headerContent: {
    maxWidth: width,
    marginHorizontal: "auto",
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "700",
  },
  searchContainer: {
    position: "relative",
    marginLeft: 16,
    maxWidth: 600,
  },
  searchInput: {
    width: 200,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "#ffffff",
    borderRadius: 4,
  },
  searchIconContainer: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: [{ translateY: -10 }],
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  iconButton: {
    color: "#ffffff",
  },
  menuButton: {
    color: "#ffffff",
  },
  menuText: {
    color: "#ffffff",
    fontSize: 16,
  },

  profileContainer: {
    backgroundColor: "#e5e7eb",
    borderRadius: 8,
    padding: 24,
    marginBottom: 32,
  },
  profileContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    backgroundColor: "#d1d5db",
    borderRadius: 32,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 64,
    height: 64,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "600",
  },
  profileRole: {
    color: "#4b5563",
    fontSize: 14,
  },
  profileBio: {
    color: "#4b5563",
    fontSize: 14,
  },
  editProfileButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#008066",
    borderRadius: 4,
  },
  editProfileButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
  },

  // Form Styles
  formContainer: {
    backgroundColor: "#FFE4B5",
    borderRadius: 8,
    padding: 32,
    marginBottom: 32,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
  },
  formSubtitle: {
    color: "#4b5563",
    marginBottom: 24,
  },
  formContent: {
    flexDirection: "column",
    gap: 32,
  },
  uploadSection: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    padding: 32,
  },
  uploadPreview: {
    width: "100%",
    height: 150,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadButtons: {
    flexDirection: "row",
    gap: 8,
  },
  uploadButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#ffffff",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  uploadButtonText: {
    color: "#374151",
    fontSize: 14,
  },
  helpButton: {
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#d1d5db",
    justifyContent: "center",
    alignItems: "center",
  },
  formFields: {
    gap: 24,
  },
  formField: {
    gap: 8,
  },
  fieldLabel: {
    color: "#374151",
    fontSize: 14,
    fontWeight: "500",
  },
  textInput: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#d1d5db",
    backgroundColor: "#ffffff",
  },
  textAreaInput: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#d1d5db",
    backgroundColor: "#ffffff",
    height: 100,
    textAlignVertical: "top",
  },
  categoriesContainer: {
    flexDirection: "row",
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#ffffff",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#d1d5db",
    marginRight: 8,
  },
  selectedCategoryButton: {
    backgroundColor: "#008066",
    borderColor: "#008066",
  },
  categoryButtonText: {
    color: "#374151",
  },
  conditionsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  conditionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#ffffff",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  selectedConditionButton: {
    backgroundColor: "#008066",
    borderColor: "#008066",
  },
  conditionButtonText: {
    color: "#374151",
  },
  formActions: {
    flexDirection: "row",
    gap: 16,
    justifyContent: "flex-end",
    marginTop: 16,
  },
  cancelButton: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: "#ffffff",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  cancelButtonText: {
    color: "#374151",
  },
  publishButton: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: "#000000",
    borderRadius: 4,
  },
  publishButtonText: {
    color: "#ffffff",
  },

  // Table Styles
  tableContainer: {
    marginTop: 32,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f9fafb",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  tableHeaderCell: {
    flex: 1,
    padding: 16,
  },
  tableHeaderText: {
    fontWeight: "600",
    color: "#374151",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  tableCell: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 4,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#e5e7eb",
  },
  userName: {
    fontWeight: "500",
  },
  userRole: {
    color: "#6b7280",
    fontSize: 12,
  },
  cellText: {
    color: "#374151",
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#f3f4f6",
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  badgeText: {
    fontSize: 12,
    color: "#374151",
  },
  moreOptions: {
    fontSize: 18,
    textAlign: "center",
  },

  // Footer Styles
  footerContainer: {
    backgroundColor: "#008066",
    paddingVertical: 48,
  },
  footerContent: {
    maxWidth: width,
    marginHorizontal: "auto",
    paddingHorizontal: 16,
  },
  footerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 48,
    flexWrap: "wrap",
  },
  footerLogo: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "700",
  },
  subscribeContainer: {
    flexDirection: "row",
    gap: 16,
  },
  subscribeInput: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 4,
    color: "#ffffff",
    minWidth: 250,
  },
  subscribeButton: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: "#ffffff",
    borderRadius: 4,
  },
  subscribeButtonText: {
    color: "#008066",
    fontWeight: "500",
  },
  footerColumns: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 48,
  },
  footerColumn: {
    minWidth: 150,
    marginBottom: 24,
  },
  footerColumnTitle: {
    color: "#ffffff",
    fontWeight: "600",
    marginBottom: 16,
    fontSize: 16,
  },
  footerColumnItems: {
    gap: 8,
  },
  footerColumnItem: {
    color: "#ffffff",
    opacity: 0.8,
  },
  storeButtons: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },
  storeButton: {
    height: 40,
    width: 120,
    resizeMode: "contain",
  },
  socialTitle: {
    color: "#ffffff",
    fontWeight: "600",
    marginBottom: 8,
  },
  socialIcons: {
    flexDirection: "row",
    gap: 16,
  },
  socialIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  footerBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 32,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.2)",
    flexWrap: "wrap",
  },
  copyright: {
    color: "#ffffff",
    opacity: 0.8,
  },
  footerLinks: {
    flexDirection: "row",
    gap: 32,
  },
  footerLink: {
    color: "#ffffff",
    opacity: 0.8,
  },
  backButton: {
    backgroundColor: 'transparent', // minimalista, sem cor de fundo
  },
  backButtonLabel: {
    color: '#4CAF50', // ou theme.colors.primary
    fontSize: 16,
  },
  backButtonContent: {
    flexDirection: 'row-reverse', // coloca o ícone à esquerda do texto
    alignItems: 'center',
  },
});

export default styles;
