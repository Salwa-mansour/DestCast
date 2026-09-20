import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PortableText } from '@portabletext/react';
import { client } from '../sanity/sanityClient'
import { urlFor } from '../utils/urlFor'

export default function StaticPage() {
  const { slug } = useParams(); // e.g., 'about' or 'privacy-policy'
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch(`*[_type == "page" && slug.current == $slug][0]`, { slug })
      .then((data) => {
        setPageData(data);
        setLoading(false);
      })
      .catch(console.error);
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (!pageData) return <div>404 - Page Not Found</div>;

  return (
    
    <article className="max-w-3xl mx-auto px-4 py-8">
        <div className='page-header'>
             <figure className="main-img">
                <img
                src={urlFor(pageData.headerImage).width(1200).height(600).url()}
                alt={pageData.title}
                />
            </figure>
        </div>
      {/* <h1 className="text-4xl font-bold mb-6">{pageData.title}</h1> */}
      <div className="prose" style={{color:'#333'}}>
        <PortableText value={pageData.content} />
      </div>
    </article>
  );
}