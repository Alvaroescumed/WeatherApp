import { useEffect, useState } from 'react'
import { Text, View, StyleSheet } from "react-native"
import MapView, { Marker } from 'react-native-maps'
import localidades from "../assets/Municipios.json"
import Icon from 'react-native-vector-icons/FontAwesome'

export default function LocationInfo({ route }) {
    const { lat, long, nombre } = route.params

    const [municipio, setMunicipio] = useState(null)

    useEffect(() => {
        // Buscamos el municipio con el nombre tarido por parametros
        const foundMunicipio = localidades.find(municipio =>
            municipio.Población === nombre
        );
        setMunicipio(foundMunicipio);

        console.log(municipio)

    }, [lat, long])

    return (

        
        <View style={styles.container}>
            {/* si se ha encontrado el municipio imprime los datos más el mapa, en caso de que no muestra un mensaje de error en pantalla */}
            {municipio ? (
                <>
                <Text style={styles.title}>{municipio.Población}</Text>
                <Text style={styles.subtitle}>{municipio.Provincia}</Text>
                <Text style={styles.subtitle}>{municipio.Comunidad}</Text>
            
                <MapView
                    style={styles.map}
                    region={{
                        latitude: lat,
                        longitude: long,
                        latitudeDelta: 0.02,
                        longitudeDelta: 0.02
                    }}
                >
                    <Marker coordinate={{ latitude: lat, longitude: long }} title="Marker" />
                </MapView>

                <Text style={styles.subtitle}>Población total: {municipio.Habitantes}</Text>
                <Icon name="male" size={30} color="black" />
                <Text style={styles.subtitle}> {municipio.Hombres}</Text>
                <Icon name="female" size={30} color="black" />
                <Text style={styles.subtitle}> {municipio.Mujeres}</Text>
                </>
            ) : (<Text>ERROR: Municipio no encontrado</Text>)}    
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fcfcfc',
    },
    map: {
        width: '90%',
        height: '50%',
        margin: '5%',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
    },
    title: {
        fontSize: '28px',
        fontWeight: 'bold',
        margin: '2%'
    },
    subtitle: {
        fontSize: '23px'
    }

});