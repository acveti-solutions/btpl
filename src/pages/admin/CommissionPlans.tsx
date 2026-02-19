import { useState } from "react";
import { commissionPlans, type CommissionPlan, formatCurrency } from "@/lib/mockData";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus, Edit2, Copy, Check, X, Star } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

function PlanEditor({ plan, onSave, onCancel }: { plan: CommissionPlan; onSave: (p: CommissionPlan) => void; onCancel: () => void }) {
  const [edited, setEdited] = useState<CommissionPlan>({ ...plan, commissionSlabs: plan.commissionSlabs.map(s => ({ ...s })) });

  const updateSlab = (index: number, field: "targetSales" | "commissionPercent", value: number) => {
    const newSlabs = [...edited.commissionSlabs];
    newSlabs[index] = { ...newSlabs[index], [field]: value };
    setEdited({ ...edited, commissionSlabs: newSlabs });
  };

  const addSlab = () => {
    setEdited({
      ...edited,
      commissionSlabs: [...edited.commissionSlabs, { id: String(Date.now()), targetSales: 0, commissionPercent: 0 }],
    });
  };

  const removeSlab = (index: number) => {
    setEdited({ ...edited, commissionSlabs: edited.commissionSlabs.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label>Plan Name</Label>
          <Input value={edited.name} onChange={(e) => setEdited({ ...edited, name: e.target.value })} className="mt-1" />
        </div>
        <div className="flex items-end gap-4">
          <div className="flex items-center gap-2">
            <Switch checked={edited.isDefault} onCheckedChange={(v) => setEdited({ ...edited, isDefault: v })} />
            <Label>Default (Public) Plan</Label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label>Registration Bonus Threshold (₹)</Label>
          <Input type="number" value={edited.registrationBonusThreshold} onChange={(e) => setEdited({ ...edited, registrationBonusThreshold: Number(e.target.value) })} className="mt-1" />
        </div>
        <div>
          <Label>Registration Bonus Amount (₹)</Label>
          <Input type="number" value={edited.registrationBonusAmount} onChange={(e) => setEdited({ ...edited, registrationBonusAmount: Number(e.target.value) })} className="mt-1" />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label>Performance Commission Slabs</Label>
          <Button size="sm" variant="outline" onClick={addSlab}><Plus className="w-3 h-3 mr-1" /> Add Slab</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Target Sales (₹)</TableHead>
              <TableHead>Commission %</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {edited.commissionSlabs.map((slab, i) => (
              <TableRow key={slab.id}>
                <TableCell><Input type="number" value={slab.targetSales} onChange={(e) => updateSlab(i, "targetSales", Number(e.target.value))} /></TableCell>
                <TableCell><Input type="number" step="0.25" value={slab.commissionPercent} onChange={(e) => updateSlab(i, "commissionPercent", Number(e.target.value))} /></TableCell>
                <TableCell><Button size="icon" variant="ghost" onClick={() => removeSlab(i)}><Trash2 className="w-4 h-4 text-destructive" /></Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex gap-2 justify-end pt-2">
        <Button variant="outline" onClick={onCancel}><X className="w-4 h-4 mr-1" /> Cancel</Button>
        <Button onClick={() => onSave(edited)}><Check className="w-4 h-4 mr-1" /> Save Plan</Button>
      </div>
    </div>
  );
}

export default function AdminCommissionPlans() {
  const { toast } = useToast();
  const [plans, setPlans] = useState<CommissionPlan[]>(commissionPlans);
  const [editingPlan, setEditingPlan] = useState<CommissionPlan | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleSave = (plan: CommissionPlan) => {
    if (plan.isDefault) {
      setPlans(prev => prev.map(p => ({ ...p, isDefault: p.id === plan.id ? true : false })));
    }
    setPlans(prev => {
      const exists = prev.find(p => p.id === plan.id);
      if (exists) return prev.map(p => p.id === plan.id ? plan : (plan.isDefault ? { ...p, isDefault: false } : p));
      return [...prev.map(p => plan.isDefault ? { ...p, isDefault: false } : p), plan];
    });
    setEditingPlan(null);
    setIsCreating(false);
    toast({ title: "Plan saved", description: `"${plan.name}" has been saved.` });
  };

  const handleDelete = (id: string) => {
    const plan = plans.find(p => p.id === id);
    if (plan?.isDefault) {
      toast({ title: "Cannot delete", description: "Cannot delete the default plan.", variant: "destructive" });
      return;
    }
    setPlans(prev => prev.filter(p => p.id !== id));
    toast({ title: "Plan deleted" });
  };

  const handleDuplicate = (plan: CommissionPlan) => {
    const newPlan: CommissionPlan = {
      ...plan,
      id: String(Date.now()),
      name: `${plan.name} (Copy)`,
      isDefault: false,
      commissionSlabs: plan.commissionSlabs.map(s => ({ ...s, id: String(Date.now() + Math.random()) })),
    };
    setPlans(prev => [...prev, newPlan]);
    toast({ title: "Plan duplicated" });
  };

  const startCreate = () => {
    setEditingPlan({
      id: String(Date.now()),
      name: "",
      isDefault: false,
      registrationBonusThreshold: 20000,
      registrationBonusAmount: 500,
      commissionSlabs: [{ id: "1", targetSales: 200000, commissionPercent: 2 }],
    });
    setIsCreating(true);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Commission Plans</h1>
          <p className="text-muted-foreground text-sm">Create and manage multiple commission plans. Assign to affiliates or sellers.</p>
        </div>
        <Button onClick={startCreate}><Plus className="w-4 h-4 mr-1" /> New Plan</Button>
      </div>

      {(editingPlan) && (
        <div className="stat-card">
          <h3 className="font-semibold mb-4">{isCreating ? "Create New Plan" : `Edit: ${editingPlan.name}`}</h3>
          <PlanEditor plan={editingPlan} onSave={handleSave} onCancel={() => { setEditingPlan(null); setIsCreating(false); }} />
        </div>
      )}

      <div className="grid gap-4">
        {plans.map(plan => (
          <div key={plan.id} className="stat-card">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-lg">{plan.name}</h3>
                  {plan.isDefault && <Badge variant="secondary" className="gap-1"><Star className="w-3 h-3" /> Default</Badge>}
                </div>
                <p className="text-muted-foreground text-sm mt-1">
                  Bonus: {formatCurrency(plan.registrationBonusAmount)} after {formatCurrency(plan.registrationBonusThreshold)} sales · {plan.commissionSlabs.length} slab{plan.commissionSlabs.length !== 1 ? "s" : ""}
                </p>
                <div className="flex gap-3 mt-2 flex-wrap">
                  {plan.commissionSlabs.map(s => (
                    <span key={s.id} className="text-xs bg-muted px-2 py-1 rounded">
                      {formatCurrency(s.targetSales)} → {s.commissionPercent}%
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-1">
                <Button size="icon" variant="ghost" onClick={() => handleDuplicate(plan)}><Copy className="w-4 h-4" /></Button>
                <Button size="icon" variant="ghost" onClick={() => { setEditingPlan(plan); setIsCreating(false); }}><Edit2 className="w-4 h-4" /></Button>
                <Button size="icon" variant="ghost" onClick={() => handleDelete(plan.id)} disabled={plan.isDefault}><Trash2 className="w-4 h-4 text-destructive" /></Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
