import { useEffect, useState } from 'react'
import { Image, Text, View, FlatList, TouchableOpacity, StyleSheet } from "react-native"
import { useNavigation } from '@react-navigation/native'
import { openWeatherKey } from '../config'
import Icon from 'react-native-vector-icons/AntDesign'

export default function SpecificWeather({ route }) {

    const navigation = useNavigation()

    const { lat, long } = route.params
    const [weather, setWeather] = useState()
    const [forecast, setForecast] = useState()
    // const [dailyForecast, setDailyForecast] = useState()
    const [error, setError] = useState()


    useEffect(() => {
        async function fetchWeatherData() {
            try {
                const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${openWeatherKey}&units=metric&lang=es`)
                const weatherData = await weatherRes.json()
                setWeather(weatherData)

                const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${openWeatherKey}&units=metric&lang=es`)
                const forecastData = await forecastRes.json()
                setForecast(forecastData.list.filter((item, index) => index < 8))//con esto limitamos solo las proximas 24 horas
                
                // DEJO ESTO COMENTADO YA QUE CON EL PLAN FREE NO ME DEJA ACCEDER A ESTAS FUNCIONES

                // const dailyForecastRes = await fetch(`https://api.openweathermap.org/data/2.5 /onecall?lat=${lat}&lon=${long}&appid=${openWeatherKey}&units=metric&lang=es`)
                // const dailyForecastData = await dailyForecastRes.json()
                // setDailyForecast(dailyForecastData.daily)
                // console.log(dailyForecast)

        
            } catch (err) {
                console.error('Error fetching data', err)
                setError(err.message)
            
            }
        }

        fetchWeatherData()

    }, [lat, long])

    if (error) {
        return <Text style={styles.error}>Error: {error}</Text>
    }

    if (!weather) {
        return <Text>No weather data available</Text>
    }

    function goToLocation () {
        navigation.navigate('Info', { lat: weather.coord.lat, long: weather.coord.lon, nombre: weather.name })
    }

    return (

        <View style={styles.container}>

            <View style={styles.titlecontainer}>
                <Text style={styles.weatherTemp}>{weather.name}</Text>
                <TouchableOpacity onPress={goToLocation} style={styles.infoButton}>
                    <Icon name="info" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
            <Text style={styles.weatherTemp}>{weather.main.temp}°C</Text>
        
            
       
            <Image
                source={{ uri: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` }}
                style={styles.weatherIcon}
                alt="weather icon"
            />
            
            <Text style={styles.weatherText}>{weather.weather[0].description}</Text>
            <Text style={styles.forecastTitle}>Tiempo en las próximas 24h</Text>
            <FlatList
                data={forecast}
                keyExtractor={(item) => item.dt.toString()}
                renderItem={({ item }) => (
                    <View style={styles.forecastItem}>
                        <Text>{new Date(item.dt * 1000).toLocaleTimeString()}</Text>
                        <Image
                            source={{ uri: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png` }}
                            style={styles.forecastIcon}
                            alt="forecast icon"
                        />
                        <Text>{item.main.temp}°C</Text>
                    </View>
                )}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.forecastList}
            />
            {/* <Text style={styles.forecastTitle}>Pronóstico para los próximos 7 días</Text>
            <FlatList
                data={dailyForecast}
                keyExtractor={(item) => item.dt.toString()}
                renderItem={({ item }) => (
                    <View style={styles.dailyForecastItem}>
                        <Text>{new Date(item.dt * 1000).toLocaleDateString()}</Text>
                        <Image
                            source={{ uri: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png` }}
                            style={styles.dailyForecastIcon}
                            alt="daily forecast icon"
                        />
                        <Text>{item.temp.day}°C</Text>
                    </View>
                )}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.dailyForecastList}
            /> */}
    </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fcfcfc',
    },
    titlecontainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    infoButton: {
        width: 30,
        height: 30,
        padding: 5,
        backgroundColor: '#333',
        borderRadius: 20,
        marginTop: 10,
        justifyContent: 'center',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        
    },
    weatherIcon: {
        width: 200,
        height: 200,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
    },
    weatherTemp: {
        fontSize: '32',
        marginVertical: 4,
        color: '#303438',
        fontWeight: 'light',
        margin:'2%'
    },
    forecastTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 20,
        fontFamily: 'San Francisco'
    },
    forecastList: {
        width: '100%',
    },
    forecastItem: {
        alignItems: 'center',
        marginHorizontal: 10,
        height: '80%',
        borderRadius: 20,
        padding: 30,
         shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
    },
    forecastIcon: {
        width: 50,
        height: 50,
    },
    dailyForecastList: {
        width: '100%',
    },
    // dailyForecastItem: {
    //     alignItems: 'center',
    //     marginHorizontal: 10,
    //     shadowOffset: { width: 0, height: 2 },
    //     shadowOpacity: 0.1,
    // },
    // dailyForecastIcon: {
    //     width: 50,
    //     height: 50,
    // },
    error: {
        color: 'red',
        fontSize: 18,
    },
})