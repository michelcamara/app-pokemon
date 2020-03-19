import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, Dimensions } from 'react-native';
import { Header } from 'react-native-elements';

import axios from 'axios';

const { width } = Dimensions.get('window');

export default function App() {
  const [poke, setPoke] = useState([]);
  const [tipos, setTipos] = useState([]);


  useEffect(() => {
    async function loadPokemons() {
      const response = await axios.get('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json');
      setPoke(response.data.pokemon);

      //Filtrando os tipos de pokemons
      const types = [];
      response.data.pokemon.map(g => (
        // eslint-disable-next-line array-callback-return
        g.type.map(j => {
          if (types.filter(p => p === j).length === 0) {
            types.push(j);
          }
        })
      ));
      setTipos(types);
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
          <View style={styles.containerFilter}>
            <Text>Filtrar</Text>
            <View style={styles.filter} >
              {tipos.map(tipo => (
                <Text key={tipo} style={styles.textTypes}>{tipo}</Text>
              ))}
            </View>
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
  containerFilter: {
    flexDirection: "column"
  },
  filter: {
    backgroundColor: '#fff',
    flexDirection: "row"
  },
  textTypes: {
    color: '#000',
    fontSize: 16,
    padding: 10
  },
});
