import React from 'react';

const GifDisplay = ({gif}) => {
    if(!gif){
        return <div>...</div>
    } else if(!gif.data){
        return <div>...</div>
    } else if(!gif.data.length){
        return <div>Sorry, no gif currently available.</div>
    }
  
    const url = gif.data[0].images.original.url;
    return (
        <div className="top-border gray wrapper">
            <img className="gif" alt="pokemon" src={url} />
        </div>
    );
};

export default GifDisplay;