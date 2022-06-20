import React, {useState, useEffect} from 'react';
import PokeTable from './types/views/PokeTable';
import logo from './assets/pokedexLogo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'react-bootstrap/Image';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ViewPokemonDetails from './types/views/ViewPokemon';
import axios from 'axios';
import { Pokemon }  from './types/index';

interface ServerResponse {
  data: ServerData;
}

interface ServerData {
  pokemon: Pokemon[]
}

function App() {
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [searchString, setSearchString] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<Set<string>>(new Set());
  const [weaknessFilter, setWeaknessFilter] = useState<Set<string>>(new Set());
  const searchPkg = {
    searchString,
    setSearchString,
    typeFilter, 
    setTypeFilter,
    weaknessFilter, 
    setWeaknessFilter,
  }


  //fetch all pokemon at the top level for all sub-components to share
  useEffect(() =>{
    axios.get<ServerData>('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json')
    .then((res: ServerResponse) => {
      console.log(res.data);
      const {pokemon: returnedPokemon} = res.data;
      setAllPokemon(_ => returnedPokemon)
    })
    .catch(err => console.log(err));  
  }, [])
  
  
  return (
    <div className="App">
      <header className="App-header">
          <Image src={logo} style={{height: 75, width: 75}} className="mx-2 me-2" alt="logo" />
          <h1 className="ms-2">Pokédex</h1>
      </header>
      <Router>
        <Routes>
          <Route path={"/:num"} element={<ViewPokemonDetails allPokemon={allPokemon}/>} />
          <Route path="/" element={<PokeTable allPokemon={allPokemon} searchPkg={searchPkg} />} />
        </Routes>
      </Router>
    </div>
    )
};

export default App;
