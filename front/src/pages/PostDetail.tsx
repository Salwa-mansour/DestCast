import { useEffect, useState,useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { PortableText } from '@portabletext/react'
import { client } from '../sanity/sanityClient'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faList} from '@fortawesome/free-solid-svg-icons'
import { Post } from './Posts'
import { customPortableTextComponents } from '../components/PortableTextComponents'

import { urlFor } from '../utils/urlFor'
import '../css/postDetail.css'
import { LocationCoords, useTripWeather } from '../hooks/useTripWeather'
import { WeatherDatePicker, WeatherSummary, DailyCast } from '../components/TripWeatherComponents'
import WeatherPop from '../components/WeatherPop'
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface Location {
  lng: number
  lat: number
}

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<Location | null>(null);
  const weather = useTripWeather(location!);
  const [isPopOpen, setIsPopOpen] = useState<boolean>(false);
  const asideRef = useRef(null);
  const postRef = useRef(null);

  useGSAP(() => {
    // Initialize GSAP matchMedia for responsive rules
    let mm = gsap.matchMedia();

   // Desktop-only condition
   mm.add("(min-width: 867px)", () => {
      ScrollTrigger.create({
        trigger: postRef.current,       // Master trigger: the .post article container
        start: "top top+=20",           // Pins when top of .post hits top of viewport (+20px breathing room)
        end: "bottom bottom",           // Releases when bottom of .post hits bottom of viewport
        pin: asideRef.current,          // The element to actually lock in place
        pinSpacing: false,              // Keeps CSS grid layout clean
        markers: true,                  // Keep true to check visual layout lines
      });

      return () => {};
    });

     
    return () => mm.revert(); // Clean up matchMedia on unmount
  }, []);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "post" && _id == $id][0]{ 
          _id, 
          slug, 
          title, 
          body, 
          locationDetails, 
          mainImage, 
          "seo": {
            "metaTitle": coalesce(seo.metaTitle, title),
            "metaDescription": coalesce(seo.metaDescription, pt::text(body)[0...160]),
            "openGraphImage": coalesce(seo.openGraphImage, mainImage)
          } 
        }`,
        { id }
      )
      .then((data: Post) => {
        setPost(data)
        if (data?.locationDetails?.lat && data?.locationDetails?.lng) {
          setLocation(data.locationDetails)
        }
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [id])

  // Safely compute SEO values directly from the loaded post state
  const seoTitle = post?.seo?.metaTitle || post?.title || "DestCast";
  const seoDescription = post?.seo?.metaDescription;
  const ogImageUrl = post?.seo?.openGraphImage 
    ? urlFor(post.seo.openGraphImage).width(1200).height(630).url() 
    : undefined;

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        {seoDescription && (
          <meta name="description" content={seoDescription} />
        )}

        {/* Open Graph / Social Sharing Meta Tags */}
        <meta property="og:title" content={seoTitle} />
        {seoDescription && <meta property="og:description" content={seoDescription} />}
        {ogImageUrl && <meta property="og:image" content={ogImageUrl} />}
      </Helmet>

      <section className="postDetail-container container">
        {loading ? (
          <p className="loading-text">Loading post...</p>
        ) : !post ? (
          <p className="error-text">Post not found.</p>
        ) : (
          <div className="main-wrapper">
            <Link to="/posts" className="back-link" title="Back to All Posts">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="back-caret-icon"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </Link>

            <article className="single-page-content">
              <header className="post-header" role="post header">
                {post.mainImage?.asset && (
                  <figure className="main-img">
                    <img
                      src={urlFor(post.mainImage.asset).width(1200).height(600).url()}
                      alt={post.title}
                    />
                  {post.mainImage?.imageAttribution && (
                    <figcaption 
                      className="image-attribution"
                      dangerouslySetInnerHTML={{ __html: post.mainImage.imageAttribution }} 
                    />
                  )}
                  </figure>
                )}
                <div className="post-header__data">
                  <h1 className="post-title">{post.title}</h1>
                  {post.locationDetails && (
                    <h6 className="location">
                      📍 {post.locationDetails.cityName}, {post.locationDetails.countryName}
                    </h6>
                  )}
                </div>
              </header>

              <div ref={asideRef} className="weather-quiery">
                <div className="weather-inline-wrapper">
                  <div className="weather-summary-wrapper box">
                    <WeatherSummary weather={weather} />
                    <button
                      className="mobile-only-btn"
                      onClick={() => setIsPopOpen(true)}
                    >
                      <FontAwesomeIcon icon={faList} /> Show daily cast
                    </button>
                  </div>
                  <div className="datePicker-wrapper">
                    <WeatherDatePicker weather={weather} />
                  </div>
                  <div className="desktop-daily-cast box">
                    <DailyCast weather={weather} />
                  </div>
                </div>

                <WeatherPop
                  isOpen={isPopOpen}
                  onClose={() => setIsPopOpen(false)}
                  weather={weather}
                />
              </div>

              <div ref={postRef} className="post">
                  <div className='text-container'>
                        {post.body ? (
                          <PortableText
                            value={post.body}
                            components={customPortableTextComponents}
                          />
                        ) : (
                          <p>No content written yet.</p>
                        )}
                  </div>
              </div>
            </article>
          </div>
        )}
      </section>
    </>
  )
}