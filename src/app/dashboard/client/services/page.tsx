import { ServiceCard } from "@/components/service-card";

export default function ServicesPage() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <ServiceCard name="Google Business" connected />
      <ServiceCard name="Facebook Pages" />
    </div>
  );
}
