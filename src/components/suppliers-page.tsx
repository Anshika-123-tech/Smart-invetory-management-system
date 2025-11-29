import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Search, Plus, Mail, Phone, MapPin, Send, Star } from 'lucide-react';

const suppliersData = [
  {
    id: 1,
    name: 'Tech Solutions Ltd',
    contact: 'Sarah Johnson',
    email: 'sarah@techsolutions.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    category: 'Electronics',
    rating: 4.8,
    orders: 47,
    lastOrder: '2024-01-15',
    status: 'Active',
    reliability: 98
  },
  {
    id: 2,
    name: 'Office Furniture Co',
    contact: 'Mike Chen',
    email: 'mike@officefurniture.com',
    phone: '+1 (555) 234-5678',
    location: 'Chicago, IL',
    category: 'Furniture',
    rating: 4.6,
    orders: 32,
    lastOrder: '2024-01-12',
    status: 'Active',
    reliability: 95
  },
  {
    id: 3,
    name: 'Paper Works Inc',
    contact: 'Lisa Anderson',
    email: 'lisa@paperworks.com',
    phone: '+1 (555) 345-6789',
    location: 'Portland, OR',
    category: 'Stationery',
    rating: 4.9,
    orders: 68,
    lastOrder: '2024-01-18',
    status: 'Active',
    reliability: 99
  },
  {
    id: 4,
    name: 'Global Supplies',
    contact: 'David Kim',
    email: 'david@globalsupplies.com',
    phone: '+1 (555) 456-7890',
    location: 'Los Angeles, CA',
    category: 'Mixed',
    rating: 4.2,
    orders: 23,
    lastOrder: '2023-12-28',
    status: 'Inactive',
    reliability: 87
  },
  {
    id: 5,
    name: 'Premium Office Solutions',
    contact: 'Emma Wilson',
    email: 'emma@premiumoffice.com',
    phone: '+1 (555) 567-8901',
    location: 'Boston, MA',
    category: 'Office Supplies',
    rating: 4.7,
    orders: 41,
    lastOrder: '2024-01-20',
    status: 'Active',
    reliability: 96
  }
];

const pendingOrders = [
  { supplier: 'Tech Solutions Ltd', product: 'USB-C Cables', quantity: 200, estimatedDelivery: '2024-01-25' },
  { supplier: 'Paper Works Inc', product: 'Printer Paper A4', quantity: 500, estimatedDelivery: '2024-01-22' },
  { supplier: 'Office Furniture Co', product: 'Ergonomic Chairs', quantity: 15, estimatedDelivery: '2024-01-28' },
];

export function SuppliersPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: string) => {
    return status === 'Active' ? 'default' : 'secondary';
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const filteredSuppliers = suppliersData.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold">Supplier Management</h2>
          <p className="text-muted-foreground">Manage your supplier relationships and orders</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Supplier
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-600">{suppliersData.length}</div>
            <p className="text-xs text-muted-foreground">Total Suppliers</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">
              {suppliersData.filter(s => s.status === 'Active').length}
            </div>
            <p className="text-xs text-muted-foreground">Active Suppliers</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-yellow-600">{pendingOrders.length}</div>
            <p className="text-xs text-muted-foreground">Pending Orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-purple-600">4.6</div>
            <p className="text-xs text-muted-foreground">Avg Supplier Rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search suppliers by name, contact, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Suppliers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Supplier Directory</CardTitle>
          <CardDescription>
            {filteredSuppliers.length} suppliers found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Contact Info</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Reliability</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSuppliers.map((supplier) => (
                  <TableRow key={supplier.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>
                            {supplier.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{supplier.name}</div>
                          <div className="text-sm text-muted-foreground">{supplier.contact}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="h-3 w-3 mr-1" />
                          {supplier.email}
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="h-3 w-3 mr-1" />
                          {supplier.phone}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          {supplier.location}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{supplier.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <div className="flex">
                          {getRatingStars(supplier.rating)}
                        </div>
                        <span className="text-sm text-muted-foreground ml-1">
                          {supplier.rating}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{supplier.orders} orders</div>
                        <div className="text-muted-foreground">
                          Last: {new Date(supplier.lastOrder).toLocaleDateString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-12 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${supplier.reliability}%` }}
                          ></div>
                        </div>
                        <span className="text-sm">{supplier.reliability}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(supplier.status)}>
                        {supplier.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          <Send className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pending Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Orders</CardTitle>
          <CardDescription>Orders currently being processed by suppliers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingOrders.map((order, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{order.product}</h4>
                    <Badge variant="outline">Qty: {order.quantity}</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>Supplier: {order.supplier}</p>
                    <p>Estimated Delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    Track
                  </Button>
                  <Button size="sm" variant="outline">
                    <Mail className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Auto-Send Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Automated Ordering</CardTitle>
          <CardDescription>Configure automatic purchase orders based on stock levels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Auto-Order Settings</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Office Supplies</p>
                    <p className="text-sm text-muted-foreground">Paper Works Inc</p>
                  </div>
                  <Badge variant="default">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Electronics</p>
                    <p className="text-sm text-muted-foreground">Tech Solutions Ltd</p>
                  </div>
                  <Badge variant="default">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Furniture</p>
                    <p className="text-sm text-muted-foreground">Office Furniture Co</p>
                  </div>
                  <Badge variant="secondary">Disabled</Badge>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium">Recent Auto-Orders</h4>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="font-medium text-green-800">Order Sent</p>
                  <p className="text-sm text-green-600">200 USB Cables to Tech Solutions</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="font-medium text-blue-800">Order Approved</p>
                  <p className="text-sm text-blue-600">500 Paper A4 to Paper Works</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}