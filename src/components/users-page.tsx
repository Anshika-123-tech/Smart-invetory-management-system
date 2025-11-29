import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Avatar, AvatarFallback } from './ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Search, Plus, Shield, Eye, Edit, Trash2, UserCheck } from 'lucide-react';

const usersData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'Admin',
    department: 'IT',
    status: 'Active',
    lastLogin: '2024-01-20 14:30',
    permissions: {
      viewInventory: true,
      editInventory: true,
      manageSuppliers: true,
      viewReports: true,
      manageUsers: true,
      systemSettings: true
    }
  },
  {
    id: 2,
    name: 'Sarah Wilson',
    email: 'sarah.wilson@company.com',
    role: 'Manager',
    department: 'Procurement',
    status: 'Active',
    lastLogin: '2024-01-20 09:15',
    permissions: {
      viewInventory: true,
      editInventory: true,
      manageSuppliers: true,
      viewReports: true,
      manageUsers: false,
      systemSettings: false
    }
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike.johnson@company.com',
    role: 'Staff',
    department: 'Warehouse',
    status: 'Active',
    lastLogin: '2024-01-19 16:45',
    permissions: {
      viewInventory: true,
      editInventory: true,
      manageSuppliers: false,
      viewReports: false,
      manageUsers: false,
      systemSettings: false
    }
  },
  {
    id: 4,
    name: 'Lisa Chen',
    email: 'lisa.chen@company.com',
    role: 'Manager',
    department: 'Finance',
    status: 'Active',
    lastLogin: '2024-01-20 11:22',
    permissions: {
      viewInventory: true,
      editInventory: false,
      manageSuppliers: false,
      viewReports: true,
      manageUsers: false,
      systemSettings: false
    }
  },
  {
    id: 5,
    name: 'David Smith',
    email: 'david.smith@company.com',
    role: 'Staff',
    department: 'Warehouse',
    status: 'Inactive',
    lastLogin: '2024-01-15 13:10',
    permissions: {
      viewInventory: true,
      editInventory: false,
      manageSuppliers: false,
      viewReports: false,
      manageUsers: false,
      systemSettings: false
    }
  }
];

const rolePermissions = {
  Admin: {
    description: 'Full system access with user and system management capabilities',
    color: 'bg-red-100 text-red-800',
    permissions: [
      'View and edit all inventory',
      'Manage suppliers and orders',
      'Access all reports and analytics',
      'Manage user accounts and permissions',
      'Configure system settings',
      'AI prediction overrides'
    ]
  },
  Manager: {
    description: 'Advanced access with inventory and supplier management',
    color: 'bg-blue-100 text-blue-800',
    permissions: [
      'View and edit inventory',
      'Manage suppliers and orders',
      'Access reports and analytics',
      'Approve AI predictions',
      'Limited user management'
    ]
  },
  Staff: {
    description: 'Basic access for daily inventory operations',
    color: 'bg-green-100 text-green-800',
    permissions: [
      'View inventory',
      'Add/update stock levels',
      'Create basic reports',
      'View low stock alerts'
    ]
  }
};

export function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [selectedUser, setSelectedUser] = useState<typeof usersData[0] | null>(null);
  const [showPermissions, setShowPermissions] = useState(false);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin': return 'destructive';
      case 'Manager': return 'default';
      case 'Staff': return 'secondary';
      default: return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'Active' ? 'default' : 'secondary';
  };

  const filteredUsers = usersData.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold">User Role Management</h2>
          <p className="text-muted-foreground">Manage user accounts and permissions</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-600">{usersData.length}</div>
            <p className="text-xs text-muted-foreground">Total Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">
              {usersData.filter(u => u.status === 'Active').length}
            </div>
            <p className="text-xs text-muted-foreground">Active Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-red-600">
              {usersData.filter(u => u.role === 'Admin').length}
            </div>
            <p className="text-xs text-muted-foreground">Administrators</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-yellow-600">
              {usersData.filter(u => u.role === 'Manager').length}
            </div>
            <p className="text-xs text-muted-foreground">Managers</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users by name, email, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="Staff">Staff</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Users Table */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>User Directory</CardTitle>
              <CardDescription>
                {filteredUsers.length} users found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarFallback>
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-muted-foreground">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getRoleColor(user.role)}>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.department}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(user.lastLogin).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => {
                                setSelectedUser(user);
                                setShowPermissions(true);
                              }}
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-3 w-3" />
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
        </div>

        {/* Role Definitions */}
        <Card>
          <CardHeader>
            <CardTitle>Role Definitions</CardTitle>
            <CardDescription>Understanding user roles and their capabilities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(rolePermissions).map(([role, details]) => (
                <div key={role} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{role}</h4>
                    <Badge className={details.color}>
                      {usersData.filter(u => u.role === role).length} users
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{details.description}</p>
                  <div className="space-y-1">
                    {details.permissions.map((permission, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <UserCheck className="h-3 w-3 text-green-600" />
                        <span>{permission}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Permissions View */}
      {showPermissions && selectedUser && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>User Permissions - {selectedUser.name}</CardTitle>
                <CardDescription>Manage individual user permissions</CardDescription>
              </div>
              <Button variant="outline" onClick={() => setShowPermissions(false)}>
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium">Core Permissions</h4>
                <div className="space-y-3">
                  {Object.entries(selectedUser.permissions).map(([permission, enabled]) => (
                    <div key={permission} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium capitalize">
                          {permission.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {permission === 'viewInventory' && 'View inventory items and stock levels'}
                          {permission === 'editInventory' && 'Add, edit, and update inventory items'}
                          {permission === 'manageSuppliers' && 'Manage supplier information and orders'}
                          {permission === 'viewReports' && 'Access reports and analytics dashboard'}
                          {permission === 'manageUsers' && 'Create and manage user accounts'}
                          {permission === 'systemSettings' && 'Configure system-wide settings'}
                        </p>
                      </div>
                      <Switch checked={enabled} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium">User Information</h4>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <p className="font-medium">Role</p>
                    <p className="text-sm text-muted-foreground">{selectedUser.role}</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <p className="font-medium">Department</p>
                    <p className="text-sm text-muted-foreground">{selectedUser.department}</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <p className="font-medium">Status</p>
                    <Badge variant={getStatusColor(selectedUser.status)}>
                      {selectedUser.status}
                    </Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <p className="font-medium">Last Login</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(selectedUser.lastLogin).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Save Changes
                  </Button>
                  <Button variant="outline" className="w-full">
                    Reset Password
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}