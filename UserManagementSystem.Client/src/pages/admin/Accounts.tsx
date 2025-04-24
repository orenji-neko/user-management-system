import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import { Pen, Trash } from "lucide-react";

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

    return (
        <>
            {accounts === null ?
                <div>
                    {/* If data is not yet loaded, show this. */}
                    No accounts yet.
                </div>
                :
                <div className="p-4">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Id</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>First Name</TableHead>
                                <TableHead>Last Name</TableHead>
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
                                            <Button variant="outline"><Pen /></Button>
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