import { pgTable, serial, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const AIoutput = pgTable('aiResponse', {
    id: serial('id').primaryKey(),
    formData: varchar('formData', { length: 255 }).notNull(),
    aiResponse: text('aiResponse').notNull(),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
    templateSlug: varchar('templateSlug', { length: 255 }).notNull(),
    createdBy: varchar('email', { length: 255 }).notNull(),
});