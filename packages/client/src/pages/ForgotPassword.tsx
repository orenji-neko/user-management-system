import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

function ForgotPassword() {
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || "Failed to send password reset email.");
        return;
      }
      toast.success(data.message);
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="w-screen h-screen bg-blue-500 flex flex-row justify-center items-center">
      <div className="bg-white w-full mx-2 sm:mx-0 sm:w-[380px] h-fit p-4 rounded-md shadow-md">
        <form
          onSubmit={handleSubmit}
          className="h-full w-full flex flex-col gap-y-2"
        >
          <h1 className="text-2xl font-bold text-center my-4">
            Forgot Password?
          </h1>
          <div className="flex flex-col gap-y-2">
            <Label>Email</Label>
            <Input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <Button type="submit">Send Verification Link</Button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;