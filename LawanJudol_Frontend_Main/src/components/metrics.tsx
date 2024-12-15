import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, Video, FileText, Users, AlertTriangle } from 'lucide-react'

const metrics = [
  {
    title: "Websites Analyzed",
    value: "10,234",
    icon: Globe,
  },
  {
    title: "Videos Scanned",
    value: "5,678",
    icon: Video,
  },
  {
    title: "Text Content Reviewed",
    value: "25,901",
    icon: FileText,
  },
  {
    title: "Social Media Posts Checked",
    value: "50,432",
    icon: Users,
  },
  {
    title: "Gambling Activities Reported",
    value: "3,217",
    icon: AlertTriangle,
  },
]

export function Metrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      {metrics.map((item) => (
        <Card key={item.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {item.title}
            </CardTitle>
            <item.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

