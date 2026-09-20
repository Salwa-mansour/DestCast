import { useState, useEffect } from 'react';
import { client } from '../sanity/sanityClient';
import { PageMetaData } from '../pages/Posts'; // or wherever your types live

export function usePageMetadata(slug: string) {
  // Explicitly type the state using your interface or null
  const [pageMetaData, setPageMetaData] = useState<PageMetaData | null>(null);
  const [metaDataLoading, setMetaDataLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!slug) return;

    setMetaDataLoading(true);
    const query = `*[_type == "page" && slug.current == $slug][0]{
      title,
      headerImage,
      content
    }`;

    client
      .fetch(query, { slug })
      .then((data) => {
        setPageMetaData(data);
        setMetaDataLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching page metadata:", err);
        setMetaDataLoading(false);
      });
  }, [slug]);

  return { pageMetaData, metaDataLoading };
}