import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity, Button} from 'react-native'
import QRCode from 'react-native-qrcode-svg';
import { BarCodeScanner } from 'expo-barcode-scanner';
import PopupModal from '../modal/popupModal';
import * as Sharing from 'expo-sharing';

export default function ViewChat(){
  var svg: any;
  const [useId, setUserId] = useState("")
  const [visible, setVisible] = useState(false);

  const [hasPermission, setHasPermission] = useState(null);
  const [scan, setScan] = useState(false);
  const [selectURL, setSelectURL] = useState(false);

  useEffect(() => {
    _initial();
  })
  
  const _initial = async () => {
    const userId = await AsyncStorage.getItem("userId") || ""
    setUserId(userId)
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getBarCodeScannerPermissions();
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScan(false);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const openPopup = () => {
    setVisible(true);
  }

  const closePopup = () => {
    setVisible(false);
    setScan(false);
  }

  // const saveQRCode = () => {
  //   svg.toDataURL((data) => {
  //     const shareImageBase64 = {
  //       title: 'React Native',
  //       url: `data:image/png;base64,${data}`,
  //       subject: 'Share Link', //  for email
  //     };
  //     console.log(shareImageBase64)
  //     Share.share(shareImageBase64)
  //   });
  // };

  // const callback = (dataURL) => {
    
  // }

  return(
    <SafeAreaView>
      <TouchableOpacity 
        style={styles.popupButton}
        onPress={openPopup}
      >
        <Text style={{color: "#fff"}}>Open Popup</Text> 
      </TouchableOpacity>
     
      <PopupModal
        visible={visible}
        transparent={true}
        dismiss={closePopup}
        margin={"15%"}
      >
        {!scan && 
          <View>
            <View style={{ flexDirection:"row" }}>
            <View >
              <TouchableOpacity 
                style={styles.popupButton}
                onPress={()=> setSelectURL(false)}
              >
                <Text style={{color: "#fff"}}>QR code</Text> 
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity 
                style={styles.popupButton}
                onPress={()=> setSelectURL(true)}
              >
                <Text style={{color: "#fff"}}>Share Link</Text> 
              </TouchableOpacity>
            </View>
            </View>
            <View style={styles.popupContent}>
              <Text>Scan QRCode</Text>
              <TouchableOpacity onPress={() => setScan(true)}>
                <QRCode 
                  value={useId}
                  size={200}
                />
              </TouchableOpacity>
            </View>
          </View>} 
        {scan &&  <View style={styles.cameraContainer}>
                  <BarCodeScanner
                    onBarCodeScanned= {handleBarCodeScanned}
                    style={styles.camera}
                  />
                </View>}
      </PopupModal>
     
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  popupButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    width: 100,
    height: 50
  },
  popupContent: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: "1px",
    height: 300
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 40,
  },
  cameraContainer: {
    width: '80%',
    aspectRatio: 1,
    overflow: 'hidden',
    borderRadius: 10,
    marginBottom: 40,
    zIndex: 100,
  },
  camera: {
    flex: 1,
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});