import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function AffiliateProfile() {
  const { toast } = useToast();

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-muted-foreground text-sm">Manage your personal and banking details.</p>
      </div>

      <div className="stat-card space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label>Full Name</Label>
            <Input defaultValue="Rahul Sharma" className="mt-1" />
          </div>
          <div>
            <Label>Email</Label>
            <Input defaultValue="rahul@gmail.com" className="mt-1" />
          </div>
          <div>
            <Label>Phone</Label>
            <Input defaultValue="9876543210" className="mt-1" />
          </div>
          <div>
            <Label>PAN</Label>
            <Input defaultValue="ABCDE1234F" className="mt-1" />
          </div>
        </div>

        <h3 className="font-semibold pt-4 border-t">Bank Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label>Bank Name</Label>
            <Input defaultValue="HDFC Bank" className="mt-1" />
          </div>
          <div>
            <Label>Account Number</Label>
            <Input defaultValue="****4521" className="mt-1" />
          </div>
          <div>
            <Label>IFSC Code</Label>
            <Input defaultValue="HDFC0001234" className="mt-1" />
          </div>
        </div>

        <Button
          onClick={() => toast({ title: "Profile updated", description: "Your details have been saved." })}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}
