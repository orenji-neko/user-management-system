import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const schema = z.object({
    email: z.string(),
    password: z.string()
});

function Login() {
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: "",
            password: ""
        },
    });

    const onLogin = async (values: z.infer<typeof schema>) => {
        const response = await fetch("/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        });

        if (!response.ok) {
            toast.error("Failed to log-in!");
            return;
        }

        toast.success("Successfully logged-in!");
        const result = await response.text();
    }

    return (
        <main className="w-screen h-screen bg-blue-500 flex flex-row justify-center items-center">
            <div className="bg-white w-full mx-2 sm:mx-0 sm:w-[380px] h-[360px] p-4 rounded-md shadow-md">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onLogin)} className="flex flex-col h-full justify-center gap-y-4">
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
                                </FormItem>
                            )}
                        />

                        <Button type="submit">Login</Button>
                    </form>
                </Form>
            </div>
        </main>
    );
}

export default Login;