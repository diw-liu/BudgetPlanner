import { Link } from 'expo-router';
import Head from 'expo-router/head';
import CreateTrans from '../../component/pages/createTrans';

export default function Create() {
    return (
        <>
            <Head>
                <title>Create new transaction</title>
            </Head>
            <CreateTrans />
        </>
    )
}