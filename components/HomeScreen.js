import { useNavigation } from '@react-navigation/native'
import { useState, useEffect } from 'react'
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import * as Location from 'expo-location' 
import Icon from 'react-native-vector-icons/EvilIcons'


const localidades = require("../assets/Municipios.json")
export default function HomeScreen(){

    const[municipio, setMunicipio] = useState('')
    const[location, setLocation] = useState()
    const navigate = useNavigation()

    //ordenamos alfabeticamente la lista de localidades
    const localidadesSorted = localidades.sort((a, b) => a.Población > b.Población ? 1 : -1)

    //filtamos por busqueda
    const localidadesFiltradas = localidadesSorted.filter(loc  => loc.Población.includes(municipio))

    //accedemos a la localizacion 
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                setErrorMsg('Permiso para acceder a la ubicación denegado')
                return
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location.coords)

        })();
    }, []);

    function handlePress (localidad) {
        navigate.navigate('Weather', { lat: localidad.Latitud, long:localidad.Longitud})
        console.log( localidad.Latitud, localidad.Longitud)
    }

    function handleLocation() {
            navigate.navigate('Weather', { 
                lat: location.latitude, 
                long: location.longitude, 
            });
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TouchableOpacity onPress={handleLocation} style={styles.locationButton}>
                    <Icon name="location" size={30} color="#fff" />
                </TouchableOpacity>
                <TextInput
                    placeholder='Buscar municipio'
                    value={municipio}
                    onChangeText={setMunicipio}
                    style={styles.searchInput}
                />
            </View>
            <FlatList
                data={localidadesFiltradas}
                style={styles.list}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <TouchableOpacity onPress={() => handlePress(item)} style={styles.button}>
                            <Text style={styles.listItemText}>
                                {item.Población}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#fcfcfc',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        overflow: 'hidden',
        marginBottom: 10,
    },
    locationButton: {
        padding: 10,
        backgroundColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    searchInput: {
        flex: 1,
        padding: 10,
        color: '#333',
        height: 43,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        
    },
    list: {
        flex: 1,
    },
    listItem: {
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    button: {
        padding: 10,
    },
    listItemText: {
        fontSize: 16,
        color: '#333',
    },

})

