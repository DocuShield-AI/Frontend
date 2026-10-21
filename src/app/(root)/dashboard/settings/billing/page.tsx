import { BillingCheckout } from "@/components/dashboard/billing/billing-checkout";
import { demoUser } from "@/features/dashboard/demo-data";
export default function BillingPage() {
  if (demoUser.role !== "admin")
    return (
      <section>
        <h1 className="font-heading text-3xl font-bold">
          Billing is restricted
        </h1>
      </section>
    );
  return <BillingCheckout />;
}
