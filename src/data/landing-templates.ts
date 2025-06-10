
import { LandingTemplate } from '@/types/landing-templates';

export const landingTemplates: LandingTemplate[] = [
  {
    id: 'startup-modern',
    name: 'Modern Startup',
    category: 'startup',
    description: 'Clean, modern design perfect for SaaS and tech startups',
    preview: '/api/placeholder/400/300',
    isPremium: false,
    colorSchemes: [
      {
        id: 'blue-gradient',
        name: 'Blue Gradient',
        primary: '#667eea',
        secondary: '#764ba2',
        accent: '#f093fb',
        background: '#ffffff',
        text: '#2d3748'
      },
      {
        id: 'purple-modern',
        name: 'Purple Modern',
        primary: '#8b5cf6',
        secondary: '#a855f7',
        accent: '#ec4899',
        background: '#ffffff',
        text: '#1f2937'
      }
    ],
    sections: [
      {
        id: 'hero',
        type: 'hero',
        name: 'Hero Section',
        required: true,
        content: {
          layout: 'centered',
          hasBackground: true,
          hasAnimation: true
        }
      },
      {
        id: 'features',
        type: 'features',
        name: 'Features Grid',
        required: true,
        content: {
          layout: 'grid',
          columns: 3,
          hasIcons: true
        }
      },
      {
        id: 'pricing',
        type: 'pricing',
        name: 'Pricing Table',
        required: false,
        content: {
          layout: 'cards',
          tiers: 3,
          hasPopular: true
        }
      },
      {
        id: 'testimonials',
        type: 'testimonials',
        name: 'Customer Testimonials',
        required: false,
        content: {
          layout: 'carousel',
          hasPhotos: true,
          hasRatings: true
        }
      },
      {
        id: 'cta',
        type: 'cta',
        name: 'Call to Action',
        required: true,
        content: {
          layout: 'centered',
          style: 'gradient'
        }
      }
    ]
  },
  {
    id: 'ecommerce-pro',
    name: 'E-commerce Pro',
    category: 'ecommerce',
    description: 'Product-focused design with conversion optimization',
    preview: '/api/placeholder/400/300',
    isPremium: true,
    colorSchemes: [
      {
        id: 'orange-warm',
        name: 'Orange Warm',
        primary: '#f97316',
        secondary: '#ea580c',
        accent: '#fbbf24',
        background: '#fefefe',
        text: '#1c1917'
      }
    ],
    sections: [
      {
        id: 'hero',
        type: 'hero',
        name: 'Product Hero',
        required: true,
        content: {
          layout: 'split',
          hasProductImage: true,
          hasVideo: true
        }
      },
      {
        id: 'features',
        type: 'features',
        name: 'Product Benefits',
        required: true,
        content: {
          layout: 'alternating',
          hasImages: true
        }
      },
      {
        id: 'pricing',
        type: 'pricing',
        name: 'Pricing Plans',
        required: true,
        content: {
          layout: 'comparison',
          hasDiscount: true
        }
      }
    ]
  },
  {
    id: 'agency-creative',
    name: 'Creative Agency',
    category: 'agency',
    description: 'Bold, creative design for agencies and portfolios',
    preview: '/api/placeholder/400/300',
    isPremium: false,
    colorSchemes: [
      {
        id: 'dark-modern',
        name: 'Dark Modern',
        primary: '#06b6d4',
        secondary: '#0891b2',
        accent: '#f59e0b',
        background: '#0f172a',
        text: '#f8fafc'
      }
    ],
    sections: [
      {
        id: 'hero',
        type: 'hero',
        name: 'Agency Hero',
        required: true,
        content: {
          layout: 'fullscreen',
          hasVideo: true,
          hasParallax: true
        }
      },
      {
        id: 'features',
        type: 'features',
        name: 'Services',
        required: true,
        content: {
          layout: 'masonry',
          hasHover: true
        }
      }
    ]
  }
];

export const fontOptions = [
  { id: 'inter', name: 'Inter', family: 'Inter, sans-serif' },
  { id: 'poppins', name: 'Poppins', family: 'Poppins, sans-serif' },
  { id: 'space-grotesk', name: 'Space Grotesk', family: 'Space Grotesk, sans-serif' },
  { id: 'playfair', name: 'Playfair Display', family: 'Playfair Display, serif' },
];
