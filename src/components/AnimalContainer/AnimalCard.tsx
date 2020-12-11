import React, { useState, useEffect, useRef } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

interface AnimalRespData {
    id: number,
    type: string,
    name: string,
    breeds: {primary: string},
    age: string,
    gender: string,
    size: string,
    description: string,
    photos: object[] | [],
    contact: {
        address: {
            address1: string,
            city: string,
            country: string,
            state: string
        },
        email: string,
        phone: string
    }
}

const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };

const AnimalCard: React.FC<{animal:AnimalRespData}> = ({ animal }) => {
    
    const [imageSrc, setImageSrc] = useState("");
    const [currentCardDetails, setCurrentCardDetails] = useState<number>(1);

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
                <h2>Photo<span>shoot</span></h2>
                <div className="divider"></div>

                <Carousel swipeable={true}
                    draggable={false}
                    showDots={false}
                    responsive={responsive}
                    keyBoardControl={true}
                    customTransition="all 1s"
                    transitionDuration={500}
                    containerClass="carousel-container"
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px" 
                    >
                    {
                        (animal.photos as []).map((photo: {medium: string}) => 
                            <img key={animal.id} src={photo.medium} alt=""/>)
                    }
                </Carousel>
                <ul className="extra-details">
                <li>{animal.gender}<span>•</span></li>
                <li>{animal.age}<span>•</span></li>
                <li>{animal.breeds.primary}</li>
                </ul>
            </div>
            }

            {currentCardDetails===3 &&
            <div className="details details-3">
                <h2>Adopt <span>Me</span></h2>
                <div className="divider"></div>
                <div className="dog-happy-icon"></div>
                <p>{animal.contact.address.state} {animal.contact.address.city} {animal.contact.address.country}</p>
                <p>{animal.contact.email}</p>
                <p>{animal.contact.phone}</p>
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