"use client"
import { useState } from "react"
import { ArrowLeft, MapPin, Clock, Compass, Home, Search, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

// Categories data
const categories = [
  {
    id: 1,
    name: "Healthy",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=200&h=120&auto=format&fit=crop",
    count: "24 restaurants",
    description: "Nutritious meals for your wellness journey",
  },
  {
    id: 2,
    name: "Fast Food",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=200&h=120&auto=format&fit=crop",
    count: "18 restaurants",
    description: "Quick bites when you're in a hurry",
  },
  {
    id: 3,
    name: "Pizza",
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=200&h=120&auto=format&fit=crop",
    count: "12 restaurants",
    description: "Delicious pizzas from wood-fired to deep dish",
  },
  {
    id: 4,
    name: "Asian",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=200&h=120&auto=format&fit=crop",
    count: "15 restaurants",
    description: "Authentic flavors from across Asia",
  },
  {
    id: 5,
    name: "Mexican",
    image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=200&h=120&auto=format&fit=crop",
    count: "10 restaurants",
    description: "Spicy and flavorful Mexican cuisine",
  },
  {
    id: 6,
    name: "Italian",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=200&h=120&auto=format&fit=crop",
    count: "14 restaurants",
    description: "Classic Italian dishes and pasta",
  },
  {
    id: 7,
    name: "Breakfast",
    image: "https://images.unsplash.com/photo-1607532941433-304659e8198a?q=80&w=200&h=120&auto=format&fit=crop",
    count: "8 restaurants",
    description: "Start your day right with hearty breakfast",
  },
  {
    id: 8,
    name: "Desserts",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=200&h=120&auto=format&fit=crop",
    count: "6 restaurants",
    description: "Sweet treats and indulgent desserts",
  },
]

// Cuisines data
const cuisines = [
  {
    id: 1,
    name: "American",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=200&h=120&auto=format&fit=crop",
    restaurants: 25,
    popular: ["Burgers", "BBQ", "Wings"],
  },
  {
    id: 2,
    name: "Italian",
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=200&h=120&auto=format&fit=crop",
    restaurants: 18,
    popular: ["Pizza", "Pasta", "Risotto"],
  },
  {
    id: 3,
    name: "Mexican",
    image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=200&h=120&auto=format&fit=crop",
    restaurants: 15,
    popular: ["Tacos", "Burritos", "Quesadillas"],
  },
  {
    id: 4,
    name: "Asian",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=200&h=120&auto=format&fit=crop",
    restaurants: 22,
    popular: ["Sushi", "Ramen", "Stir Fry"],
  },
  {
    id: 5,
    name: "Mediterranean",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=200&h=120&auto=format&fit=crop",
    restaurants: 12,
    popular: ["Hummus", "Falafel", "Gyros"],
  },
  {
    id: 6,
    name: "Indian",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=200&h=120&auto=format&fit=crop",
    restaurants: 14,
    popular: ["Curry", "Biryani", "Naan"],
  },
]

// Trending restaurants
const trendingRestaurants = [
  {
    id: 1,
    name: "Green Kitchen",
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?q=80&w=300&h=200&auto=format&fit=crop",
    rating: 4.8,
    deliveryTime: "15-25 min",
    deliveryFee: "$1.99",
    cuisine: "Healthy",
    trending: "Most Ordered",
    distance: "0.5 mi",
  },
  {
    id: 2,
    name: "Pizza Palace",
    image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?q=80&w=300&h=200&auto=format&fit=crop",
    rating: 4.4,
    deliveryTime: "25-40 min",
    deliveryFee: "$1.99",
    cuisine: "Italian",
    trending: "Fastest Growing",
    distance: "1.5 mi",
  },
  {
    id: 3,
    name: "Taco Fiesta",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=300&h=200&auto=format&fit=crop",
    rating: 4.4,
    deliveryTime: "20-35 min",
    deliveryFee: "$1.99",
    cuisine: "Mexican",
    trending: "Highest Rated",
    distance: "1.2 mi",
  },
]

// Nearby areas
const nearbyAreas = [
  {
    id: 1,
    name: "Downtown",
    distance: "2.1 mi",
    restaurants: 45,
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=200&h=120&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Mission District",
    distance: "3.2 mi",
    restaurants: 38,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=200&h=120&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Castro",
    distance: "2.8 mi",
    restaurants: 29,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=200&h=120&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "SOMA",
    distance: "1.9 mi",
    restaurants: 52,
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=200&h=120&auto=format&fit=crop",
  },
]

function CategoryCard({ category }) {
  return (
    <Card className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="relative h-32">
          <Image src={category.image || "/placeholder.svg"} alt={category.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-3 left-3 text-white">
            <h3 className="font-bold text-lg">{category.name}</h3>
            <p className="text-xs opacity-90">{category.count}</p>
          </div>
        </div>
        <div className="p-3">
          <p className="text-sm text-muted-foreground">{category.description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function CuisineCard({ cuisine }) {
  return (
    <Card className="w-[200px] flex-shrink-0 overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="relative h-24">
          <Image src={cuisine.image || "/placeholder.svg"} alt={cuisine.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute bottom-2 left-2 text-white">
            <h3 className="font-bold">{cuisine.name}</h3>
            <p className="text-xs opacity-90">{cuisine.restaurants} restaurants</p>
          </div>
        </div>
        <div className="p-3">
          <div className="flex flex-wrap gap-1">
            {cuisine.popular.map((item, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {item}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function TrendingRestaurantCard({ restaurant }) {
  return (
    <Card className="w-[280px] flex-shrink-0 overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="relative h-40">
          <Image src={restaurant.image || "/placeholder.svg"} alt={restaurant.name} fill className="object-cover" />
          <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">{restaurant.trending}</Badge>
          <Badge className="absolute top-3 right-3 bg-green-500 hover:bg-green-600">{restaurant.rating} ★</Badge>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold">{restaurant.name}</h3>
            <Badge variant="outline">{restaurant.cuisine}</Badge>
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{restaurant.deliveryTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{restaurant.distance}</span>
              </div>
            </div>
            <span>{restaurant.deliveryFee} delivery</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function AreaCard({ area }) {
  return (
    <Card className="w-[160px] flex-shrink-0 overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="relative h-24">
          <Image src={area.image || "/placeholder.svg"} alt={area.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-2 left-2 text-white">
            <h3 className="font-medium text-sm">{area.name}</h3>
            <p className="text-xs opacity-90">{area.distance}</p>
          </div>
        </div>
        <div className="p-2">
          <p className="text-xs text-muted-foreground">{area.restaurants} restaurants</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default function BrowsePage() {
  const [activeTab, setActiveTab] = useState("categories")

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
              <h1 className="text-lg font-bold">Browse</h1>
              <p className="text-xs text-muted-foreground">Discover new favorites</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">San Francisco</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="container py-4">
          {/* Browse Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="cuisines">Cuisines</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="areas">Areas</TabsTrigger>
            </TabsList>

            <TabsContent value="categories" className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Food Categories</h2>
                  <p className="text-sm text-muted-foreground">{categories.length} categories</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categories.map((category) => (
                    <CategoryCard key={category.id} category={category} />
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="cuisines" className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Cuisines</h2>
                  <p className="text-sm text-muted-foreground">{cuisines.length} cuisines</p>
                </div>
                <ScrollArea className="w-full whitespace-nowrap">
                  <div className="flex space-x-4 pb-4">
                    {cuisines.map((cuisine) => (
                      <CuisineCard key={cuisine.id} cuisine={cuisine} />
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>

                {/* Popular cuisines grid */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Popular Cuisines</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {cuisines.slice(0, 4).map((cuisine) => (
                      <Card key={cuisine.id} className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-full overflow-hidden">
                              <Image
                                src={cuisine.image || "/placeholder.svg"}
                                alt={cuisine.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium">{cuisine.name}</h4>
                              <p className="text-sm text-muted-foreground">{cuisine.restaurants} restaurants</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="trending" className="mt-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Trending Now</h2>
                  <p className="text-sm text-muted-foreground">Hot picks in your area</p>
                </div>

                <ScrollArea className="w-full whitespace-nowrap">
                  <div className="flex space-x-4 pb-4">
                    {trendingRestaurants.map((restaurant) => (
                      <TrendingRestaurantCard key={restaurant.id} restaurant={restaurant} />
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>

                {/* Trending categories */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Trending Categories</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <Card className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Healthy Bowls</h4>
                            <p className="text-sm text-muted-foreground">+25% this week</p>
                          </div>
                          <Badge className="bg-green-500 hover:bg-green-600">🔥 Hot</Badge>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Bubble Tea</h4>
                            <p className="text-sm text-muted-foreground">+18% this week</p>
                          </div>
                          <Badge className="bg-orange-500 hover:bg-orange-600">📈 Rising</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="areas" className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Nearby Areas</h2>
                  <p className="text-sm text-muted-foreground">Explore different neighborhoods</p>
                </div>

                <ScrollArea className="w-full whitespace-nowrap">
                  <div className="flex space-x-4 pb-4">
                    {nearbyAreas.map((area) => (
                      <AreaCard key={area.id} area={area} />
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>

                {/* Areas list */}
                <div className="space-y-3">
                  {nearbyAreas.map((area) => (
                    <Card key={area.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                              <Image
                                src={area.image || "/placeholder.svg"}
                                alt={area.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium">{area.name}</h4>
                              <p className="text-sm text-muted-foreground">{area.restaurants} restaurants</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              <span>{area.distance}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
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
            <Link href="/browse" className="flex flex-col items-center gap-1 text-primary">
              <Compass className="h-5 w-5" />
              <span className="text-xs">Browse</span>
            </Link>
            <Link href="/account" className="flex flex-col items-center gap-1 text-muted-foreground">
              <User className="h-5 w-5" />
              <span className="text-xs">Account</span>
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
