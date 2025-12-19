import dayjs from 'dayjs';
import { z } from 'zod';

export const EventSchema = z
  .object({
    name: z.string().min(1, 'Event name is required'),
    startTime: z.string().min(1, 'Start Date is required'),
    endTime: z.string().min(1, 'End Date is required'),
    tagId: z.number('Tag is required'),
    parent: z.number(),
  })
  .refine((data) => dayjs(data.startTime).isAfter(dayjs()), {
    message: 'Start date must be in the future',
    path: ['startTime'],
  })
  .refine((data) => dayjs(data.endTime).isAfter(dayjs(data.startTime)), {
    message: 'End date must be after start date',
    path: ['endTime'],
  });

export type EventFormValues = z.infer<typeof EventSchema>;
