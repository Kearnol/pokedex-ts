import React from 'react';
import { useParams, Link, Params } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import Table from 'react-bootstrap/Table';
import {Pokemon} from '../index';

interface Props {
    allPokemon: Pokemon[]
}

function ViewPokemonDetails({allPokemon}: Props){
    const {num}: Readonly<Params<string>> = useParams()
    const [ pokemon ]: Pokemon[] = allPokemon.filter((p: Pokemon) => p.num.toString() === num);
    let prevEvolution = pokemon?.prev_evolution ? pokemon.prev_evolution[pokemon.prev_evolution.length-1] : null;
    let nextEvolution = pokemon?.next_evolution ? pokemon.next_evolution[0]: null;
    
    return(
        <div className="d-flex flex-column">
         <Image src={pokemon.img} style={{height: 150, width: 150, margin: "auto"}}/>
         <Link to={"/"}>Back to Search</Link>
         <Table style={{width: "80vw", margin: "auto"}}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Number</th>
                    <th>Type</th>
                    <th>Weaknesses</th>
                    <th>Height</th>
                    <th>Weight</th>
                    <th>Previous Evolution</th>
                    <th>Next Evolution</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{pokemon.name}</td>
                    <td>{pokemon.num}</td>
                    <td>
                        {pokemon.type.map((t: string) => <li>{t}</li>)}
                    </td>
                    <td>{pokemon.weaknesses.map((w: string) => <li>{w}</li>)}</td>
                    <td>{pokemon.height}</td>
                    <td>{pokemon.weight}</td>
                    <td>
                        {prevEvolution ?
                        (<Link to={`/${prevEvolution?.num}`}>{prevEvolution.name ?? "N/A"}</Link>)
                        :
                        "N/A"}
                    </td>
                    <td>
                        {nextEvolution ?
                        (<Link to={`/${nextEvolution?.num}`}>{nextEvolution.name ?? "N/A"}</Link>)
                        :
                        "N/A"
                        }
                    </td>
                </tr>
            </tbody>
        </Table>
        </div>
    )
}

export default ViewPokemonDetails;