import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Package, AlertTriangle, ShoppingCart, Plus } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const stockData = [
  { month: 'Jan', level: 850 },
  { month: 'Feb', level: 720 },
  { month: 'Mar', level: 890 },
  { month: 'Apr', level: 650 },
  { month: 'May', level: 780 },
  { month: 'Jun', level: 920 },
];

const statsCards = [
  {
    title: 'Total Stock',
    value: '2,847',
    icon: Package,
    description: 'Items in inventory',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    title: 'Low Stock Alerts',
    value: '23',
    icon: AlertTriangle,
    description: 'Items need reordering',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
  },
  {
    title: 'Pending Orders',
    value: '67',
    icon: ShoppingCart,
    description: 'Orders awaiting fulfillment',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
  },
];

const recentActivity = [
  { action: 'Stock added', item: 'Office Chairs', quantity: 50, time: '2 hours ago' },
  { action: 'Low stock alert', item: 'Printer Paper', quantity: 15, time: '4 hours ago', alert: true },
  { action: 'Order completed', item: 'USB Cables', quantity: 200, time: '6 hours ago' },
  { action: 'New supplier added', item: 'Tech Solutions Ltd', quantity: null, time: '1 day ago' },
];

export function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stock Level Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Real-time Stock Levels</CardTitle>
            <CardDescription>Monthly stock level trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stockData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="level" 
                  stroke="#2563eb" 
                  strokeWidth={2}
                  dot={{ fill: '#2563eb' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest inventory updates</CardDescription>
            </div>
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Stock
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium">{activity.action}</p>
                      {activity.alert && (
                        <Badge variant="destructive" className="text-xs">Alert</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity.item}
                      {activity.quantity && ` • Qty: ${activity.quantity}`}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common inventory management tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-20 flex-col space-y-2 bg-blue-600 hover:bg-blue-700">
              <Package className="h-5 w-5" />
              <span>Add Product</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <ShoppingCart className="h-5 w-5" />
              <span>Create Order</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <AlertTriangle className="h-5 w-5" />
              <span>View Alerts</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Plus className="h-5 w-5" />
              <span>Add Supplier</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}