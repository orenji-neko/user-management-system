import { z } from "zod";

export default z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at 8 characters long"),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  title: z.string().min(2),
});
