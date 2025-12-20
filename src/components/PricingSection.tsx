import { Check } from 'lucide-react';
import { clsx } from 'clsx';

interface PricingPlan {
  name: string;
  price: number;
  currency: string;
  billingPeriod: 'monthly' | 'quarterly' | 'annual';
  description: string;
  features: string[];
  isFeatured: boolean;
  ctaText: string;
  ctaLink: string;
  slug: string;
}

interface PricingSectionProps {
  plans: PricingPlan[];
  primaryColor?: string;
  showHeader?: boolean;
}

const periodLabels: Record<string, string> = {
  monthly: '/month',
  quarterly: '/3 months',
  annual: '/year',
};

export default function PricingSection({ 
  plans, 
  primaryColor = '#3b82f6',
  showHeader = true 
}: PricingSectionProps) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {showHeader && (
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect plan for your entertainment needs. All plans include our core features.
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.slug || index}
              className={clsx(
                "relative rounded-xl border p-8 transition-all",
                plan.isFeatured 
                  ? "border-2 scale-105 shadow-xl bg-card" 
                  : "border-border bg-card hover:border-primary/50"
              )}
              style={plan.isFeatured ? { borderColor: primaryColor } : undefined}
            >
              {plan.isFeatured && (
                <div 
                  className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-sm font-medium text-white"
                  style={{ backgroundColor: primaryColor }}
                >
                  Most Popular
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold">
                    {plan.currency === 'USD' ? '$' : plan.currency}
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">
                    {periodLabels[plan.billingPeriod]}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="h-5 w-5 shrink-0 mt-0.5" style={{ color: primaryColor }} />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.ctaLink}
                className={clsx(
                  "block w-full rounded-lg py-3 text-center font-medium transition-all",
                  plan.isFeatured 
                    ? "text-white hover:opacity-90" 
                    : "border border-border hover:bg-accent"
                )}
                style={plan.isFeatured ? { backgroundColor: primaryColor } : undefined}
              >
                {plan.ctaText}
              </a>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            All plans include a 7-day money-back guarantee. No questions asked.
          </p>
        </div>
      </div>
    </section>
  );
}
