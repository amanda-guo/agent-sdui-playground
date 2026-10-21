import { Card, CardContent } from "@/components/ui/card";

interface TextCardProps {
  data: { content: string };
}

export function TextCard({ data }: TextCardProps) {
  return (
    <Card className="w-[300px] max-w-full gap-0">
      <CardContent className="pt-0">
        <p className="text-base text-muted-foreground">{data.content}</p>
      </CardContent>
    </Card>
  );
}