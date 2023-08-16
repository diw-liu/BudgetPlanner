import { useState } from 'react';
import { Text, TouchableOpacity, View} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

const Header = () => {
    const [months, setMonths] = useState([])
    return (
        <TouchableOpacity>
            <AntDesign name="calendar" size={24} color="black" />
        </TouchableOpacity>
    )
}

export default Header;