import { useState } from 'react';
import { View, Text, TextInput, FlatList } from "react-native";

const localidades = require("../assets/Municipios.json")
export default function HomeScreen(){

    const[municipio, setMunicipio] = useState('')

    console.log('localidades', localidades)

    const localidadesFiltradas = localidades.filter(loc  => loc.Población.includes(municipio))
    return(
        <>
            <TextInput placeholder='Buscar municipio' value={municipio} onChangeText={setMunicipio}/>
            <FlatList
                data={localidadesFiltradas}
                keyExtractor={(item, index ) => index.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.Población}</Text>
                    </View>
                )}
            />
        </>
    )
}
