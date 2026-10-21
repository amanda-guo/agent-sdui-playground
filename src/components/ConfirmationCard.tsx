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
    <Card className="w-[300px] max-w-full gap-0">
      <CardContent className="pt-0">
        <p className="mb-4 text-base">{data.message}</p>
        <Button variant="default">{data.confirmLabel}</Button>
      </CardContent>
    </Card>
  );
}