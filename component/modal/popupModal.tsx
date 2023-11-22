import { StyleSheet, Modal, TouchableWithoutFeedback, View } from "react-native";

export default function PopupModal(props:any) {
  return (
    <Modal
      visible={props.visible}
      transparent={props.transparent}
      onRequestClose={props.dismiss}
    >
      <TouchableWithoutFeedback onPress={props.dismiss}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
  
      <View 
        style={{
          ...styles.modalContent,
          margin: props.margin
        }}
      >
        {props.children}
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContent: {
    justifyContent: "center",
    marginVertical: "50%"
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)"
  },
});