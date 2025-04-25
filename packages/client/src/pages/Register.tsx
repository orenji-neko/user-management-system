import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";

const schema = z
  .object({
    email: z.string().email("This is not a valid email"),
    password: z.string().min(8, "Password must at least be 8 characters"),
    confirmPassword: z.string(),
    firstName: z.string().nonempty("First Name is required"),
    lastName: z.string().nonempty("Last Name is required"),
    title: z.string().nonempty("Title is required"),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords don't match",
        path: ["confirmPassword"],
      });
    }
  });

function Register() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      title: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const onRegister = async (values: z.infer<typeof schema>) => {
    try {
      setLoading(true);

      // Register the user
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        toast.error("Failed to register!");
        setLoading(false);
        return;
      }

      toast.success("Successfully registered!");

      // Send the verification email by calling the corresponding endpoint with the user's email
      const verifyResponse = await fetch(
        `/api/verify-email/send?email=${encodeURIComponent(values.email)}`,
        { method: "GET" }
      );

      if (!verifyResponse.ok) {
        toast.error("Verification email failed to send.");
        setLoading(false);
        return;
      }

      toast.success("Verification email sent. Please check your inbox!");

      // Redirect back to home after a brief delay
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Failed to register!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-screen h-screen bg-blue-500 flex flex-row justify-center items-center">
      <div className="bg-white w-full mx-2 sm:mx-0 sm:w-[380px] h-fit p-4 rounded-md shadow-md">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onRegister)}
            className="flex flex-col h-full justify-center gap-y-4"
          >
            <h1 className="text-3xl font-bold text-center">Register</h1>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Confirm Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}

export default Register;