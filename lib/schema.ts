import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from "@vercel/postgres";
import {
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

// Use this object to send drizzle queries to your DB
export const db = drizzle(sql);
// Create a pgTable that maps to a table in your DB
export const users = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    password: text('password').notNull(),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
  },
  (users) => {
    return {
      uniqueIdx: uniqueIndex('unique_idx').on(users.email),
    };
  },
);


export const cms = pgTable(
  'cms',
  {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    content: text('content').notNull(),
    position: serial('position').notNull(),
    linkPosition: text('linkPosition').notNull(),
    heroImage: text('heroImage').notNull(),
    slug: text('slug').notNull(),
    
  },
  (cms) => {
    return {
      uniqueIdx: uniqueIndex('cms_unique_title_idx').on(cms.title),
    };
  },
);



export const features = pgTable(
  'features',
  {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
   
    image: text('heroImage').notNull(),
   
    
  },
  (features) => {
    return {
      uniqueIdx: uniqueIndex('features_unique_idx').on(features.id),
    };
  },
);


export const games = pgTable(
  'games',
  {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
   
    image: text('image').notNull(),
   
    
  },
  (games) => {
    return {
      uniqueIdx: uniqueIndex('games_unique_idx').on(games.id),
    };
  },
);

export const ourservices = pgTable(
  'ourservices',
  {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    content: text('content').notNull(),
   
    image: text('image').notNull(),
   
    
  },
  (ourservices) => {
    return {
      uniqueIdx: uniqueIndex('ourservices_unique_idx').on(ourservices.id),
    };
  },
);

export const partners = pgTable(
  'partners',
  {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
   
    image: text('image').notNull(),
   
    
  },
  (partners) => {
    return {
      uniqueIdx: uniqueIndex('partners_unique_idx').on(partners.id),
    };
  },
);


export const testimonials = pgTable(
  'testimonials',
  {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
   
    image: text('image').notNull(),
    testimonial: text('testimonial').notNull(),
   
    
  },
  (testimonials) => {
    return {
      uniqueIdx: uniqueIndex('testimonials_unique_idx').on(testimonials.id),
    };
  },
);

export const services = pgTable(
  'services',
  {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    image: text('image').notNull(),
    content: text('content').notNull(),
  },
  (services) => {
    return {
      uniqueIdx: uniqueIndex('services_unique_idx').on(services.id),
    };
  }
);

export const getExampleTable = async () => {
  const selectResult = await db.select().from(users);
  console.log('Results', selectResult);
};