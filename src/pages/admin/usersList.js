import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    View,
    Image,
    Text,
    SafeAreaView,
    AsyncStorage,
    FlatList,
} from 'react-native'

import api from '../../services/api'
import ListItems from '../../components/listItems'


function UsersList({ navigation }) {
    const [users, setUsers] = useState('')

    useEffect(() => {
        (async () => {
            const response = await api.get('/application/usuarios')
            await AsyncStorage.setItem('@CodeApi:users', JSON.stringify(response.data.users))
            setUsers(JSON.parse(await AsyncStorage.getItem('@CodeApi:users')))
        })()
    }, [])



    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.divLogo}>
                <Image
                    style={styles.logo}
                    source={require('../../../assets/Mind-Branco.png')}
                />
            </View>
            <Text style={styles.textInformativo}>
                Arraste para a esquerda para desativar ou ativar um usuário</Text>
            <View style={styles.container}>
                <FlatList
                    data={users}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) => (<ListItems data={item} navigation={navigation} />)}
                    ItemSeparatorComponent={() => <View backgroundColor="#181818" height={2} />}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
    },
    divLogo: {
        backgroundColor: '#191919',
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
        width: '100%',
    },
    container: {
        flex: 1,
        width: '100%',
    },
    textInformativo: {
        fontSize: 15,
        marginBottom: 10,
        marginTop: 5,
        alignSelf: 'center',
    },
})

export default UsersList