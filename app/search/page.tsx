"use client"
import { useState, useMemo } from "react"
import { ArrowLeft, Filter, SearchIcon, Star, Clock, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"

// All food items and restaurants data (same as home page)
const allFoodItems = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=160&h=120&auto=format&fit=crop",
    title: "Protein-Rich Bowl",
    restaurant: "Green Kitchen",
    price: "$12.99",
    originalPrice: "$12.99",
    discount: null,
    healthTag: "For Your Active Day",
    category: "bowls",
    cuisine: "healthy",
    rating: 4.8,
    deliveryTime: "15-25 min",
    tags: ["protein", "healthy", "quinoa", "chicken"],
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?q=80&w=160&h=120&auto=format&fit=crop",
    title: "Hydrating Smoothie",
    restaurant: "Juice Bar",
    price: "$6.74",
    originalPrice: "$8.99",
    discount: "25% OFF",
    healthTag: "For Your Sleep Recovery",
    category: "drinks",
    cuisine: "healthy",
    rating: 4.5,
    deliveryTime: "10-20 min",
    tags: ["smoothie", "hydrating", "cucumber", "spinach"],
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?q=80&w=160&h=120&auto=format&fit=crop",
    title: "Balanced Lunch",
    restaurant: "Nourish Cafe",
    price: "$14.99",
    category: "bowls",
    cuisine: "healthy",
    rating: 4.6,
    deliveryTime: "20-30 min",
    tags: ["balanced", "salmon", "rice", "vegetables"],
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=160&h=120&auto=format&fit=crop",
    title: "Classic Burger",
    restaurant: "Burger Joint",
    price: "$11.99",
    category: "burgers",
    cuisine: "american",
    rating: 4.3,
    deliveryTime: "20-30 min",
    tags: ["burger", "beef", "cheese", "classic"],
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=160&h=120&auto=format&fit=crop",
    title: "Pepperoni Pizza",
    restaurant: "Pizza Palace",
    price: "$15.99",
    category: "pizza",
    cuisine: "italian",
    rating: 4.4,
    deliveryTime: "25-40 min",
    tags: ["pizza", "pepperoni", "cheese", "italian"],
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=160&h=120&auto=format&fit=crop",
    title: "Chicken Tacos",
    restaurant: "Taco Fiesta",
    price: "$9.99",
    category: "tacos",
    cuisine: "mexican",
    rating: 4.4,
    deliveryTime: "20-35 min",
    tags: ["tacos", "chicken", "mexican", "corn tortillas"],
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=160&h=120&auto=format&fit=crop",
    title: "Mediterranean Salad",
    restaurant: "Salad Station",
    price: "$11.99",
    category: "salads",
    cuisine: "mediterranean",
    rating: 4.6,
    deliveryTime: "15-25 min",
    tags: ["salad", "mediterranean", "feta", "olives"],
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1607532941433-304659e8198a?q=80&w=160&h=120&auto=format&fit=crop",
    title: "Overnight Oats",
    restaurant: "Morning Fuel",
    price: "$8.49",
    originalPrice: "$10.99",
    discount: "20% OFF",
    category: "breakfast",
    cuisine: "healthy",
    rating: 4.7,
    deliveryTime: "15-25 min",
    tags: ["oats", "breakfast", "berries", "healthy"],
  },
]

const allRestaurants = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?q=80&w=320&h=160&auto=format&fit=crop",
    name: "Green Kitchen",
    rating: "4.8",
    deliveryTime: "15-25 min",
    deliveryFee: "$1.99",
    tags: ["Healthy", "Organic", "Vegan Options"],
    cuisine: "healthy",
    priceRange: "$$",
    distance: "0.5 mi",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=320&h=160&auto=format&fit=crop",
    name: "Nourish Cafe",
    rating: "4.6",
    deliveryTime: "20-30 min",
    deliveryFee: "$0",
    tags: ["Balanced", "Gluten-Free", "Protein"],
    cuisine: "healthy",
    priceRange: "$$",
    distance: "0.8 mi",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=320&h=160&auto=format&fit=crop",
    name: "Burger Joint",
    rating: "4.3",
    deliveryTime: "20-30 min",
    deliveryFee: "$2.49",
    tags: ["Burgers", "American", "Fast Food"],
    cuisine: "american",
    priceRange: "$",
    distance: "1.2 mi",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?q=80&w=320&h=160&auto=format&fit=crop",
    name: "Pizza Palace",
    rating: "4.4",
    deliveryTime: "25-40 min",
    deliveryFee: "$1.99",
    tags: ["Pizza", "Italian", "Wings"],
    cuisine: "italian",
    priceRange: "$$",
    distance: "1.5 mi",
  },
]

