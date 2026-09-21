import { defineType, defineField } from 'sanity';

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Global Data',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      initialValue: 'My Travel Weather Blog',
    }),
    // seo elemnents
    defineField({
      name: 'title',
      title: 'Global Site Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'favicon',
      title: 'Tab Icon (Favicon)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'siteLogo',
      title: 'site logo',
      type: 'image',
      options: { hotspot: true },
    }),
     defineField({
      name: 'footerParagraph',
      title: 'footer Paragraph',
      type: 'string',
     
    }),
    // Embed the SEO object here for global defaults/fallback values
    defineField({
      name: 'seo',
      title: 'Default SEO Settings',
      type: 'seo', 
    }),
    // ----------------------------------------------------
    // Default Global Hotel Affiliate Block
    // ----------------------------------------------------
    defineField({
      name: 'defaultHotelAffiliate',
      title: 'Default Hotel Affiliate Settings',
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

    // ----------------------------------------------------
    // Default Global Flight Affiliate Block
    // ----------------------------------------------------
    defineField({
      name: 'defaultFlightAffiliate',
      title: 'Default Flight Affiliate Settings',
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
    // ----------------------------------------------------
    // Centralized Tag-Based Affiliate Map
    // ----------------------------------------------------
    defineField({
      name: 'tagAffiliates',
      title: 'Tag-Based Affiliate Links',
      description: 'Map simple text tags to specific affiliate links globally across the site.',
      type: 'array',
      of: [
        defineField({
          name: 'tagMapping',
          title: 'Tag Mapping',
          type: 'object',
          fields: [
            defineField({
              name: 'tagName',
              title: 'Tag Name',
             type: 'reference', // <--- Set type to reference
            to: [{ type: 'tag' }], // <--- Points to your 'tag' document type
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'affiliateLink',
              title: 'Affiliate URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'affiliateText',
              title: 'Button/Callout Text',
              type: 'string',
              description: 'e.g., Shop top-rated hiking gear',
            }),
            defineField({
              name: 'description',
              title: 'Promo Description / Tip',
              type: 'text',
              description: 'e.g., Make sure you have proper trail footwear before heading out.',
            }),
          ],
        }),
      ],
    }),
  ],
});