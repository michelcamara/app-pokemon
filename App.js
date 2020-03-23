import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, Dimensions } from 'react-native';
import { Header } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Divider, Image } from 'react-native-elements';

import axios from 'axios';

const { width } = Dimensions.get('window');

export default function App() {
  const [poke, setPoke] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [selecionado, setSelecionado] = useState('');

  useEffect(() => {
    async function loadPokemons() {
      const response = await axios.get('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json');
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

  useEffect(() => {
    async function loadSelect() {
      if (selecionado !== '' && selecionado !== null) {
        const section = [];
        const response = await axios.get('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json');
        // eslint-disable-next-line array-callback-return
        response.data.pokemon.map(pok => {
          if (pok.type[0] === selecionado || pok.type[1] === selecionado) {
            section.push(pok);
          }
        })
        setPoke(section);
      } else {
        const response = await axios.get('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json');
        setPoke(response.data.pokemon);
      }
    }
    loadSelect();
  }, [selecionado]);

  return (
    <>
      <Header
        statusBarProps={{ barStyle: 'light-content' }}
        centerComponent={{ text: 'Poké Finder', style: { color: '#fff', fontSize: 18, fontWeight: 'bold' } }}
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
                  label: 'Todos',
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
              <View style={{ padding: 15, marginBottom: 50 }}>
                {poke.map(pok => (
                  <View key={pok.id} style={styles[pok.type[0]]}>
                    <View style={styles.containerPokemon}>
                      <View style={{ alignItems: "center" }}>
                        <Image style={{ width: 120, height: 120 }}
                          source={{ uri: `${pok.img}` }}
                          PlaceholderContent={<ActivityIndicator />}
                        />
                      </View>
                      <Text style={styles.pokeName}>{pok.name}</Text>
                      <Divider style={{ backgroundColor: 'gray', margin: 10 }} />
                      <View style={{ flexDirection: "row", margin: 5 }}>
                        <Text style={{ fontWeight: "bold" }}>Tipo: </Text>
                        <Text>{pok.type.join(', ')}</Text>
                      </View>
                      <View style={{ flexDirection: "row", margin: 5 }}>
                        <Text style={{ fontWeight: "bold" }}>Altura: </Text>
                        <Text>{pok.height}</Text>
                      </View>
                      <View style={{ flexDirection: "row", margin: 5 }}>
                        <Text style={{ fontWeight: "bold" }}>Peso: </Text>
                        <Text>{pok.weight}</Text>
                      </View>
                      <View style={{ flexDirection: "row", margin: 5 }}>
                        <Text style={{ fontWeight: "bold" }}>Fraquezas: </Text>
                        <Text>{pok.weaknesses.join(', ')}</Text>
                      </View>
                    </View>

                  </View>

                ))}
              </View>

            </ScrollView>
          </View>
        ) : (
            <>
              <ActivityIndicator size={"large"} color={'#fff'} />
              <Text style={{color:'#fff', textAlign: 'center'}}>Carregando ...</Text>
            </>
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
    marginLeft: 15,
    padding: 8,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10
  },
  pokeName: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 5
  },
  Normal: {
    backgroundColor: '#AAAA99',
    marginBottom: 5,
    borderRadius: 10
  },
  Fire: {
    backgroundColor: '#FE4B00',
    marginBottom: 5,
    borderRadius: 10
  },
  Water: {
    backgroundColor: '#3399FF',
    marginBottom: 5,
    borderRadius: 10
  },
  Electric: {
    backgroundColor: '#FFCB05',
    marginBottom: 5,
    borderRadius: 10
  },
  Grass: {
    backgroundColor: '#77CC55',
    marginBottom: 5,
    borderRadius: 10,
  },
  Ice: {
    backgroundColor: '#66CCFF',
    marginBottom: 5,
    borderRadius: 10
  },
  Fighting: {
    backgroundColor: '#BB5544',
    marginBottom: 5,
    borderRadius: 10
  },
  Poison: {
    backgroundColor: '#AA5599',
    marginBottom: 5,
    borderRadius: 10
  },
  Ground: {
    backgroundColor: '#DDBB55',
    marginBottom: 5,
    borderRadius: 10
  },
  Flying: {
    backgroundColor: '#8899FF',
    marginBottom: 5,
    borderRadius: 10
  },
  Psychic: {
    backgroundColor: '#FF5599',
    marginBottom: 5,
    borderRadius: 10
  },
  Bug: {
    backgroundColor: '#AABB22',
    marginBottom: 5,
    borderRadius: 10
  },
  Rock: {
    backgroundColor: '#BBAA66',
    marginBottom: 5,
    borderRadius: 10
  },
  Ghost: {
    backgroundColor: '#6666BB',
    marginBottom: 5,
    borderRadius: 10
  },
  Dragon: {
    backgroundColor: '#7766EE',
    marginBottom: 5,
    borderRadius: 10
  },
  Dark: {
    backgroundColor: '#775544',
    marginBottom: 5,
    borderRadius: 10
  },
  Steel: {
    backgroundColor: '#AAAABB',
    marginBottom: 5,
    borderRadius: 10
  },
  Fairy: {
    backgroundColor: '#EE99EE',
    marginBottom: 5,
    borderRadius: 10
  }
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