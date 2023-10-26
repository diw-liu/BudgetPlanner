import { Link, router } from 'expo-router';
import Head from 'expo-router/head';
import { StyleSheet, Text, View } from 'react-native';

export default function Table() {
  return (
    <>
      <Head>
        <title>Table</title>
      </Head>
      <Link href="/create" className="p-1 px-2" style={{ "color": "rgba(0,122,255,255)" }}> + </Link>
    </>
  )
}