import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ConfirmationCardProps {
  data: {
    message: string;
    confirmLabel: string;
  };
}

export function ConfirmationCard({ data }: ConfirmationCardProps) {
  return (
    <Card className="w-full max-w-md">
      <CardContent className="pt-6">
        <p className="mb-4">{data.message}</p>
        <Button variant="default">{data.confirmLabel}</Button>
      </CardContent>
    </Card>
  );
}