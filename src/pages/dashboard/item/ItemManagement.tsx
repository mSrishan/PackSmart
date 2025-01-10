import React, {useState} from 'react';
import {
  Modal,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const ItemManagement = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [itemData, setItemData] = useState({name: '', price: '', stock: ''});

  // Handle opening and closing of the modal
  const toggleModal = () => setModalVisible(!modalVisible);

  // Handle adding the item and updating Firestore
  const handleAddItem = async () => {
    const {name, price, stock} = itemData;

    // Validate the input fields
    if (!name || !price || !stock) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      // Save data to Firestore
      await firestore()
        .collection('items')
        .add({
          name,
          price: parseFloat(price), // Convert price to a number
          stock: parseInt(stock, 10), // Convert stock to an integer
          createdAt: firestore.FieldValue.serverTimestamp(), // Add timestamp for when the item is added
        });

      // Show success message
      Alert.alert('Success', `Item "${name}" added successfully!`);

      // Clear input fields and close the modal
      setItemData({name: '', price: '', stock: ''});
      toggleModal();
    } catch (error) {
      console.error('Error adding item to Firestore: ', error);
      Alert.alert(
        'Error',
        'There was an error adding the item. Please try again.',
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Item Management</Text>

      {/* Add Item Button */}
      <Button title="Add Item" color="#1E90FF" onPress={toggleModal} />

      {/* Modal for Adding Item */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add New Item</Text>

            {/* Item Name Input */}
            <TextInput
              style={styles.input}
              placeholder="Enter item name"
              placeholderTextColor="#888"
              value={itemData.name}
              onChangeText={text => setItemData({...itemData, name: text})}
            />

            {/* Price Input */}
            <TextInput
              style={styles.input}
              placeholder="Enter item price"
              placeholderTextColor="#888"
              value={itemData.price}
              onChangeText={text => setItemData({...itemData, price: text})}
              keyboardType="numeric"
            />

            {/* Stock Input */}
            <TextInput
              style={styles.input}
              placeholder="Enter stock quantity"
              placeholderTextColor="#888"
              value={itemData.stock}
              onChangeText={text => setItemData({...itemData, stock: text})}
              keyboardType="numeric"
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleAddItem} >
                <Text  style={styles.buttonText}>Add Item</Text>

              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={toggleModal}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ItemManagement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
    borderRadius: 8,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#1E90FF',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    width: '80%',
  },
  cancelButton: {
    backgroundColor: '#FF6347',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
