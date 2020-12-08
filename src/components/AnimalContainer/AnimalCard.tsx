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

    function setPreviewImage() {
        if (animal.photos[0] && (animal.photos[0] as {small: string}).small) {
            setImageSrc((animal.photos[0] as {small: string}).small);
        }
    }

    console.log(animal.photos)

    useEffect(setPreviewImage, []);

    return (
        <div className="animal-card">
            <h2>Hi I'm, <span>{animal.name}</span></h2>
            <div className="divider"></div>
            <img src={imageSrc} className={imageSrc ? "" : "missing-image-icon"}/>
            {animal.description && 
                <>
                <h3>Description</h3>
                <p className="description">{animal.description}</p>
                </>
            }
            <a href="/" className="a-btn">Details</a>
        </div>
    )
}
export default DogCard;