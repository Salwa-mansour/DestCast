import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'                    
import { client } from '../sanity/sanityClient'
import imageUrlBuilder from '@sanity/image-url'
import '../css/home.css'
import Features from '../components/Features'
import { Link } from 'react-router-dom'

// Register plugins outside the component
gsap.registerPlugin(ScrollTrigger, useGSAP)

import { createImageUrlBuilder } from '@sanity/image-url' // Updated import

// Initialize using createImageUrlBuilder instead
const builder = createImageUrlBuilder(client)
const urlFor = (source) => builder.image(source)

function Home() {
  const containerRef = useRef()
  const [homeData, setHomeData] = useState(null)
  const [loading, setLoading] = useState(true)

useEffect(() => {
  const query = `*[_type == "home"][0]{
    ...,
    "featuresList": featuresList[]{
      ...,
      // If feature heading is empty, fall back to the linked post's title
      "heading": coalesce(heading, linkedPost->title),
      
      // If feature text is empty, fall back to the linked post's excerpt 
      "text": coalesce(text, linkedPost->excerpt),

      // Fall back feature image to the linked post's main image if missing
      "image": coalesce(image, linkedPost->mainImage),
      
      // Also grab the post's slug so you can build the dynamic link path!
      "postId": linkedPost->_id
    }
  }`;

  client.fetch(query)
    .then((data) => {
      setHomeData(data)
      setLoading(false)
    })
    .catch((err) => {
      console.error('Failed to fetch home data:', err)
      setLoading(false)
    })
}, [])

  useGSAP(
    () => {
      // 1. Add body class
      document.body.classList.add('js-enabled')

      // 2. Setup ScrollTrigger Animation
  gsap.to('.sun-glow-wrapper', {
        opacity: 0.2,
        scale: 0.7,
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
       //   markers: true,
        },
      });
    gsap.from('.hero-content > *', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.2,
      });
      // 3. ScrollTrigger: Background Scale (Video Zoom Illusion)
     gsap.to('.hero-image-wrapper', {
      scale: 1.15,               // Slightly smaller scale prevents pixel blurring on large screens
      duration: 12,              // Slightly longer duration makes slow zooms feel more luxurious
      ease: 'sine.inOut',        // Gentle acceleration/deceleration avoids harsh abrupt starts/stops
    
      force3D: true,             // Forces GPU layer creation for smooth 60/120 FPS rendering
    })
      // 3. Return cleanup for non-GSAP side effects (like body class)
      return () => {
        document.body.classList.remove('js-enabled')
      }
    },
    { scope: containerRef}
  )
  const heroImageSrc = homeData?.heroImage 
    ? urlFor(homeData.heroImage).url() 
    : ' '

  return (
    <>
    <div ref={containerRef}>
      <section className="hero">
        <div className="hero-image-wrapper">
          <img
            className="hero-image"
            src={heroImageSrc}
            alt="Hero background visual"
          />

          <div className="sun-glow-wrapper">
            <div className="sun-shine"></div>
            <svg viewBox="0 0 100 100" className="sun-icon">
              <g strokeLinecap="round" strokeLinejoin="round">
                <circle
                  cx="50"
                  cy="50"
                  r="18"
                  className="sun-body"
                  fill="#FFDE59"
                  stroke="#FF914D"
                  strokeWidth="4"
                />

                <g className="sun-rays" stroke="#FF914D" strokeWidth="4">
                  <line x1="50" y1="19" x2="50" y2="28" />
                  <line x1="50" y1="72" x2="50" y2="81" />
                  <line x1="19" y1="50" x2="28" y2="50" />
                  <line x1="72" y1="50" x2="81" y2="50" />
                  <line x1="28" y1="28" x2="34" y2="34" />
                  <line x1="66" y1="66" x2="72" y2="72" />
                  <line x1="28" y1="72" x2="34" y2="66" />
                  <line x1="66" y1="34" x2="72" y2="28" />
                </g>
              </g>
            </svg>
          </div>
        </div>

        <div className="hero-content">
          <h1 className="hero-title">
            {homeData?.heroHeading || 'Advunture'}
          </h1>
          <p>
            {homeData?.heroText || 'Discover the world with us and decide your next intended path'}
          </p>
          <Link 
            className="hero-button"
            to={homeData?.heroCtaLink || '/posts'}
          >
            {homeData?.heroCtaText || 'Start Discovering'}
          </Link>
        </div>
      </section>
    </div>
    <Features data={homeData} />
    </>
  )
}

export default Home