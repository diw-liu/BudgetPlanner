import { useContext, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from 'aws-amplify';
import { Link } from 'expo-router';
import { BookContext } from '../supplement/contexts';

export default function SelectBook() {
  const { book } = useContext(BookContext);

  return (
    <>
      <TouchableOpacity>
        { book && <Link href="/books" className="p-1 px-2" style={{ "color": "rgba(0,122,255,255)" }}> {book["CreatedTime"]?.slice(0, 7)} </Link>}
      </TouchableOpacity>
    </>
  )
}
