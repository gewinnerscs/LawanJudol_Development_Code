import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Share2, AlertTriangle, Trophy, Bitcoin, EclipseIcon as Ethereum, Heart } from 'lucide-react'
import Link from "next/link"
import { Leaderboard } from "@/components/leaderboard"
import { Metrics } from "@/components/metrics"
import { CheckWebsiteForm } from "@/components/check-website-form"
import { LawanJudolIcon } from "@/components/lawan-judol-icon"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <LawanJudolIcon className="w-16 h-16" />
            <span className="text-xl font-bold">LawanJudol</span>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              Login
            </Button>
            <Button size="sm" className="bg-green-900 text-white hover:bg-green-800">
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="bg-green-900 text-white py-20 px-4">
          <div className="container mx-auto max-w-3xl text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              Protect Your Loved Ones from the Dangers of Illegal Gambling
            </h1>
            <p className="text-green-100 mb-8">
              You have the power to make a difference. Join our community-driven movement to combat illegal online gambling platforms and create a safer digital environment for everyone.
            </p>
            <CheckWebsiteForm />
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold mb-6">How It Works</h2>
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                      <Search className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Submit suspicious content</h3>
                      <p className="text-muted-foreground">
                        Enter any URL, keyword, or hashtag related to suspected gambling activities
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                      <Share2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Mention us on Twitter</h3>
                      <p className="text-muted-foreground">
                        Tweet anything to report to our bot. Include @LawanJudol and #FightOnlineGambling in your tweet.
                      </p>
                      <div className="mt-2 p-2 bg-slate-100 rounded-md font-mono text-sm">
                        @lawanjudol #FightOnlineGambling
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                      <Trophy className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Earn points and climb the leaderboard</h3>
                      <p className="text-muted-foreground">
                        Get points for each valid report and become a top contributor in our community
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Leaderboard />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-slate-50">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl font-semibold mb-6 text-center">Our Impact</h2>
            <Metrics />
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-xl font-semibold mb-6">Recent Reports</h2>
            <div className="grid gap-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-slate-200" />
                    <div>
                      <div className="font-medium">Anonymous User</div>
                      <div className="text-sm text-muted-foreground mb-2">Reported 2 hours ago</div>
                      <p className="text-sm">
                        Suspicious gambling advertisement found at example{i}.com
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-semibold mb-6">Support Our Mission</h2>
            <p className="text-muted-foreground mb-8">
              Your donations help us maintain and improve our services in the fight against illegal online gambling.
            </p>
            <div className="grid gap-6 md:grid-cols-2 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-center gap-2">
                    <Bitcoin className="w-6 h-6" />
                    Bitcoin
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-mono break-all">
                    1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-center gap-2">
                    <Ethereum className="w-6 h-6" />
                    Ethereum
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-mono break-all">
                    0x742d35Cc6634C0532925a3b844Bc454e4438f44e
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="flex items-center justify-center text-xl font-medium text-red-500">
              <Heart className="w-6 h-6 mr-2 animate-pulse" />
              Thank you for your support!
              <Heart className="w-6 h-6 ml-2 animate-pulse" />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 px-4 bg-slate-100">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p className="mb-2">© 2024 LawanJudol. All rights reserved.</p>
          <p>Together, we can make a difference in combating illegal online gambling.</p>
        </div>
      </footer>
    </div>
  )
}

