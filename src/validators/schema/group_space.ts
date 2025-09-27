import z from "zod";

const GroupSpaceSchema = z.looseObject({
  name: z.string("Name must be a string")
         .min(1, "Name cannot be empty"),
  imageFile: z.string().optional()
});

export default GroupSpaceSchema;