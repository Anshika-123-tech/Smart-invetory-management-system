import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Download, FileBarChart, Calendar, TrendingUp } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const salesTrendsData = [
  { month: 'Jan', sales: 12400, orders: 145 },
  { month: 'Feb', sales: 13200, orders: 152 },
  { month: 'Mar', sales: 10800, orders: 128 },
  { month: 'Apr', sales: 14600, orders: 168 },
  { month: 'May', sales: 16200, orders: 185 },
  { month: 'Jun', sales: 15800, orders: 179 },
];

const seasonalDemandData = [
  { quarter: 'Q1 2024', office: 8500, furniture: 6200, electronics: 4800 },
  { quarter: 'Q2 2024', office: 9200, furniture: 7100, electronics: 5400 },
  { quarter: 'Q3 2024', office: 7800, furniture: 5900, electronics: 4200 },
  { quarter: 'Q4 2024', office: 11200, furniture: 8800, electronics: 7100 },
];

const topSellingProducts = [
  { name: 'USB-C Cables', value: 25, color: '#0088FE' },
  { name: 'Office Chairs', value: 20, color: '#00C49F' },
  { name: 'Notebooks', value: 18, color: '#FFBB28' },
  { name: 'Desk Lamps', value: 15, color: '#FF8042' },
  { name: 'Printer Paper', value: 12, color: '#8884D8' },
  { name: 'Others', value: 10, color: '#82CA9D' },
];

const reportTypes = [
  { id: 'inventory', name: 'Inventory Report', description: 'Current stock levels and valuations' },
  { id: 'sales', name: 'Sales Analytics', description: 'Sales performance and trends' },
  { id: 'supplier', name: 'Supplier Performance', description: 'Supplier delivery and quality metrics' },
  { id: 'forecast', name: 'Demand Forecast', description: 'AI-generated demand predictions' },
  { id: 'financial', name: 'Financial Summary', description: 'Cost analysis and profit margins' },
];

export function ReportsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold">Reports & Analytics</h2>
          <p className="text-muted-foreground">Comprehensive insights into your inventory performance</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <div className="text-2xl font-bold">$89,400</div>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12.5% from last month
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div>
              <p className="text-sm text-muted-foreground">Total Orders</p>
              <div className="text-2xl font-bold">1,057</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8.2% from last month
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div>
              <p className="text-sm text-muted-foreground">Avg Order Value</p>
              <div className="text-2xl font-bold">$84.62</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +3.8% from last month
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div>
              <p className="text-sm text-muted-foreground">Inventory Turnover</p>
              <div className="text-2xl font-bold">4.2x</div>
              <p className="text-xs text-blue-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                Optimal range
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Trends</CardTitle>
            <CardDescription>Monthly sales performance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesTrendsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value, name) => [
                  name === 'sales' ? `$${value.toLocaleString()}` : value,
                  name === 'sales' ? 'Sales Revenue' : 'Number of Orders'
                ]} />
                <Bar dataKey="sales" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Selling Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
            <CardDescription>Product performance by sales volume</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={topSellingProducts}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {topSellingProducts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Seasonal Demand */}
      <Card>
        <CardHeader>
          <CardTitle>Seasonal Demand Patterns</CardTitle>
          <CardDescription>Demand trends across different product categories</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={seasonalDemandData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="quarter" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="office" stroke="#8b5cf6" strokeWidth={2} name="Office Supplies" />
              <Line type="monotone" dataKey="furniture" stroke="#10b981" strokeWidth={2} name="Furniture" />
              <Line type="monotone" dataKey="electronics" stroke="#f59e0b" strokeWidth={2} name="Electronics" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Export Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Export Reports</CardTitle>
          <CardDescription>Download detailed reports in various formats</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reportTypes.map((report) => (
              <div key={report.id} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center space-x-2">
                  <FileBarChart className="h-5 w-5 text-blue-600" />
                  <h4 className="font-medium">{report.name}</h4>
                </div>
                <p className="text-sm text-muted-foreground">{report.description}</p>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Download className="h-3 w-3 mr-1" />
                    CSV
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-3 w-3 mr-1" />
                    PDF
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Report Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Custom Report Builder</CardTitle>
          <CardDescription>Create customized reports with specific filters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Report Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inventory">Inventory Analysis</SelectItem>
                <SelectItem value="sales">Sales Performance</SelectItem>
                <SelectItem value="supplier">Supplier Metrics</SelectItem>
                <SelectItem value="financial">Financial Summary</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Last Week</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="quarter">Last Quarter</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="furniture">Furniture</SelectItem>
                <SelectItem value="stationery">Stationery</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-green-600 hover:bg-green-700">
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}