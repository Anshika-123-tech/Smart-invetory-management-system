import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Brain, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const demandForecastData = [
  { week: 'Week 1', predicted: 120, actual: 115, confidence: 95 },
  { week: 'Week 2', predicted: 135, actual: 142, confidence: 92 },
  { week: 'Week 3', predicted: 148, actual: 138, confidence: 88 },
  { week: 'Week 4', predicted: 155, actual: null, confidence: 85 },
  { week: 'Week 5', predicted: 162, actual: null, confidence: 82 },
  { week: 'Week 6', predicted: 171, actual: null, confidence: 78 },
  { week: 'Week 7', predicted: 178, actual: null, confidence: 75 },
  { week: 'Week 8', predicted: 185, actual: null, confidence: 72 },
];

const productForecast = [
  { product: 'Office Chairs', currentStock: 45, suggestedReorder: 30, confidence: 92, priority: 'Medium' },
  { product: 'Printer Paper', currentStock: 12, suggestedReorder: 200, confidence: 98, priority: 'High' },
  { product: 'USB Cables', currentStock: 156, suggestedReorder: 50, confidence: 85, priority: 'Low' },
  { product: 'Desk Lamps', currentStock: 8, suggestedReorder: 25, confidence: 94, priority: 'High' },
  { product: 'Notebooks', currentStock: 234, suggestedReorder: 100, confidence: 78, priority: 'Low' },
];

const aiInsights = [
  {
    type: 'trend',
    title: 'Seasonal Demand Increase',
    description: 'Office furniture demand typically increases by 25% in Q4',
    confidence: 89,
    impact: 'High'
  },
  {
    type: 'alert',
    title: 'Supply Chain Risk',
    description: 'Printer paper supplier may have delays next month',
    confidence: 76,
    impact: 'Medium'
  },
  {
    type: 'opportunity',
    title: 'Cost Optimization',
    description: 'Bulk ordering USB cables could save 15% on costs',
    confidence: 92,
    impact: 'Medium'
  }
];

export function PredictionsPage() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'destructive';
      case 'Medium': return 'secondary';
      case 'Low': return 'default';
      default: return 'default';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'trend': return TrendingUp;
      case 'alert': return AlertCircle;
      case 'opportunity': return CheckCircle;
      default: return Brain;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-purple-100 rounded-lg">
          <Brain className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">AI Demand Prediction</h2>
          <p className="text-muted-foreground">AI-powered inventory forecasting and recommendations</p>
        </div>
      </div>

      {/* Demand Forecast Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Demand Forecast - Next 8 Weeks</CardTitle>
          <CardDescription>Predicted vs actual demand with confidence intervals</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={demandForecastData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  `${value} units`,
                  name === 'predicted' ? 'Predicted Demand' : 'Actual Demand'
                ]}
              />
              <Line 
                type="monotone" 
                dataKey="predicted" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: '#8b5cf6' }}
                name="predicted"
              />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#059669" 
                strokeWidth={2}
                dot={{ fill: '#059669' }}
                name="actual"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Reorder Suggestions */}
        <Card>
          <CardHeader>
            <CardTitle>Suggested Reorder Quantities</CardTitle>
            <CardDescription>AI recommendations based on demand patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {productForecast.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{item.product}</h4>
                      <Badge variant={getPriorityColor(item.priority)}>
                        {item.priority} Priority
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Current Stock: {item.currentStock} units</p>
                      <p>Suggested Reorder: <span className="font-medium text-blue-600">{item.suggestedReorder} units</span></p>
                      <p>Confidence: {item.confidence}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card>
          <CardHeader>
            <CardTitle>AI Insights</CardTitle>
            <CardDescription>Smart recommendations and alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiInsights.map((insight, index) => {
                const Icon = getInsightIcon(insight.type);
                return (
                  <div key={index} className="flex items-start space-x-3 p-4 border rounded-lg">
                    <div className={`p-2 rounded-lg ${
                      insight.type === 'trend' ? 'bg-blue-100' :
                      insight.type === 'alert' ? 'bg-red-100' : 'bg-green-100'
                    }`}>
                      <Icon className={`h-4 w-4 ${
                        insight.type === 'trend' ? 'text-blue-600' :
                        insight.type === 'alert' ? 'text-red-600' : 'text-green-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium">{insight.title}</h4>
                        <Badge variant="outline">{insight.impact} Impact</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                      <p className="text-xs text-muted-foreground">
                        Confidence: {insight.confidence}%
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Manager Approval Section */}
      <Card>
        <CardHeader>
          <CardTitle>Manager Approval Required</CardTitle>
          <CardDescription>Review and approve AI-generated reorder recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {productForecast.filter(item => item.priority === 'High').map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{item.product}</h4>
                  <p className="text-sm text-muted-foreground">
                    Reorder {item.suggestedReorder} units (Confidence: {item.confidence}%)
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Override
                  </Button>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Approve
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Model Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Prediction Model Performance</CardTitle>
          <CardDescription>Historical accuracy of AI predictions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">87%</div>
              <p className="text-sm text-muted-foreground">Overall Accuracy</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">92%</div>
              <p className="text-sm text-muted-foreground">Trend Detection</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">15%</div>
              <p className="text-sm text-muted-foreground">Cost Reduction</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}