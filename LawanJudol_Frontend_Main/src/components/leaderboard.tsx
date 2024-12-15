import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy } from 'lucide-react'

interface Contributor {
  id: number
  name: string
  websitesBlocked: number
}

const topContributors: Contributor[] = [
  { id: 1, name: "JohnDoe", websitesBlocked: 150 },
  { id: 2, name: "AliceSmith", websitesBlocked: 132 },
  { id: 3, name: "BobJohnson", websitesBlocked: 121 },
  { id: 4, name: "EvaWilliams", websitesBlocked: 118 },
  { id: 5, name: "ChrisBrown", websitesBlocked: 105 },
  { id: 6, name: "SarahDavis", websitesBlocked: 98 },
  { id: 7, name: "MikeTaylor", websitesBlocked: 92 },
  { id: 8, name: "EmilyClark", websitesBlocked: 87 },
  { id: 9, name: "DavidWilson", websitesBlocked: 81 },
  { id: 10, name: "OliviaLee", websitesBlocked: 76 },
]

export function Leaderboard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          Top Contributors
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {topContributors.map((contributor, index) => (
            <li key={contributor.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant={index < 3 ? "default" : "secondary"} className="w-6 h-6 rounded-full">
                  {index + 1}
                </Badge>
                <span>{contributor.name}</span>
              </div>
              <span className="text-sm text-muted-foreground">{contributor.websitesBlocked} websites blocked</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

