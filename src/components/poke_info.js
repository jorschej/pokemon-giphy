import React from 'react';

const PokeInfo = ({pokemon}) => {
    if(!pokemon.sprites){
        return <div>....</div>;
    }
    const name = pokemon.name.toUpperCase();
    const sprite = pokemon.sprites.front_default;
    return (
            <div className="bottom-border gray font wrapper">
                <p>#{pokemon.id}</p>
                <img  alt={pokemon.id} src={sprite}/>
                <div>{name}</div>
            </div>
    );
};

export default PokeInfo;