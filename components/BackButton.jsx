import styles from '@/styles/styles';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



function BackButton() {
  const navigation = useNavigation();

  return (
    <Button
    mode="text" // Modo de texto (sem fundo), pode usar "contained" ou "outlined" se quiser
    icon={() => <Icon name="arrow-left" size={20} color="#4CAF50" />}
    style={styles.backButton}
    labelStyle={styles.backButtonLabel}
    contentStyle={styles.backButtonContent}
    onPress={() => {
      navigation.goBack();
    }}
  >
      Back
    </Button>
  );
}



export default BackButton;

