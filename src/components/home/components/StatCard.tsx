import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  icon: LucideIcon
  label: string
  value: string | number
  subtext?: string
}

export function StatCard({ icon: Icon, label, value, subtext }: StatCardProps) {
  return (
    <Card>
      <CardContent className="py-4 px-4">
        <div className="flex items-center space-x-2">
          <Icon className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
        </div>
        <p className="text-md font-bold text-foreground mt-2">{value}</p>
        {subtext && <p className="text-sm text-muted-foreground">{subtext}</p>}
      </CardContent>
    </Card>
  )
}
