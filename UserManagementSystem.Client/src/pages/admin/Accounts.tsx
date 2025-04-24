import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import { Plus, Pen, Trash } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "../../components/ui/input";

interface Account {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    title: string;
}

export default function Accounts() {
    const [accounts, setAccounts] = useState<Account[] | null>();

    const fetchAccounts = async () => {
        const response = await fetch("/accounts");

        if (!response.ok) {
            setAccounts(null);
            toast.error("Failed to fetch accounts!");
            return;
        }

        const result = (await response.json()) as Account[];
        setAccounts(result);
    }

    const deleteAccount = async (id: string) => {
        const response = await fetch(`/accounts/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            toast.error("Failed to delete account!");
            return;
        }

        toast.success("Successfully deleted account");
        fetchAccounts();
    }

    useEffect(() => {
        const id = setTimeout(fetchAccounts, 1000);

        return () => {
            clearTimeout(id);
        }
    }, []);

    const CreateAccountModal = () => {
        const createSchema = z.object({
            email: z.string(),
            password: z.string(),
            confirmPassword: z.string(),
            title: z.string(),
            firstName: z.string(),
            lastName: z.string()
        })

        const createForm = useForm<z.infer<typeof createSchema>>({
            resolver: zodResolver(createSchema),
            defaultValues: {
                email: "",
                password: "",
                confirmPassword: "",
                title: "",
                firstName: "",
                lastName: "",
            }
        });
        const createAccount = async (values: z.infer<typeof createSchema>) => {
            const response = await fetch(`/accounts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            });

            if (!response.ok) {
                const result = await response.json();

                toast.error("Failed to create account!");
                console.log(result);
                return;
            }

            toast.success("Successfully created!");
        }

        return (
            <Dialog>
                <DialogTrigger className="w-fit">
                    <Plus />
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create Account</DialogTitle>
                    </DialogHeader>
                    <Form {...createForm}>
                        <form onSubmit={createForm.handleSubmit(createAccount)} className="flex flex-col gap-2">
                            <FormField
                                control={createForm.control}
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
                                control={createForm.control}
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
                                control={createForm.control}
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
                                control={createForm.control}
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
                                control={createForm.control}
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
                                control={createForm.control}
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
                            <Button type="submit">Create User</Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        )
    };

    const EditAccountModal = ({ account }: { account: Account }) => {
        const editSchema = z.object({
            email: z.string(),
            firstName: z.string(),
            lastName: z.string(),
            title: z.string(),
        });

        const editForm = useForm<z.infer<typeof editSchema>>({
            resolver: zodResolver(editSchema),
            defaultValues: {
                email: account.email,
                title: account.title,
                firstName: account.firstName,
                lastName: account.lastName,
            }
        });
        const editAccount = async (values: z.infer<typeof editSchema>) => {
            const response = await fetch(`/accounts/${account.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            });

            if (!response.ok) {
                toast.error("Failed to edit!");
                return;
            }

            toast.success("Successfully edited!");
        }

        return (
            <Dialog>
                <DialogTrigger className="w-fit">
                    <Pen />
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Account</DialogTitle>
                    </DialogHeader>
                    <Form {...editForm}>
                        <form onSubmit={editForm.handleSubmit(editAccount)} className="flex flex-col gap-2">
                            <FormField
                                control={editForm.control}
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
                                control={editForm.control}
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
                                control={editForm.control}
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
                                control={editForm.control}
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
                            <Button type="submit">Edit User</Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        )
    };

    return (
        <>
            {accounts === null ?
                <div>
                    {/* If data is not yet loaded, show this. */}
                    No accounts yet.
                </div>
                :
                <div className="p-4">
                    <div>
                        <CreateAccountModal />
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Id</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>First Name</TableHead>
                                <TableHead>Last Name</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                accounts?.map((account) => (
                                    <TableRow key={account.id}>
                                        <TableCell>{account.id}</TableCell>
                                        <TableCell>{account.email}</TableCell>
                                        <TableCell>{account.title}</TableCell>
                                        <TableCell>{account.firstName}</TableCell>
                                        <TableCell>{account.lastName}</TableCell>
                                        <TableCell className="flex flex-row gap-2">
                                            <Button variant="outline"><EditAccountModal account={account} /></Button>
                                            <Button variant="destructive" onClick={() => deleteAccount(account.id)}><Trash /></Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </div>
            }
        </>
    );
}