import React, { useState, useEffect, useRef } from 'react';
import { getAnimalById } from '../../api';

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
    const [currentCardDetails, setCurrentCardDetails] = useState<number>(1);
    const [fullAnimalDetails, setFullAnimalDetails] = useState(null);

    const smallNavigation = useRef<HTMLDivElement>(null);

    function setPreviewImage() {
        if (animal.photos[0] && (animal.photos[0] as {medium: string}).medium) {
            setImageSrc((animal.photos[0] as {medium: string}).medium);
        }
    }

    function parseDescription (description: string) : string {
        return description.replace(/[^a-zA-Z0-9 ]/g, "");
    }

    function updateActiveNav(event: React.MouseEvent) {

        const target: HTMLSpanElement = (event.target as HTMLSpanElement)
        const spanElement: HTMLSpanElement = (smallNavigation.current?.childNodes[currentCardDetails-1] as HTMLSpanElement);
        const nextNavIndex: number = parseInt(target.dataset.index as string);

        spanElement.classList.remove('active');
        target.classList.add('active');

        getAnimalById(animal.id).then(data => console.log(data));
        
        setCurrentCardDetails(nextNavIndex);
    }

    useEffect(setPreviewImage, [animal.photos]);

    return (
        <div className="animal-card">
            
            {currentCardDetails===1 &&
            <div className="details details-1">
                <h2>Hi, I'm <span>{animal.name}</span></h2>
                <div className="divider"></div>
                <img src={imageSrc} alt=""/>
                <p className="description">{parseDescription(animal.description)}..</p>
            </div>
            }

            {currentCardDetails===2 &&
            <div className="details details-2">
                <h2>Details 2</h2>
                <p>{animal.id}</p>
            </div>
            }

            {currentCardDetails===3 &&
            <div className="details details-3">
                <h2>Details 3</h2>
            </div>
            }
            <div ref={smallNavigation} className="bullet-nav">
                <span data-index="1" className="bullet-1 active" onClick={updateActiveNav}></span>
                <span data-index="2" className="bullet-2" onClick={updateActiveNav}></span>
                <span data-index="3" className="bullet-3" onClick={updateActiveNav}></span>
            </div>
        </div>
    )
}
export default AnimalCard;