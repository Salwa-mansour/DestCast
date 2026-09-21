import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PortableText } from '@portabletext/react';
import { client } from '../sanity/sanityClient';
import { urlFor } from '../utils/urlFor';
import { Helmet } from 'react-helmet-async';

interface PageData {
  title: string;
  headerImage?: any;
  content: any;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    openGraphImage?: any;
  };
}

export default function StaticPage() {
  const { slug } = useParams<{ slug: string }>(); 
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch(
        `{
        "page": *[_type == "page" && slug.current == $slug][0]{
          title,
          headerImage,
          content,
          seo
        },
        "settings": *[_type == "siteSettings"][0]{
          title,
          seo
        }
      }[0]{
        "title": coalesce(page.seo.metaTitle, page.title, settings.seo.metaTitle, settings.title),
        "description": coalesce(page.seo.metaDescription, settings.seo.metaDescription),
        "image": coalesce(page.seo.openGraphImage, page.headerImage, settings.seo.openGraphImage),
        "content": page.content,
        "pageTitle": page.title
      }`,
        { slug }
      )
      .then((data) => {
        setPageData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  // Safely compute SEO metadata fallback values
  const seoTitle = pageData?.seo?.metaTitle || pageData?.title || "DestCast";
  const seoDescription = pageData?.seo?.metaDescription;
  
  // Use page's specific openGraphImage if available, otherwise fall back to headerImage
  const ogImageSource = pageData?.seo?.openGraphImage || pageData?.headerImage;
  const ogImageUrl = ogImageSource 
    ? urlFor(ogImageSource).width(1200).height(630).url() 
    : undefined;

  if (loading) return <div>Loading...</div>;
  if (!pageData) return <div>404 - Page Not Found</div>;

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        {seoDescription && <meta name="description" content={seoDescription} />}

        {/* Open Graph / Social Sharing Meta Tags */}
        <meta property="og:title" content={seoTitle} />
        {seoDescription && <meta property="og:description" content={seoDescription} />}
        {ogImageUrl && <meta property="og:image" content={ogImageUrl} />}
      </Helmet>

      <article className="max-w-3xl mx-auto px-4 py-8">
        <div className="page-header">
          {pageData.headerImage && pageData.headerImage.asset && (
            <figure className="main-img">
              <img
                src={urlFor(pageData.headerImage).width(1200).height(600).url()}
                alt={pageData.title || "Page header"}
              />
            </figure>
          )}
        </div>

        {/* <h1 className="text-4xl font-bold mb-6">{pageData.title}</h1> */}
        
        <div className="prose" style={{ color: '#333' }}>
          {pageData.content ? (
            <PortableText value={pageData.content} />
          ) : (
            <p>No content added yet.</p>
          )}
        </div>
      </article>
    </>
  );
}