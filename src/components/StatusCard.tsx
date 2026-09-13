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
    <Card className="w-full max-w-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{data.service}</CardTitle>
          <Badge className={statusColor}>{data.status}</Badge>
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