import { FlatList, Text, View, Pressable } from 'react-native';
import { Stack, router } from 'expo-router';
import MonthsModal from '../../../component/modal/monthModal';

export default function Months() {

  return (
    <>
      <MonthsModal />
    </>
  );
}