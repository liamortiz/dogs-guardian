import React from 'react';

import sampleImage from '../../sample.jpg';

interface DogCardProps {
    name: string,
    image: string
}

const DogCard: React.FC <DogCardProps> = ({ name, image }) => {
    return (
        <div className="dog-card">
            <img src={sampleImage}/>
            <h2>Hello I'm <span>{name}</span></h2>
            <a className="a-btn" href="/">Details</a>
        </div>
    )
}
export default DogCard;