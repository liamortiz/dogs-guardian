import React, { useState, useEffect } from 'react';

interface AnimalRespData {
    id: number,
    type: string,
    name: string,
    breeds: object,
    age: string,
    gender: string,
    size: string,
    description: string,
    photos: object[] | []
}

const AnimalCard: React.FC<{animal:AnimalRespData}> = ({ animal }) => {
    
    const [imageSrc, setImageSrc] = useState("");

    function setPreviewImage() {
        if (animal.photos[0] && (animal.photos[0] as {medium: string}).medium) {
            setImageSrc((animal.photos[0] as {medium: string}).medium);
        }
    }

    function parseDescription (description: string) : string {
        return description.replace(/[^a-zA-Z0-9 ]/g, "");
    }

    useEffect(setPreviewImage, [animal.photos]);

    return (
        <div className="animal-card">
            <h2>Hi I'm, <span>{animal.name}</span></h2>
            <div className="divider"></div>

            {imageSrc && <img src={imageSrc} alt=""/>}
            
            {animal.description && 
                <>
                <h3>About me</h3>
                <p className="description">{parseDescription(animal.description)}..</p>
                </>
            }
            <a href="/" className="a-btn">More</a>
        </div>
    )
}
export default AnimalCard;