function SearchResultCard({ item, type = "food" }) {
  if (type === "restaurant") {
    return (
      <Card className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
        <CardContent className="p-0">
          <div className="flex">
            <div className="relative w-24 h-24 flex-shrink-0">
              <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
            </div>
            <div className="flex-1 p-3">
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-medium text-sm">{item.name}</h3>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs">{item.rating}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mb-2">
                {item.tags.slice(0, 2).map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{item.deliveryTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{item.distance}</span>
                  </div>
                </div>
                <span>{item.deliveryFee} delivery</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="flex">
          <div className="relative w-24 h-24 flex-shrink-0">
            <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
            {item.discount && (
              <Badge className="absolute top-1 left-1 bg-blue-500 hover:bg-blue-600 text-xs">{item.discount}</Badge>
            )}
          </div>
          <div className="flex-1 p-3">
            <div className="flex items-start justify-between mb-1">
              <div>
                <h3 className="font-medium text-sm line-clamp-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.restaurant}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium">{item.price}</span>
                  {item.originalPrice && item.originalPrice !== item.price && (
                    <span className="text-xs line-through text-muted-foreground">{item.originalPrice}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span>{item.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{item.deliveryTime}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [filters, setFilters] = useState({
    cuisine: [],
    priceRange: [],
    rating: [0],
    deliveryTime: [60],
    dietary: [],
  })

  // Filter and search logic
  const filteredResults = useMemo(() => {
    let results = []

    if (activeTab === "all" || activeTab === "food") {
      results = [...results, ...allFoodItems.map((item) => ({ ...item, type: "food" }))]
    }

    if (activeTab === "all" || activeTab === "restaurants") {
      results = [...results, ...allRestaurants.map((item) => ({ ...item, type: "restaurant" }))]
    }

    // Apply search query
    if (searchQuery) {
      results = results.filter((item) => {
        const searchFields =
          item.type === "restaurant"
            ? [item.name, ...item.tags, item.cuisine]
            : [item.title, item.restaurant, ...item.tags, item.cuisine]

        return searchFields.some((field) => field.toLowerCase().includes(searchQuery.toLowerCase()))
      })
    }

    // Apply filters
    if (filters.cuisine.length > 0) {
      results = results.filter((item) => filters.cuisine.includes(item.cuisine))
    }

    if (filters.rating[0] > 0) {
      results = results.filter((item) => item.rating >= filters.rating[0])
    }

    return results
  }, [searchQuery, activeTab, filters])

  const clearFilters = () => {
    setFilters({
      cuisine: [],
      priceRange: [],
      rating: [0],
      deliveryTime: [60],
      dietary: [],
    })
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b">
        <div className="container flex items-center gap-4 py-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for food, restaurants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>Refine your search results</SheetDescription>
              </SheetHeader>
              <div className="space-y-6 mt-6">
                {/* Cuisine Filter */}
                <div>
                  <h3 className="font-medium mb-3">Cuisine</h3>
                  <div className="space-y-2">
                    {["healthy", "american", "italian", "mexican", "mediterranean"].map((cuisine) => (
                      <div key={cuisine} className="flex items-center space-x-2">
                        <Checkbox
                          id={cuisine}
                          checked={filters.cuisine.includes(cuisine)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFilters((prev) => ({
                                ...prev,
                                cuisine: [...prev.cuisine, cuisine],
                              }))
                            } else {
                              setFilters((prev) => ({
                                ...prev,
                                cuisine: prev.cuisine.filter((c) => c !== cuisine),
                              }))
                            }
                          }}
                        />
                        <label htmlFor={cuisine} className="text-sm capitalize">
                          {cuisine}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <h3 className="font-medium mb-3">Minimum Rating</h3>
                  <div className="px-2">
                    <Slider
                      value={filters.rating}
                      onValueChange={(value) => setFilters((prev) => ({ ...prev, rating: value }))}
                      max={5}
                      min={0}
                      step={0.5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>0</span>
                      <span>{filters.rating[0]} stars</span>
                      <span>5</span>
                    </div>
                  </div>
                </div>

                {/* Price Range Filter */}
                <div>
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="space-y-2">
                    {["$", "$$", "$$$"].map((price) => (
                      <div key={price} className="flex items-center space-x-2">
                        <Checkbox
                          id={price}
                          checked={filters.priceRange.includes(price)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFilters((prev) => ({
                                ...prev,
                                priceRange: [...prev.priceRange, price],
                              }))
                            } else {
                              setFilters((prev) => ({
                                ...prev,
                                priceRange: prev.priceRange.filter((p) => p !== price),
                              }))
                            }
                          }}
                        />
                        <label htmlFor={price} className="text-sm">
                          {price}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <Button onClick={clearFilters} variant="outline" className="w-full bg-transparent">
                    Clear All Filters
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="container py-4">
          {/* Search Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="food">Food</TabsTrigger>
              <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Results */}
          <div className="space-y-4">
            {searchQuery && (
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {filteredResults.length} results for "{searchQuery}"
                </p>
              </div>
            )}

            {filteredResults.length === 0 ? (
              <div className="text-center py-12">
                <SearchIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No results found</h3>
                <p className="text-muted-foreground">
                  {searchQuery
                    ? `Try searching for something else or adjust your filters`
                    : "Start typing to search for food and restaurants"}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredResults.map((item) => (
                  <SearchResultCard key={`${item.type}-${item.id}`} item={item} type={item.type} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="sticky bottom-0 border-t bg-background">
        <div className="container">
          <nav className="flex items-center justify-between py-3">
            <Link href="/" className="flex flex-col items-center gap-1 text-muted-foreground">
              <SearchIcon className="h-5 w-5" />
              <span className="text-xs">Home</span>
            </Link>
            <Link href="/search" className="flex flex-col items-center gap-1 text-primary">
              <SearchIcon className="h-5 w-5" />
              <span className="text-xs">Search</span>
            </Link>
            <Link href="/browse" className="flex flex-col items-center gap-1 text-muted-foreground">
              <SearchIcon className="h-5 w-5" />
              <span className="text-xs">Browse</span>
            </Link>
            <Link href="/account" className="flex flex-col items-center gap-1 text-muted-foreground">
              <SearchIcon className="h-5 w-5" />
              <span className="text-xs">Account</span>
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
