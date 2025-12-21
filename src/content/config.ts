import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const serviceInfoSchema = z.object({
  brandName: z.string().min(1).max(100),
  tagline: z.string().min(10).max(200),
  description: z.string().min(20).max(500),
  channelCount: z.number().min(1),
  vodCount: z.number().min(1),
  supportEmail: z.string().email(),
  supportPhone: z.string().optional(),
  primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  secondaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  logoUrl: z.string().url().optional(),
  siteUrl: z.string().url(),
  socialLinks: z.object({
    twitter: z.string().url().optional(),
    facebook: z.string().url().optional(),
    instagram: z.string().url().optional(),
    youtube: z.string().url().optional(),
    linkedin: z.string().url().optional(),
  }).optional(),
  features: z.array(z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string(),
  })).optional(),
});

const serviceInfo = defineCollection({
  loader: file('src/content/service-info/index.json'),
  schema: serviceInfoSchema,
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string(),
  }),
});

const pricing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/pricing' }),
  schema: z.object({
    name: z.string(),
    price: z.number(),
    currency: z.string().default('USD'),
    billingPeriod: z.enum(['monthly', 'quarterly', 'annual']),
    description: z.string(),
    features: z.array(z.string()),
    isFeatured: z.boolean().default(false),
    ctaText: z.string().default('Subscribe Now'),
    ctaLink: z.string().default('/subscribe'),
    order: z.number().default(0),
  }),
});

const faq = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/faq' }),
  schema: z.object({
    question: z.string(),
    category: z.string().optional(),
    order: z.number().optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/testimonials' }),
  schema: z.object({
    name: z.string(),
    location: z.string().optional(),
    rating: z.number().min(1).max(5).default(5),
    avatar: z.string().optional(),
  }),
});

const iptvServices = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/iptv-services' }),
  schema: z.object({
    name: z.string(),
    tagline: z.string().optional(),
    description: z.string(),
    rating: z.number().min(1).max(5).default(4.5),
    reviewCount: z.number().default(100),
    channelCount: z.number().default(500),
    vodCount: z.number().optional(),
    price: z.number().default(9.99),
    affiliateLink: z.string().url().optional(),
    website: z.string().url().optional(),
    featured: z.boolean().default(false),
    pros: z.array(z.string()).optional(),
    cons: z.array(z.string()).optional(),
    faq: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional(),
    supportedDevices: z.array(z.string()).optional(),
    supportedApps: z.array(z.string()).optional(),
    streamingQuality: z.array(z.string()).optional(),
    order: z.number().default(0),
  }),
});

const categories = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/categories' }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    icon: z.string().optional(),
    order: z.number().default(0),
  }),
});

const apps = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/apps' }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    platforms: z.array(z.string()).default([]),
    downloadLinks: z.record(z.string().url()).optional(),
    icon: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

const devices = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/devices' }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    category: z.string(),
    icon: z.string().optional(),
    setupGuide: z.string().optional(),
    order: z.number().default(0),
  }),
});

export const collections = {
  'service-info': serviceInfo,
  'iptv-services': iptvServices,
  categories,
  apps,
  devices,
  pages,
  pricing,
  faq,
  blog,
  testimonials,
};
