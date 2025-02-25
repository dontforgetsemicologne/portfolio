'use client'

import { gsap } from "gsap";
import { useRef, useEffect, useState } from "react";

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const firstDigitRef = useRef<HTMLDivElement>(null);
    const secondDigitRef = useRef<HTMLDivElement>(null);
    const thirdDigitRef = useRef<HTMLDivElement>(null);
    const revealerRefs = useRef<(HTMLDivElement | null)[]>([]);

    const setRevealerRef = (index: number) => (el: HTMLDivElement | null) => {
        revealerRefs.current[index] = el;
    };

    useEffect(() => {
        if (!firstDigitRef.current || !secondDigitRef.current || !thirdDigitRef.current) return;
        let multiplier: number;

        if(window.innerWidth >= 1028) {
            multiplier = -310
        } else if(window.innerWidth >= 768 && window.innerWidth < 1028) {
            multiplier = -250;
        } else {
            multiplier= -200;
        }
        const getYPosition = (number: number) => `${number * multiplier}px`;

        gsap.set(revealerRefs.current, { scale: 0 });

        const firstSequence = () => {
            const tl = gsap.timeline();
            
            tl.to(firstDigitRef.current, {
                y: getYPosition(0),
                duration: 0.7,
                ease: 'power4.inOut',
            })
            .to(secondDigitRef.current, {
                y: getYPosition(3),
                duration: 0.7,
                ease: 'power4.inOut',
            }, '<')
            .to(thirdDigitRef.current, {
                y: getYPosition(5),
                duration: 0.7,
                ease: 'power4.inOut',
            }, '<0.2')
            .then(() => {
                setTimeout(secondSequence, 500);
            });
        };

        const secondSequence = () => {
            const tl = gsap.timeline();
            
            tl.to(firstDigitRef.current, {
                y: getYPosition(0),
                duration: 0.7,
                ease: 'power4.inOut',
            })
            .to(secondDigitRef.current, {
                y: getYPosition(7),
                duration: 0.7,
                ease: 'power4.inOut',
            }, '<')
            .to(thirdDigitRef.current, {
                y: getYPosition(0),
                duration: 0.7,
                ease: 'power4.inOut',
            }, '<0.2')
            .then(() => {
                setTimeout(thirdSequence, 500);
            });
        };

        const thirdSequence = () => {
            const tl = gsap.timeline();
            
            tl.to(firstDigitRef.current, {
                y: getYPosition(1),
                duration: 0.7,
                ease: 'power4.inOut',
            })
            .to(secondDigitRef.current, {
                y: getYPosition(0),
                duration: 0.7,
                ease: 'power4.inOut',
            }, '<')
            .to(thirdDigitRef.current, {
                y: getYPosition(0),
                duration: 0.7,
                ease: 'power4.inOut',
            }, '<0.2')
            .then(() => {
                setTimeout(starReveal, 100);
            });
        };

        const starReveal = () => {
            const tl = gsap.timeline();
            tl.to([firstDigitRef.current, secondDigitRef.current, thirdDigitRef.current], {
                opacity: 0,
                duration: 0.5,
                ease: 'power2.inOut',
            });

            const delays = [0, 0.2, 0.5];
            revealerRefs.current.forEach((el, i) => {
                if (el) {
                    tl.to(el, {
                        scale: 45,
                        duration: 1,
                        ease: 'power4.inOut',
                    }, delays[i]);
                }
            });

            tl.then(() => {
                setTimeout(() => setIsLoading(false), 500);
            });
        };

        setTimeout(firstSequence, 1000);

        return () => {
            gsap.killTweensOf([
                firstDigitRef.current,
                secondDigitRef.current,
                thirdDigitRef.current,
                ...revealerRefs.current
            ]);
        };
    }, []);

    if (!isLoading) return null;
    
    return (
        <div className="fixed inset-0 z-50 bg-black">
            <div ref={containerRef} className="relative h-full">
                {/* Text and Numbers Container */}
                <div className="absolute w-full h-full flex flex-col">
                    {/* Text */}
                    <div className="lg:absolute lg:bottom-2 lg:right-2 md:absolute md:bottom-4 md:left-4 sm:absolute sm:bottom-4 sm:left-4 absolute bottom-4 left-4">
                        <div className="text-white text-sm font-F37Judge leading-[16px] text-left lg:text-right">
                            Your friendly neighbourhood<br />
                            web designer &amp; animator.
                        </div>
                    </div>
                    
                    {/* Numbers container */}
                    <div className="flex-grow flex items-center justify-center">
                        {/* First digit */}
                        <div className="lg:h-[310px] lg:w-[170px] md:h-[250px] md:w-[130px] sm:h-[200px] sm:w-[110px] h-[200px] w-[110px] overflow-hidden mx-0">
                            <div 
                                ref={firstDigitRef} 
                                className="flex flex-col text-[#CDFD50]"
                                style={{ transform: 'translateY(0)' }}
                            >
                                {[0,1].map((num) => (
                                    <h1 
                                        key={num}
                                        className="lg:h-[310px] md:h-[250px] sm:h-[200px] h-[200px] flex items-center lg:text-[400px] md:text-[300px] sm:text-[250px] text-[200px] leading-none font-F37CondensedBold"
                                    >
                                        {num}
                                    </h1>
                                ))}
                            </div>
                        </div>
                        
                        {/* Second digit */}
                        <div className="lg:h-[310px] lg:w-[235px] md:h-[250px] md:w-[180px] sm:h-[200px] sm:w-[150px] h-[200px] w-[150px] overflow-hidden mx-0">
                            <div 
                                ref={secondDigitRef} 
                                className="flex flex-col text-[#CDFD50]"
                                style={{ transform: 'translateY(0)' }}
                            >
                                {[0,1,2,3,4,5,6,7,8,9].map((num) => (
                                    <h1 
                                        key={num}
                                        className="lg:h-[310px] md:h-[250px] sm:h-[200px] h-[200px] flex items-center lg:text-[400px] md:text-[300px] sm:text-[250px] text-[200px] leading-none font-F37ExtendedBold"
                                    >
                                        {num}
                                    </h1>
                                ))}
                            </div>
                        </div>

                        {/* Third digit */}
                        <div className="lg:h-[310px] lg:w-[170px] md:h-[250px] md:w-[130px] sm:h-[200px] sm:w-[110px] h-[200px] w-[110px] overflow-hidden mx-0">
                            <div 
                                ref={thirdDigitRef} 
                                className="flex flex-col text-[#CDFD50]"
                                style={{ transform: 'translateY(0)' }}
                            >
                                {[0,1,2,3,4,5].map((num) => (
                                    <h1 
                                        key={num}
                                        className="lg:h-[310px] md:h-[250px] sm:h-[200px] h-[200px] flex items-center lg:text-[400px] md:text-[300px] sm:text-[250px] text-[200px] leading-none font-F37CondensedBold"
                                    >
                                        {num}
                                    </h1>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stars remain unchanged */}
            {[
                { fill: 'white' },
                { fill: '#CDFD50' },
                { fill: 'black' }
            ].map((star, index) => (
                <div 
                    key={index}
                    ref={setRevealerRef(index)}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                >
                    <svg 
                        width='151' 
                        height='148'
                        viewBox="0 0 151 148"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M75.9817 0L77.25 34.2209C78.0259 55.1571 94.8249 71.9475 115.762 72.7127L150.982 74L115.762 75.2873C94.8249 76.0525 78.0259 92.8429 77.25 113.779L75.9817 148L74.7134 113.779C73.9375 92.8429 57.1385 76.0525 36.2019 75.2873L0.981689 74L36.2018 72.7127C57.1384 71.9475 73.9375 55.1571 74.7134 34.2209L75.9817 0Z"
                            fill={star.fill} 
                        />
                    </svg>
                </div>
            ))}
        </div>
    );
}