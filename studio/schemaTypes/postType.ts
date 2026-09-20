import { defineType, defineField } from 'sanity';
import { LocationSelector } from '../components/LocationSelector'


export const postType = defineType({
  name: 'post',
  title: 'Travel Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Post Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
   
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
     defineField({
     name: 'mainImage',
    title: 'Main Image',
    type: 'imageWithAttribution', // Use your custom schema type here
    }),
    
   defineField({
      name: 'locationDetails',
      title: 'Destination Location',
      description: 'Select country and city to automatically save coordinates.',
      type: 'object',
      components: {
        input: LocationSelector, // Registers your custom React dropdown component
      },
      fields: [
        { name: 'countryName', type: 'string' },
        { name: 'countryCode', type: 'string' },
        { name: 'cityName', type: 'string' },
        { name: 'lat', type: 'number' },
        { name: 'lng', type: 'number' },
      ],
    }),
    defineField({
      name: 'excerpt',
      title: 'Post excerpt -- overview summary',
      type: 'string',
  
    }),
    // ----------------------------------------------------
    // NEW: Seasonal Advice & Affiliate Blocks Array
    // ----------------------------------------------------
    defineField({
      name: 'seasonalAffiliates',
      title: 'Seasonal Advice & Affiliates',
      description: 'Add tailored advice and affiliate links based on the time of year or season.',
      type: 'array',
      of: [
        defineField({
          name: 'seasonBlock',
          title: 'Season Block',
          type: 'object',
          fields: [
            defineField({
              name: 'seasonName',
              title: 'Season / Time of Year',
              type: 'string',
              options: {
                list: [
                  { title: 'Winter', value: 'winter' },
                  { title: 'Spring', value: 'spring' },
                  { title: 'Summer', value: 'summer' },
                  { title: 'Autumn / Fall', value: 'autumn' },
                  {title:'rain' , value:'rain'}
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'advice',
              title: 'Seasonal Advice',
              type: 'text',
              description: 'e.g., Great weather for walking, but pack an umbrella for sudden afternoon showers.',
            }),
            defineField({
              name: 'affiliateText',
              title: 'Button/Callout Text',
              type: 'string',
              description: 'e.g., Find cozy indoor hotels & deals',
            }),
            defineField({
              name: 'affiliateLink',
              title: 'Affiliate URL',
              type: 'url',
            }),
          ],
        }),
      ],
    }),
     defineField({
      name: 'hotelAffiliateUrl',
      title: ' Hotel Affiliate URL',
      type: 'object',
      description: 'Global fallback hotel booking link and text used if a specific post does not have one.',
      fields: [
        defineField({
          name: 'affiliateLink',
          title: 'Affiliate URL',
          type: 'url',
        }),
        defineField({
          name: 'affiliateText',
          title: 'Button/Callout Text',
          type: 'string',
          description: 'e.g., Find best hotels for these dates',
        }),
        defineField({
          name: 'description',
          title: 'Helper Description / Advice',
          type: 'text',
          description: 'e.g., Book your stay in advance to secure the best rates.',
        }),
      ],
    }),
    defineField({
      name: 'flightAffiliateUrl',
      title: ' Flight Affiliate URL',
       type: 'object',
      description: 'Global fallback flight booking link and text used if a specific post does not have one.',
      fields: [
        defineField({
          name: 'affiliateLink',
          title: 'Affiliate URL',
          type: 'url',
        }),
        defineField({
          name: 'affiliateText',
          title: 'Button/Callout Text',
          type: 'string',
          description: 'e.g., Search available flights',
        }),
        defineField({
          name: 'description',
          title: 'Helper Description / Advice',
          type: 'text',
          description: 'e.g., Compare airline ticket prices for your travel window.',
        }),
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Post Tags',
      description: 'Select relevant tags for this travel destination.',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'tag' }],
        },
      ],
    }),
   defineField({
      name: 'body',
      title: 'Body Content',
      type: 'array',
      of: [
        { type: 'block' },
        {
          name: 'image', // Keep name as 'image' so Portable Text recognizes it as an image block
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'imageAttribution',
              title: 'Image Attribution (HTML / Text)',
              type: 'text',
              rows: 2,
              description: 'Paste the full Unsplash attribution text or HTML here.',
              options: {
                isHighlighted: true, // Shows up directly when you click edit on the image in the editor
              },
            },
          ],
        },
      ],
    }),
    // Embed the SEO object here for post-specific overrides
    defineField({
      name: 'seo',
      title: 'Post SEO & Metadata',
      type: 'seo',
    }),
  ],
});