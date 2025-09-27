import z from "zod";


export const ChatRequestSchema = z.object({
  id: z.coerce.number().optional(),
  type: z.literal(["after", "before"], "Unknown type").default("before"),
  limit: z.coerce.number().default(10)
});

export const SendChatRequestSchema = z.object({
  message: z.string().min(1, "Message cannot be empty")
});