import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
        }

        const result = (await response.json()) as Account[];
        setAccounts(result);
    }

    useEffect(() => {
        fetchAccounts();
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
                                    <TableRow>
                                        <TableCell>{account.id}</TableCell>
                                        <TableCell>{account.email}</TableCell>
                                        <TableCell>{account.title}</TableCell>
                                        <TableCell>{account.firstName}</TableCell>
                                        <TableCell>{account.lastName}</TableCell>
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