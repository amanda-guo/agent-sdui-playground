import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StatusCardProps {
  data: {
    service: string;
    status: "healthy" | "degraded" | "down";
    uptime: string;
  };
}

export function StatusCard({ data }: StatusCardProps) {
  const statusColor = {
    healthy: "bg-green-100 text-green-800",
    degraded: "bg-yellow-100 text-yellow-800",
    down: "bg-red-100 text-red-800",
  }[data.status];

  return (
    <Card className="w-[300px] max-w-full gap-0">
      <CardHeader className="pb-2">
        <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-start gap-x-6">
          <CardTitle className="min-w-0 break-words text-lg">{data.service}</CardTitle>
          <Badge className={`shrink-0 ${statusColor}`}>{data.status}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Uptime: <span className="font-medium text-foreground">{data.uptime}</span>
        </p>
      </CardContent>
    </Card>
  );
}