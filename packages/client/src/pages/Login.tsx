import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";

const schema = z.object({
  email: z.string().email("This is not a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onLogin = async (values: z.infer<typeof schema>) => {
    try {
      const user = await login(values.email, values.password);
      toast.success("Successfully logged-in!");
      
      if (user?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (err) {
      toast.error("Failed to login!");
    }
  };

  return (
    <main className="w-screen h-screen bg-blue-500 flex flex-row justify-center items-center">
      <div className="bg-white w-full mx-2 sm:mx-0 sm:w-[380px] h-fit p-4 rounded-md shadow-md">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onLogin)}
            className="flex flex-col h-full justify-center gap-y-4"
          >
            <h1 className="text-3xl font-bold text-center">Login</h1>
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

            <Button type="submit">Login</Button>
            <p className="text-center">or</p>
            <Link to="/register" className="w-full">
              <Button type="button" variant="secondary" className="w-full">
                Register
              </Button>
            </Link>
          </form>
        </Form>
      </div>
    </main>
  );
}

export default Login;
