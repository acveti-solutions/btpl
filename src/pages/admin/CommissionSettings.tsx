import { useState } from "react";
import { systemSettings, formatCurrency } from "@/lib/mockData";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus } from "lucide-react";

export default function AdminCommissionSettings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState(systemSettings);

  const updateSlab = (index: number, field: "targetSales" | "commissionPercent", value: number) => {
    const newSlabs = [...settings.commissionSlabs];
    newSlabs[index] = { ...newSlabs[index], [field]: value };
    setSettings({ ...settings, commissionSlabs: newSlabs });
  };

  const addSlab = () => {
    setSettings({
      ...settings,
      commissionSlabs: [...settings.commissionSlabs, { id: String(Date.now()), targetSales: 0, commissionPercent: 0 }],
    });
  };

  const removeSlab = (index: number) => {
    setSettings({
      ...settings,
      commissionSlabs: settings.commissionSlabs.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold">Commission Settings</h1>
        <p className="text-muted-foreground text-sm">Configure registration bonus and performance commission slabs.</p>
      </div>

      <div className="stat-card space-y-4">
        <h3 className="font-semibold">Registration Bonus</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
          <div>
            <Label>Minimum Sales Threshold (₹)</Label>
            <Input
              type="number"
              value={settings.registrationBonusThreshold}
              onChange={(e) => setSettings({ ...settings, registrationBonusThreshold: Number(e.target.value) })}
              className="mt-1"
            />
          </div>
          <div>
            <Label>Bonus Amount (₹)</Label>
            <Input
              type="number"
              value={settings.registrationBonusAmount}
              onChange={(e) => setSettings({ ...settings, registrationBonusAmount: Number(e.target.value) })}
              className="mt-1"
            />
          </div>
        </div>
      </div>

      <div className="stat-card space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Performance Commission Slabs</h3>
          <Button size="sm" variant="outline" onClick={addSlab}>
            <Plus className="w-4 h-4 mr-1" /> Add Slab
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Target Sales (₹)</TableHead>
              <TableHead>Commission %</TableHead>
              <TableHead className="w-16"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {settings.commissionSlabs.map((slab, i) => (
              <TableRow key={slab.id}>
                <TableCell>
                  <Input
                    type="number"
                    value={slab.targetSales}
                    onChange={(e) => updateSlab(i, "targetSales", Number(e.target.value))}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    step="0.25"
                    value={slab.commissionPercent}
                    onChange={(e) => updateSlab(i, "commissionPercent", Number(e.target.value))}
                  />
                </TableCell>
                <TableCell>
                  <Button size="icon" variant="ghost" onClick={() => removeSlab(i)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="stat-card space-y-4">
        <h3 className="font-semibold">Withdrawal Settings</h3>
        <div className="max-w-xs">
          <Label>Minimum Withdrawal Amount (₹)</Label>
          <Input
            type="number"
            value={settings.minimumWithdrawal}
            onChange={(e) => setSettings({ ...settings, minimumWithdrawal: Number(e.target.value) })}
            className="mt-1"
          />
        </div>
      </div>

      <Button onClick={() => toast({ title: "Settings saved", description: "Commission settings have been updated." })}>
        Save All Changes
      </Button>
    </div>
  );
}
