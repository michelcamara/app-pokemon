import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, Dimensions, Image } from 'react-native';
import { Header } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';

const { width } = Dimensions.get('window');

export default function App() {
  const [poke, setPoke] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [selecionado, setSelecionado] = useState('');

  useEffect(() => {
    async function loadPokemons() {
      const response = await axios.get('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json');
      setPoke(response.data.pokemon);

      //Filtrando os tipos de pokemons
      const types = [];
      const newTypes = [];
      response.data.pokemon.map(g => (
        // eslint-disable-next-line array-callback-return
        g.type.map(j => {
          if (types.filter(p => p === j).length === 0) {
            types.push(j);
          }
        })
      ));

      types.map(t => {
        newTypes.push({ label: t, value: `${t}` })
      })
      setTipos(newTypes);
      //Fim do filtro
    }
    loadPokemons();
  }, []);

  return (
    <>
      <Header
        statusBarProps={{ barStyle: 'light-content' }}
        centerComponent={{ text: 'Poké Finder', style: { color: '#fff' } }}
        containerStyle={{ backgroundColor: '#02386E', borderBottomColor: '#02386E' }}
      />
      <View style={styles.container}>
        {tipos.length > 0 ? (
          <View>
            <Text style={styles.textTypes}>Filtro</Text>
            <View style={styles.containerPicker}>
              <RNPickerSelect
                onValueChange={(label) => { setSelecionado(label) }}
                items={tipos}
                placeholder={{
                  label: 'Por tipo...',
                  value: null,
                  color: 'black'
                }}
                placeholderTextColor={'#fff'}
                itemKey={tipos.label}
                style={pickerSelectStyles}
                Icon={() => {
                  return <FontAwesomeIcon icon={faAngleDown} marginTop={8} right={10} size={30} color="white" />;
                }}
              />
            </View>
            <ScrollView>
              <View style={{padding: 15}}>
                {poke.map(pok => (
                  <View key={pok.id} style={styles.containerPokemon}>
                    <View style={{ alignItems: "center" }}>
                      <Image style={{ width: 120, height: 120, backgroundColor: '#ddd' }}
                        source={{ uri: `${pok.img}` }}
                      />
                    </View>

                    <Text>{pok.name}</Text>
                    <Text>Tipo: {pok.type.join(', ')}</Text>
                    <Text>Altura: {pok.height}</Text>
                    <Text>Peso: {pok.weight}</Text>
                    <Text>Fraquezas: {pok.weaknesses.join(', ')}</Text>
                  </View>
                ))}
              </View>

            </ScrollView>
          </View>
        ) : (
            <ActivityIndicator size={"large"} color={'#fff'} />
          )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00264D',
    padding: 8
  },
  textTypes: {
    color: '#FFF',
    textAlign: "center"
  },
  containerPicker: {
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 2
  },
  containerPokemon: {
    backgroundColor: '#fff',
    padding: 8,
    marginBottom: 5,
    borderRadius: 10
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 4,
    color: 'white',
    paddingRight: 10, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 4,
    color: 'white',
    paddingRight: 10, // to ensure the text is never behind the icon
  },
})