import { z } from 'zod';

export const EventSchema = z.object({
  name: z.string().min(1, 'Event name is required'),
  startTime: z.string().min(1, 'Start Date is required'),
  endTime: z.string().min(1, 'End Date is required'),
  tagId: z.number('Tag is required'),
  parent: z.number(),
});

export type EventFormValues = z.infer<typeof EventSchema>;
