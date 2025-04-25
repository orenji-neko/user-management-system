  import { useParams, useSearchParams } from "react-router";
  import { z } from "zod";
  import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
  } from "@/components/ui/form";
  import { useForm } from "react-hook-form";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import { toast } from "sonner";

  const schema = z
    .object({
      password: z.string().min(8, "Password must at least be 8 characters"),
      confirmPassword: z.string(),
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

  export default function ResetPassword() {
    const [searchParams, setSearchParams] = useSearchParams();
    const token = searchParams.get("token");
    const form = useForm({
      resolver: zodResolver(schema),
    });

    const onChangePass = async (values: z.infer<typeof schema>) => {
      const response = await fetch("/api/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          password: values.password
        }),
      });

      if (!response.ok) {
        toast.error("Failed to change password.");
        return;
      }

      toast.success("Successfully changed password.");
      const result = await response.json();
    };

    return (
      <div className="w-screen h-screen bg-blue-500 flex flex-row justify-center items-center">
        <div className="bg-white w-full mx-2 sm:mx-0 sm:w-[380px] h-fit p-4 rounded-md shadow-md">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onChangePass)}
              className="flex flex-col h-full justify-center gap-y-4"
            >
              <h1 className="text-3xl font-bold text-center">Change Password</h1>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
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
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </div>
    );
  }
