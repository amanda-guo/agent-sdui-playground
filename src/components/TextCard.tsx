import { Card, CardContent } from "@/components/ui/card";

interface TextCardProps {
  data: { content: string };
}

export function TextCard({ data }: TextCardProps) {
  return (
    <Card className="w-full max-w-md">
      <CardContent className="pt-6">
        <p className="text-muted-foreground">{data.content}</p>
      </CardContent>
    </Card>
  );
}