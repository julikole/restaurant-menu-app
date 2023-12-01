import { Button } from 'react-native-paper';

const PrimaryButton = ({children, onPress, disabled}) => {
  return (
    <Button onPress={onPress} color={'#495E57'} mode="contained" disabled={disabled} style={{borderRadius: 16, width: 280}}>
      {children}
    </Button>
  );
};

export default PrimaryButton;
