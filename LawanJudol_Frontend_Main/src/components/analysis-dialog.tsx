"use client"

import { useState } from 'react'
import { AlertTriangle, Check, ExternalLink } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface AnalysisDialogProps {
  url: string;
  onClose: () => void;
  analysisData?: {
    url: string;
    gcs_image_path: string;
    website_category: string;
    confidence_level: string;
    analysis: string;
  };
}

export function AnalysisDialog({ url, onClose, analysisData }: AnalysisDialogProps) {
  const [isReported, setIsReported] = useState(false)

  const handleReport = () => {
    setIsReported(true)
    setTimeout(onClose, 3000)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {isReported ? 'Website Reported' : 'Analysis Results'}
          </DialogTitle>
        </DialogHeader>
        
        {!isReported ? (
          <div className="flex gap-6">
            {/* Left side - Analysis content */}
            <div className="flex-1 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Website Category:</div>
                  <Badge variant="destructive" className="rounded-md">
                    {analysisData?.website_category}
                  </Badge>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Confidence Level:</div>
                  <Badge 
                    variant={analysisData?.confidence_level === 'High' ? 'destructive' : 'secondary'} 
                    className="rounded-md"
                  >
                    {analysisData?.confidence_level}
                  </Badge>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Analysis Details</h3>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex gap-2 items-start">
                      <AlertTriangle className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {analysisData?.analysis}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Button 
                className="w-full bg-red-500 hover:bg-red-600" 
                size="lg"
                onClick={handleReport}
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Report this website
              </Button>
            </div>

            {/* Right side - Screenshot */}
            {analysisData?.gcs_image_path && (
              <div className="w-1/2 flex flex-col">
                <h3 className="text-lg font-semibold mb-4">Website Screenshot</h3>
                <div className="h-[300px] overflow-y-auto border rounded-lg">
                  <img 
                    src={analysisData.gcs_image_path} 
                    alt="Website Screenshot"
                    className="w-full"
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-lg text-center">
              Thank you for your report. We've successfully logged the following information:
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                Website URL: {url}
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                Category: {analysisData?.website_category}
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                Confidence Level: {analysisData?.confidence_level}
              </li>
            </ul>
            <p className="text-center text-muted-foreground">
              This dialog will close automatically in a few seconds.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

