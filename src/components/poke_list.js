import React from 'react';

const PokeList = ({onPokemonClick,listLeft,listRight}) => {

    if(!listLeft.name || !listRight.name){
        return <div>Loading..</div>;
    }

    const leftId = listLeft.id;
    const leftName = listLeft.name.toUpperCase();
    const rightId = listRight.id;
    const rightName = listRight.name.toUpperCase();

    return (
        <div className="list font">
            <div className="left-list" onClick={()=> onPokemonClick(leftId)}>
                #{leftId} {leftName}
            </div>
            <div className="right-list" onClick={()=> onPokemonClick(rightId)}>
                #{rightId} {rightName}
            </div>
        </div>
    );
};

export default PokeList;