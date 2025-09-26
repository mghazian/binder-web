import z from "zod";

const GroupSpaceSchema = z.looseObject({
  user: z.string("Name must be a string")
         .min(1, "Name cannot be empty"),
  imageFile: z.string().optional()
});

export default GroupSpaceSchema;