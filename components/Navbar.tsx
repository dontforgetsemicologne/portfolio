'use client'
import { useRef, useState, RefObject } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

gsap.registerPlugin(useGSAP);

type MenuIconProps = {
    svgRef: RefObject<SVGSVGElement | null>;
};

type HoverHandler = (
    isEntering: boolean,
    charsRef: RefObject<HTMLDivElement | null>,
    svgRef: RefObject<SVGSVGElement | null>
) => void;

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const menuCharsRef = useRef<HTMLDivElement>(null);
    const closeCharsRef = useRef<HTMLDivElement>(null);
    const menuSvgRef = useRef<SVGSVGElement>(null);
    const closeSvgRef = useRef<SVGSVGElement>(null);
    const contactSvgRef = useRef<SVGSVGElement>(null);
    const contactCharsRef = useRef<HTMLDivElement>(null);

    // Refs for menu content sections
    const exploreTextRef = useRef<HTMLHeadingElement>(null);
    const followTextRef = useRef<HTMLHeadingElement>(null);

    const exploreItemsRef = useRef<HTMLDivElement>(null);
    const exploreRefs = {
        home: useRef<HTMLDivElement>(null),
        about: useRef<HTMLDivElement>(null),
        projects: useRef<HTMLDivElement>(null),
        contact: useRef<HTMLDivElement>(null)
    };

    const followItemsRef = useRef<HTMLDivElement>(null);
    const followRefs = {
        instagram: useRef<HTMLDivElement>(null),
        x: useRef<HTMLDivElement>(null),
        linkedin: useRef<HTMLDivElement>(null),
        github: useRef<HTMLDivElement>(null)
    };

    const bottomLeftTextRef = useRef<HTMLDivElement>(null);
    const bottomRightTextRef = useRef<HTMLDivElement>(null);
    const contactButtonRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!menuCharsRef.current || !closeCharsRef.current || !closeSvgRef.current || !contactCharsRef.current) return;
        
        gsap.set([...Array.from(menuCharsRef.current.children)], { y: 0 });
        gsap.set([...Array.from(closeCharsRef.current.children)], { y: "100%" });
        gsap.set([...Array.from(contactCharsRef.current.children)], { y: 0 });
        gsap.set(contactSvgRef.current, { y: 0 });
        
        // Set initial rotations
        gsap.set(menuSvgRef.current, { rotation: 0 });
        gsap.set(closeSvgRef.current, { rotation: 45 });
    }, { scope: menuRef });

    const handleHover: HoverHandler = (isEntering, charsRef, svgRef) => {
        const chars = charsRef.current;
        const svg = svgRef.current;
        
        if (!chars || !svg) return;

        gsap.fromTo([...Array.from(chars.children)],
            { y: isEntering ? "100%" : 0 },
            {
                y: isEntering ? 0 : 0,
                stagger: { amount: 0.2, from: "start" },
                duration: 0.4,
                ease: "power2.out",
            }
        );

        const rotationValue = isMenuOpen
            ? (isEntering ? 135 : 45)
            : (isEntering ? 90 : 0);

        gsap.to(svg, {
            rotation: rotationValue,
            duration: 0.4,
            ease: "power2.out"
        });
    };

    const handleMenuItemHover = (isEntering: boolean, element: RefObject<HTMLDivElement | null>) => {
        if (!element?.current?.children) return;
        
        const chars = element.current.children;
        if(chars.length === 0) return;

        gsap.fromTo(chars,
            { y: isEntering ? "100%" : 0 },
            {
                y: isEntering ? 0 : 0,
                stagger: { amount: 0.2, from: "start" },
                duration: 0.4,
                ease: "power2.out",
            }
        );
    };

    const handleContactHover = (isEntering: boolean, element: RefObject<HTMLDivElement | null>, svg: RefObject<SVGSVGElement | null>) => {
        if(!element?.current?.children) return;

        if(!svg?.current) return;

        const charRef = element.current.children;
        const svgRef = svg.current;

        gsap.fromTo(charRef,
            { y: isEntering ? "100%" : 0 },
            {
                y: isEntering ? 0 : 0,
                stagger: { amount: 0.2, from: "start" },
                duration: 0.4,
                ease: "power2.out",
            }
        );

        gsap.fromTo(svgRef, 
            { 
                x: isEntering ? "-100%" : 0,
                y: isEntering ? "100%" : 0
            },
            {
                x: isEntering ? 0 : 0,
                y: isEntering ? 0 : 0,
                duration: 0.4,
                ease: "power2.out",
            }
        );

    };

    const handleMenuClick = () => {
        if (!menuCharsRef.current || !closeCharsRef.current || !menuSvgRef.current || !closeSvgRef.current) return;

        const tl = gsap.timeline();

        if (!isMenuOpen) {
            tl.to([...Array.from(menuCharsRef.current.children)], { 
                y: "-100%", 
                duration: 0.4 
            })
            .to([...Array.from(closeCharsRef.current.children)], { 
                y: 0, 
                duration: 0.4 
            }, "-=0.3")
            .to(closeSvgRef.current, { 
                rotation: 45, 
                duration: 0.4 
            }, 0);

            const exploreElements = [
                exploreRefs.home.current,
                exploreRefs.about.current,
                exploreRefs.projects.current,
                exploreRefs.contact.current
            ];
    
            const followElements = [
                followRefs.instagram.current,
                followRefs.x.current,
                followRefs.linkedin.current,
                followRefs.github.current
            ];

            gsap.set([
                exploreTextRef.current,
                followTextRef.current,
                ...exploreElements,
                ...followElements,
                bottomLeftTextRef.current,
                bottomRightTextRef.current,
                contactButtonRef.current
            ].filter(Boolean), { y: "100%", opacity: 0 });

            // Reveal all elements simultaneously
            tl.to([
                exploreTextRef.current,
                followTextRef.current,
                ...exploreElements,
                ...followElements,
                bottomLeftTextRef.current,
                bottomRightTextRef.current,
                contactButtonRef.current
            ].filter(Boolean), {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power3.out"
            }, "-=0.2");
        } else {
            // Menu closing sequence
            tl.to([...Array.from(closeCharsRef.current.children)], { 
                y: "100%",
                duration: 0.4 
            })
            .to([...Array.from(menuCharsRef.current.children)], { 
                y: 0,
                duration: 0.4 
            }, "-=0.3")
            .to(menuSvgRef.current, { 
                rotation: 0,
                duration: 0.4 
            }, 0);
        }

        setIsMenuOpen(!isMenuOpen);
    };

    const PlusIcon = ({ svgRef }: MenuIconProps) => (
        <svg 
            width="16" 
            height="16" 
            viewBox="0 0 20 20" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            ref={svgRef}
            className="self-start align-top"
        >
            <path d="M12.2062 7.83505H20V12.2474H12.2062V20H7.79381V12.2474H0V7.83505H7.79381V0H12.2062V7.83505Z" fill="#CDFD50"/>
        </svg>
    );

    const ContactIcon = ({ svgRef }: MenuIconProps) => (
        <svg 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            ref={svgRef}
            className="self-start align-top"
        >
            <g clipPath="url(#clip0_542_521)">
                <path d="M2 14L14 2" stroke="#CDFD50" strokeWidth="4" strokeMiterlimit="10"/>
                <path d="M4 2H14V12" stroke="#CDFD50" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="square"/>
            </g>
            <defs>
                <clipPath id="clip0_542_521">
                    <rect width="16" height="16" fill="white"/>
                </clipPath>
            </defs>
        </svg>
    );

    const InfoText = () => (
        <div className="flex flex-row">
            
        </div>
    );

    return (
        <>
            <nav className="flex items-center justify-between py-6 px-12 text-white">
                <h1>semicologne</h1>
                <div className="text-white text-sm font-F37Judge text-right leading-[16px] tracking-wide">
                    Your friendly neighbourhood<br />
                    <span className="text-[#CDFD50]">web designer &amp; animator.</span>
                </div>
                <div className="text-white text-sm font-Neue text-center leading-[16px] tracking-wide">
                    <span className="text-xs text-[#CDFD50]">(+91, India)</span><br />
                    28.5260° N, 77.1970° E
                </div>
                <div className="text-white text-sm font-F37Judge leading-[16px] tracking-wider">
                    <span className="text-[#CDFD50]">India based</span><br />
                    Working globally
                </div>
                <div 
                    className="uppercase font-F37CondensedBold text-4xl flex cursor-pointer overflow-hidden items-start gap-0"
                    ref={menuRef}
                    onClick={handleMenuClick}
                    onMouseEnter={() => !isMenuOpen && handleHover(true, menuCharsRef, menuSvgRef)}
                    onMouseLeave={() => !isMenuOpen && handleHover(false, menuCharsRef, menuSvgRef)}
                >
                    <div className="h-9 w-20 overflow-hidden left-3" ref={menuCharsRef}>
                        {'menu'.split('').map((char, index) => (
                            <span key={index} className={`inline-block ${index % 2 !== 0 ? 'font-F37ExtendedBold' : ''}`}>
                                {char}
                            </span>
                        ))}
                    </div>
                    <PlusIcon svgRef={menuSvgRef} />
                </div>
            </nav>
            <div className={`fixed h-screen w-full bg-black top-0 right-0 ${isMenuOpen ? 'block' : 'hidden'}`}>
                <div className="h-full flex flex-col pt-6 px-12">
                    <nav className="flex items-center justify-between text-white">
                        <h1>semicologne</h1>
                        <div className="text-white text-sm font-F37Judge text-right leading-[16px] tracking-wide">
                            <span className="text-[#CDFD50]">Your friendly neighbourhood</span><br />
                            web designer &amp; animator.
                        </div>
                        <div className="text-white text-sm font-Neue text-center leading-[16px] tracking-wide">
                            <span className="text-xs">(+91, India)</span><br />
                            <span className="text-[#CDFD50]">28.5260° N, 77.1970° E</span>
                        </div>
                        <div className="text-white text-sm font-F37Judge leading-[16px] tracking-wider">
                            India based<br />
                            <span className="text-[#CDFD50]">Working globally</span>
                        </div>
                        <div 
                            className="uppercase font-F37CondensedBold text-4xl flex cursor-pointer overflow-hidden left-1 items-start gap-0"
                            onClick={handleMenuClick}
                            onMouseEnter={() => isMenuOpen && handleHover(true, closeCharsRef, closeSvgRef)}
                            onMouseLeave={() => isMenuOpen && handleHover(false, closeCharsRef, closeSvgRef)}
                        >
                            <div className="h-9 w-20 overflow-hidden left-3" ref={closeCharsRef}>
                                {'close'.split('').map((char, index) => (
                                    <span key={index} className={`inline-block ${index % 2 !== 0 ? 'font-F37ExtendedBold' : ''}`}>
                                        {char}
                                    </span>
                                ))}
                            </div>
                            <PlusIcon svgRef={closeSvgRef} />
                        </div>
                    </nav>
                    <div className="flex-1 flex flex-col">
                        <div className="flex-1">
                            <div className="flex items-center justify-between py-24">
                                <div className="text-left">
                                    <h2 ref={exploreTextRef} className="font-F37Judge font-semibold text-xl leading-none overflow-hidden text-white mb-0">
                                        Explore
                                    </h2>
                                    <div ref={exploreItemsRef} className="flex flex-col text-8xl leading-none font-F37CondensedBold text-[#CDFD50] w-full">
                                        {[
                                            {
                                                comp: 'home',
                                                link: '/'
                                            },
                                            {
                                                comp: 'about',
                                                link: '/about'
                                            },
                                            {
                                                comp:'projects',
                                                link: '/projects'
                                            },{
                                                comp: 'contact',
                                                link: '/contact'
                                            }
                                        ].map((word) => (
                                            <Link key={word.comp} href={word.link}> 
                                                <div 
                                                    ref={exploreRefs[word.comp as keyof typeof exploreRefs]}
                                                    className="overflow-hidden cursor-pointer w-auto whitespace-nowrap px-1"
                                                    onMouseEnter={() => handleMenuItemHover(true, exploreRefs[word.comp as keyof typeof exploreRefs])}
                                                    onMouseLeave={() => handleMenuItemHover(false, exploreRefs[word.comp as keyof typeof exploreRefs])}
                                                >
                                                    {word.comp.split('').map((char, index) => (
                                                        <span key={index} className={`inline-block ${index % 2 !== 0 ? 'font-F37ExtendedBold' : ''}`}>
                                                            {char}
                                                        </span>
                                                    ))}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <h2 ref={followTextRef} className="font-F37Judge font-semibold text-xl leading-none overflow-hidden text-white mb-0">
                                        Follow Alen
                                    </h2>
                                    <div ref={followItemsRef} className="flex flex-col text-8xl leading-none font-F37CondensedBold text-[#CDFD50] w-full">
                                        {[
                                            { 
                                                site: 'instagram',
                                                link: 'https://www.instagram.com/cyriacalen13/'
                                            },
                                            {
                                                site: ' x',
                                                link: 'https://x.com/CyriacAlen'
                                            },
                                            {
                                                site: 'linkedin',
                                                link: 'https://linkedin.com/in/cyriacalen13'
                                            },
                                            {
                                                site: 'github',
                                                link: 'https://github.com/dontforgetsemicologne'
                                            }
                                        ].map((word) => (
                                            <Link key={word.site} href={word.link}>
                                            <div 
                                                ref={followRefs[word.site.trim() as keyof typeof followRefs]}
                                                className="overflow-hidden cursor-pointer w-auto whitespace-nowrap px-1"
                                                onMouseEnter={() => handleMenuItemHover(true, followRefs[word.site.trim() as keyof typeof followRefs])}
                                                onMouseLeave={() => handleMenuItemHover(false, followRefs[word.site.trim() as keyof typeof followRefs])}
                                            >
                                                {word.site.split('').map((char, index) => (
                                                    <span key={index} className={`inline-block ${index % 2 !== 0 ? 'font-F37ExtendedBold' : ''}`}>
                                                        {char}
                                                    </span>
                                                ))}
                                            </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-6">
                            <div className="flex items-end justify-between">
                                <div ref={bottomLeftTextRef} className="text-white text-sm font-F37Judge leading-[16px] tracking-wide overflow-hidden">
                                    Let's start building<br />
                                    something amazing together.
                                </div>
                                <Link href='mailto:cyriacalen13@outlook.com' className="flex items-center">
                                    <div 
                                        ref={contactButtonRef}
                                        className="uppercase font-F37CondensedBold text-4xl flex cursor-pointer overflow-hidden flex-row items-start gap-0.5"
                                        onMouseEnter={() => handleContactHover(true, contactCharsRef, contactSvgRef)}
                                        onMouseLeave={() => handleContactHover(false, contactCharsRef, contactSvgRef)}
                                    >
                                        
                                        <div className="h-9 w-[11.25rem] overflow-hidden left-3 text-[#CDFD50]" ref={contactCharsRef}>
                                            {'contact\u00A0alen'.split('').map((char, index) => (
                                                <span key={index} className={`inline-block ${index % 2 !== 0 ? 'font-F37ExtendedBold' : ''}`}>
                                                    {char}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="overflow-hidden w-4 h-4">
                                            <ContactIcon svgRef={contactSvgRef} />
                                        </div>
                                    </div>
                                </Link>
                                <div ref={bottomRightTextRef} className="text-white text-sm font-F37Judge leading-[16px] tracking-wide overflow-hidden">
                                    <span className="font-F37Judge">&copy;</span> semicologne<span className="font-F37Judge">&trade;</span> 2025. All rights reserved
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}