"use client"
import { useState, useEffect } from "react"
import {
  ArrowLeft,
  User,
  MapPin,
  CreditCard,
  Shield,
  Edit,
  Star,
  Clock,
  Heart,
  Gift,
  Settings,
  Home,
  Search,
  Compass,
  Activity,
  Moon,
  Zap,
  Camera,
  Save,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Health profile data
const healthProfile = {
  activityLevel: "Moderately Active",
  sleepPattern: "Night Owl",
  energyLevel: "High Energy",
  stressLevel: "Low",
  achievements: [
    { name: "Sleep Score 75%+ for 3 days", unlocked: true, date: "2 days ago" },
    { name: "Activity Streak: 5 days", unlocked: true, date: "1 day ago" },
    { name: "Stress levels 20% or lower this week", unlocked: true, date: "3 days ago" },
    { name: "Hydration Goal: 7 days", unlocked: false, progress: 85 },
    { name: "Nutrition Balance: 10 days", unlocked: false, progress: 60 },
  ],
  weeklyStats: {
    avgSleep: 7.2,
    avgActivity: 8500,
    avgStress: 18,
    healthScore: 87,
  },
}

// Order history
const orderHistory = [
  {
    id: 1,
    restaurant: "Green Kitchen",
    items: ["Protein-Rich Bowl", "Green Smoothie"],
    total: "$19.98",
    date: "2 days ago",
    status: "Delivered",
    rating: 5,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=80&h=80&auto=format&fit=crop",
  },
  {
    id: 2,
    restaurant: "Juice Bar",
    items: ["Hydrating Smoothie"],
    total: "$6.74",
    date: "4 days ago",
    status: "Delivered",
    rating: 4,
    image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?q=80&w=80&h=80&auto=format&fit=crop",
  },
  {
    id: 3,
    restaurant: "Nourish Cafe",
    items: ["Balanced Lunch", "Evening Calm Tea"],
    total: "$19.98",
    date: "1 week ago",
    status: "Delivered",
    rating: 5,
    image: "https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?q=80&w=80&h=80&auto=format&fit=crop",
  },
]

// Favorite restaurants
const favoriteRestaurants = [
  {
    id: 1,
    name: "Green Kitchen",
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?q=80&w=100&h=100&auto=format&fit=crop",
    rating: 4.8,
    cuisine: "Healthy",
    lastOrdered: "2 days ago",
  },
  {
    id: 2,
    name: "Nourish Cafe",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=100&h=100&auto=format&fit=crop",
    rating: 4.6,
    cuisine: "Balanced",
    lastOrdered: "1 week ago",
  },
  {
    id: 3,
    name: "Juice Bar",
    image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=100&h=100&auto=format&fit=crop",
    rating: 4.5,
    cuisine: "Smoothies",
    lastOrdered: "4 days ago",
  },
]

// Address data
const addresses = [
  {
    id: 1,
    type: "Home",
    address: "123 Main St, San Francisco, CA 94102",
    isDefault: true,
  },
  {
    id: 2,
    type: "Work",
    address: "456 Market St, San Francisco, CA 94105",
    isDefault: false,
  },
]

// Payment methods
const paymentMethods = [
  {
    id: 1,
    type: "Visa",
    last4: "4242",
    expiry: "12/25",
    isDefault: true,
  },
  {
    id: 2,
    type: "Mastercard",
    last4: "8888",
    expiry: "08/26",
    isDefault: false,
  },
]

function ProfileEditDialog({ userData, onSave }: { userData: any; onSave: (data: any) => void }) {
  const [formData, setFormData] = useState({
    name: userData?.name || "",
    email: userData?.email || "",
    phone: userData?.phone || "",
    bio: userData?.bio || "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSave = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const updatedData = { ...userData, ...formData }
    localStorage.setItem("userData", JSON.stringify(updatedData))
    onSave(updatedData)
    setSuccess(true)
    setIsLoading(false)

    setTimeout(() => setSuccess(false), 2000)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Edit className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>Make changes to your profile information here.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell us about yourself..."
              value={formData.bio}
              onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
            />
          </div>

          {success && (
            <Alert>
              <AlertDescription>Profile updated successfully!</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end gap-2">
            <DialogTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogTrigger>
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function AvatarEditDialog({ userData, onSave }: { userData: any; onSave: (data: any) => void }) {
  const [selectedAvatar, setSelectedAvatar] = useState(userData?.avatar || "")
  const [isLoading, setIsLoading] = useState(false)

  const avatarOptions = [
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&h=100&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&h=100&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=100&h=100&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&h=100&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=100&h=100&auto=format&fit=crop",
  ]

  const handleSave = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const updatedData = { ...userData, avatar: selectedAvatar }
    localStorage.setItem("userData", JSON.stringify(updatedData))
    onSave(updatedData)
    setIsLoading(false)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="absolute bottom-0 right-0 rounded-full h-8 w-8 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Camera className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Profile Picture</DialogTitle>
          <DialogDescription>Choose a new profile picture from the options below.</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-4">
          {avatarOptions.map((avatar, index) => (
            <div
              key={index}
              className={`relative cursor-pointer rounded-full overflow-hidden border-2 ${
                selectedAvatar === avatar ? "border-primary" : "border-transparent"
              }`}
              onClick={() => setSelectedAvatar(avatar)}
            >
              <Image
                src={avatar || "/placeholder.svg"}
                alt={`Avatar ${index + 1}`}
                width={80}
                height={80}
                className="object-cover"
              />
              {selectedAvatar === avatar && (
                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                  <div className="bg-primary rounded-full p-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-2">
          <DialogTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogTrigger>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function OrderCard({ order }: { order: any }) {
  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
            <Image src={order.image || "/placeholder.svg"} alt={order.restaurant} fill className="object-cover" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-medium">{order.restaurant}</h4>
              <Badge variant={order.status === "Delivered" ? "default" : "secondary"}>{order.status}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-1">{order.items.join(", ")}</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{order.date}</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">{order.total}</span>
                {order.rating && (
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs">{order.rating}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function FavoriteRestaurantCard({ restaurant }: { restaurant: any }) {
  const [isFavorite, setIsFavorite] = useState(true)

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
    // Here you would typically update the backend
  }

  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
            <Image src={restaurant.image || "/placeholder.svg"} alt={restaurant.name} fill className="object-cover" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-medium">{restaurant.name}</h4>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs">{restaurant.rating}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-1">{restaurant.cuisine}</p>
            <p className="text-xs text-muted-foreground">Last ordered: {restaurant.lastOrdered}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={toggleFavorite}>
            <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function AccountPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("profile")
  const [userData, setUserData] = useState<any>(null)
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: true,
    healthInsights: true,
    newRestaurants: false,
  })

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData")
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("userData")
    router.push("/login")
  }

  const handleProfileSave = (newData: any) => {
    setUserData(newData)
  }

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))
    // Here you would typically save to backend
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-lg font-bold">Account</h1>
              <p className="text-xs text-muted-foreground">Manage your profile and preferences</p>
            </div>
          </div>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="container py-4">
          {/* Profile Header */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
                    <AvatarFallback>
                      {userData.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <AvatarEditDialog userData={userData} onSave={handleProfileSave} />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold">{userData.name}</h2>
                  <p className="text-muted-foreground">{userData.email}</p>
                  <p className="text-sm text-muted-foreground">Member since {userData.joinDate}</p>
                  {userData.bio && <p className="text-sm text-muted-foreground mt-1">{userData.bio}</p>}
                </div>
                <ProfileEditDialog userData={userData} onSave={handleProfileSave} />
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">47</div>
                  <div className="text-xs text-muted-foreground">Total Orders</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">12</div>
                  <div className="text-xs text-muted-foreground">Favorites</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">8</div>
                  <div className="text-xs text-muted-foreground">Saved Items</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 w-full mb-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="health">Health</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-4">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Full Name</Label>
                      <p className="text-sm text-muted-foreground">{userData.name}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Email</Label>
                      <p className="text-sm text-muted-foreground">{userData.email}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Phone</Label>
                      <p className="text-sm text-muted-foreground">{userData.phone}</p>
                    </div>
                    {userData.bio && (
                      <div>
                        <Label className="text-sm font-medium">Bio</Label>
                        <p className="text-sm text-muted-foreground">{userData.bio}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Addresses */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Saved Addresses
                    </div>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      Add New
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {addresses.map((address) => (
                    <div key={address.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{address.type}</h4>
                          {address.isDefault && <Badge variant="secondary">Default</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground">{address.address}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Payment Methods */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Payment Methods
                    </div>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      Add New
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-muted rounded flex items-center justify-center">
                          <CreditCard className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">
                              {method.type} •••• {method.last4}
                            </h4>
                            {method.isDefault && <Badge variant="secondary">Default</Badge>}
                          </div>
                          <p className="text-sm text-muted-foreground">Expires {method.expiry}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Favorite Restaurants */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Heart className="h-5 w-5" />
                      Favorite Restaurants
                    </div>
                    <Link href="#" className="text-sm text-primary">
                      View All
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {favoriteRestaurants.map((restaurant) => (
                    <FavoriteRestaurantCard key={restaurant.id} restaurant={restaurant} />
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="health" className="space-y-4">
              {/* Health Profile Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Health Profile
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        {healthProfile.weeklyStats.healthScore}%
                      </div>
                      <p className="text-sm text-muted-foreground">Overall Health Score</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-green-500" />
                        <div>
                          <p className="text-sm font-medium">{healthProfile.activityLevel}</p>
                          <p className="text-xs text-muted-foreground">Activity Level</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Moon className="h-4 w-4 text-indigo-500" />
                        <div>
                          <p className="text-sm font-medium">{healthProfile.sleepPattern}</p>
                          <p className="text-xs text-muted-foreground">Sleep Pattern</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-amber-500" />
                        <div>
                          <p className="text-sm font-medium">{healthProfile.energyLevel}</p>
                          <p className="text-xs text-muted-foreground">Energy Level</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-blue-500" />
                        <div>
                          <p className="text-sm font-medium">{healthProfile.stressLevel} Stress</p>
                          <p className="text-xs text-muted-foreground">Stress Level</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Weekly Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>This Week's Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Average Sleep</span>
                        <span>{healthProfile.weeklyStats.avgSleep}h</span>
                      </div>
                      <Progress value={(healthProfile.weeklyStats.avgSleep / 8) * 100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Daily Steps</span>
                        <span>{healthProfile.weeklyStats.avgActivity.toLocaleString()}</span>
                      </div>
                      <Progress value={(healthProfile.weeklyStats.avgActivity / 10000) * 100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Stress Level</span>
                        <span>{healthProfile.weeklyStats.avgStress}%</span>
                      </div>
                      <Progress value={100 - healthProfile.weeklyStats.avgStress} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Health Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="h-5 w-5" />
                    Health Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {healthProfile.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">{achievement.name}</h4>
                        {achievement.unlocked ? (
                          <p className="text-xs text-green-600">Unlocked {achievement.date}</p>
                        ) : (
                          <div className="mt-1">
                            <Progress value={achievement.progress} className="h-1" />
                            <p className="text-xs text-muted-foreground mt-1">{achievement.progress}% complete</p>
                          </div>
                        )}
                      </div>
                      <div className="ml-3">
                        {achievement.unlocked ? (
                          <Badge className="bg-green-500 hover:bg-green-600">✓ Unlocked</Badge>
                        ) : (
                          <Badge variant="outline">{achievement.progress}%</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders" className="space-y-4">
              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Recent Orders
                    </div>
                    <Link href="#" className="text-sm text-primary">
                      View All
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {orderHistory.map((order) => (
                    <OrderCard key={order.id} order={order} />
                  ))}
                </CardContent>
              </Card>

              {/* Order Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-primary">47</div>
                      <div className="text-sm text-muted-foreground">Total Orders</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-primary">4.8</div>
                      <div className="text-sm text-muted-foreground">Avg Rating Given</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-primary">$847</div>
                      <div className="text-sm text-muted-foreground">Total Spent</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-primary">$127</div>
                      <div className="text-sm text-muted-foreground">Savings from Health Discounts</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="sticky bottom-0 border-t bg-background">
        <div className="container">
          <nav className="flex items-center justify-between py-3">
            <Link href="/" className="flex flex-col items-center gap-1 text-muted-foreground">
              <Home className="h-5 w-5" />
              <span className="text-xs">Home</span>
            </Link>
            <Link href="/search" className="flex flex-col items-center gap-1 text-muted-foreground">
              <Search className="h-5 w-5" />
              <span className="text-xs">Search</span>
            </Link>
            <Link href="/browse" className="flex flex-col items-center gap-1 text-muted-foreground">
              <Compass className="h-5 w-5" />
              <span className="text-xs">Browse</span>
            </Link>
            <Link href="/account" className="flex flex-col items-center gap-1 text-primary">
              <User className="h-5 w-5" />
              <span className="text-xs">Account</span>
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
