import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

// This would typically come from your backend
const recentSubmissions = [
  { id: 1, url: 'https://example1.com', description: 'Suspicious gambling ads' },
  { id: 2, url: 'https://example2.com', description: 'Unregulated betting platform' },
  { id: 3, url: 'https://example3.com', description: 'Potential scam gambling site' },
]

export default function RecentSubmissions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Submissions</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {recentSubmissions.map((submission) => (
            <li key={submission.id} className="border-b pb-2">
              <a href={submission.url} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                {submission.url}
              </a>
              <p className="text-sm text-gray-600">{submission.description}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

