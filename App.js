import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, TextInput, ImageBackground} from 'react-native';

const Pokemons = () => {
  const [pokemons, setPokemons] = useState([]);
  const [searchfeild, setSearchfeild] = useState("");

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = () => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=500')
      .then(response => response.json())
      .then(pokemons => setPokemons(pokemons.results));
  };
  return (
    <ImageBackground source={require('./img/pokedexVertical.png')} style={styles.backgoundImage}>
    <View>
      <View>
        <TextInput
          style={styles.search}
          onChangeText={(val) => setSearchfeild(val)}
        />
      </View>
        {searchfeild==""?(<Image style={styles.noSignal} source={require('./img/noSignal.gif')}></Image>):(
          <View>
          {pokemons
            .filter(pokemon =>
              pokemon.name.toLowerCase().includes(searchfeild.toLowerCase())
            ).map((pokemon, index) => {
              return (
                <View
                  key={index}
                  >
                  <Image
                    style={styles.pokemon}
                    source={{
                      uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${
                        pokemon.name}.png`,
                    }}
                  />
                    <Text style={styles.pokemonText}>{pokemon.name.toUpperCase()}</Text>
                </View>
              );
            })}
        </View>
        )}
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgoundImage:{
    position: 'absolute',
    top: 0,
    height: 1000,
    left: 0,
    width: '100%',
    alignContent: 'center',
    alignItems: 'center'
  },
  pokemon:{
    position: 'relative',
    zIndex: -1, 
    top: 140,
    left: -20,
    width: 200, 
    height: 200
  },
  noSignal:{
    position: 'absolute',
    zIndex: -1, 
    top: 140,
    left: -170,
    width: 300, 
    height: 200
  },
  search:{
    position: 'absolute',
    top: 630,
    left: -40, 
    color: 'white',
    fontSize: 40,
  },
  pokemonText:{
    position: 'relative',
    top: 250,
    left: -50,
    fontSize: 20,
  }
});

const App=()=>{
  return(
    <View>
      <Pokemons/>
    </View>
  )
}

export default App;