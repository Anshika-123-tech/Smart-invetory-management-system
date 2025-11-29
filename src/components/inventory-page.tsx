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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Search, Filter, Plus, AlertTriangle } from 'lucide-react';

const inventoryData = [
  {
    id: 1,
    name: 'Office Chair - Ergonomic',
    stock: 45,
    threshold: 20,
    supplier: 'Furniture Co.',
    category: 'Furniture',
    status: 'In Stock'
  },
  {
    id: 2,
    name: 'Printer Paper A4',
    stock: 12,
    threshold: 50,
    supplier: 'Office Supplies Ltd',
    category: 'Stationery',
    status: 'Low Stock'
  },
  {
    id: 3,
    name: 'Wireless Mouse',
    stock: 89,
    threshold: 25,
    supplier: 'Tech Solutions',
    category: 'Electronics',
    status: 'In Stock'
  },
  {
    id: 4,
    name: 'USB-C Cable',
    stock: 156,
    threshold: 30,
    supplier: 'Cable Corp',
    category: 'Electronics',
    status: 'Well Stocked'
  },
  {
    id: 5,
    name: 'Desk Lamp LED',
    stock: 8,
    threshold: 15,
    supplier: 'Lighting Plus',
    category: 'Electronics',
    status: 'Low Stock'
  },
  {
    id: 6,
    name: 'Notebook A5',
    stock: 234,
    threshold: 50,
    supplier: 'Paper Works',
    category: 'Stationery',
    status: 'Well Stocked'
  }
];

export function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const getStatusColor = (status: string, stock: number, threshold: number) => {
    if (stock <= threshold) {
      return 'destructive';
    } else if (stock <= threshold * 1.5) {
      return 'secondary';
    } else {
      return 'default';
    }
  };

  const getStatusText = (stock: number, threshold: number) => {
    if (stock <= threshold) {
      return 'Low Stock';
    } else if (stock <= threshold * 1.5) {
      return 'In Stock';
    } else {
      return 'Well Stocked';
    }
  };

  const filteredData = inventoryData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const itemStatus = getStatusText(item.stock, item.threshold);
    const matchesStatus = filterStatus === 'all' || itemStatus === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold">Inventory Management</h2>
          <p className="text-muted-foreground">Manage your product inventory and stock levels</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products or suppliers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Furniture">Furniture</SelectItem>
                <SelectItem value="Stationery">Stationery</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Well Stocked">Well Stocked</SelectItem>
                <SelectItem value="In Stock">In Stock</SelectItem>
                <SelectItem value="Low Stock">Low Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Product Inventory</CardTitle>
          <CardDescription>
            {filteredData.length} products found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Stock Level</TableHead>
                  <TableHead>Reorder Threshold</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => {
                  const status = getStatusText(item.stock, item.threshold);
                  const statusVariant = getStatusColor(status, item.stock, item.threshold);
                  
                  return (
                    <TableRow 
                      key={item.id}
                      className={item.stock <= item.threshold ? 'bg-red-50 border-red-200' : ''}
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          {item.stock <= item.threshold && (
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                          )}
                          <span>{item.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={item.stock <= item.threshold ? 'text-red-600 font-medium' : ''}>
                          {item.stock}
                        </span>
                      </TableCell>
                      <TableCell>{item.threshold}</TableCell>
                      <TableCell>{item.supplier}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusVariant}>{status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                          <Button size="sm" variant="outline">
                            Reorder
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">
              {filteredData.filter(item => item.stock > item.threshold * 1.5).length}
            </div>
            <p className="text-xs text-muted-foreground">Well Stocked Items</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-600">
              {filteredData.filter(item => item.stock > item.threshold && item.stock <= item.threshold * 1.5).length}
            </div>
            <p className="text-xs text-muted-foreground">In Stock Items</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-red-600">
              {filteredData.filter(item => item.stock <= item.threshold).length}
            </div>
            <p className="text-xs text-muted-foreground">Low Stock Items</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">
              {filteredData.reduce((sum, item) => sum + item.stock, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Total Stock Units</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}