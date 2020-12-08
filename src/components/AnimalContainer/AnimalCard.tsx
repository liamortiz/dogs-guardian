import React, { useState, useEffect } from 'react';

interface AnimalRespData {
    id: number,
    name: string,
    breeds: object,
    age: string,
    gender: string,
    size: string,
    description: string,
    photos: object[] | []
}

const DogCard: React.FC<{animal:AnimalRespData}> = ({ animal }) => {
    
    const [imageSrc, setImageSrc] = useState("");

    function setPreviewImage(): void {
        if (animal.photos[0] && (animal.photos[0] as {small: string}).small) {
            setImageSrc((animal.photos[0] as {small: string}).small);
        }
    }

    console.log(animal.photos)

    useEffect(setPreviewImage, []);

    return (
        <div className="animal-card">
            <h2>{animal.name}</h2>
            <p>{animal.description}</p>
            <img src={imageSrc}/>
        </div>
    )
}
export default DogCard;