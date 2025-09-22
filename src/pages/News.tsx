import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Clock, TrendingUp, Globe, ExternalLink, Filter } from "lucide-react";

const News = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const news = [
    {
      id: 1,
      title: "Apple Reports Record Q4 Earnings, Beats Analyst Expectations",
      summary: "Apple Inc. announced quarterly revenue of $89.5 billion, up 1% year over year, driven by strong iPhone 15 sales and services growth.",
      content: "Apple's latest quarterly results show resilient performance despite challenging market conditions...",
      category: "earnings",
      source: "Financial Times",
      author: "Sarah Johnson",
      publishedAt: "2024-01-15T10:30:00Z",
      readTime: "3 min read",
      image: "/api/placeholder/400/200",
      tags: ["AAPL", "earnings", "technology"],
      trending: true
    },
    {
      id: 2,
      title: "Tesla Stock Surges on Robotaxi Development News",
      summary: "Tesla shares jumped 8% in pre-market trading following reports of significant progress in their autonomous driving technology.",
      content: "Tesla's Full Self-Driving beta has reached a new milestone with improved safety metrics...",
      category: "technology",
      source: "Reuters",
      author: "Mike Chen",
      publishedAt: "2024-01-15T09:15:00Z",
      readTime: "4 min read",
      image: "/api/placeholder/400/200",
      tags: ["TSLA", "autonomous", "innovation"],
      trending: true
    },
    {
      id: 3,
      title: "Federal Reserve Hints at Potential Rate Cuts in 2024",
      summary: "Fed Chair Powell suggests monetary policy may become less restrictive as inflation continues to moderate toward the 2% target.",
      content: "In his latest speech, Federal Reserve Chairman Jerome Powell indicated that the central bank...",
      category: "market",
      source: "Bloomberg",
      author: "David Williams",
      publishedAt: "2024-01-15T08:45:00Z",
      readTime: "5 min read",
      image: "/api/placeholder/400/200",
      tags: ["fed", "rates", "policy"],
      trending: false
    },
    {
      id: 4,
      title: "Indian IT Sector Shows Strong Growth in Q3 Results",
      summary: "Major Indian IT companies including TCS and Infosys report double-digit growth in quarterly revenues, driven by AI and cloud services.",
      content: "The Indian information technology sector continues to demonstrate robust growth...",
      category: "earnings",
      source: "Economic Times",
      author: "Priya Sharma",
      publishedAt: "2024-01-15T07:20:00Z",
      readTime: "3 min read",
      image: "/api/placeholder/400/200",
      tags: ["TCS", "INFY", "IT services"],
      trending: false
    },
    {
      id: 5,
      title: "Cryptocurrency Market Rally Continues as Bitcoin Hits New High",
      summary: "Bitcoin reaches $48,000 as institutional adoption grows and ETF approvals drive mainstream acceptance.",
      content: "The cryptocurrency market is experiencing renewed optimism as regulatory clarity improves...",
      category: "crypto",
      source: "CoinDesk",
      author: "Alex Turner",
      publishedAt: "2024-01-15T06:30:00Z",
      readTime: "2 min read",
      image: "/api/placeholder/400/200",
      tags: ["bitcoin", "crypto", "ETF"],
      trending: true
    },
    {
      id: 6,
      title: "Energy Stocks Rally on Rising Oil Prices and Supply Concerns",
      summary: "Oil prices climb above $75 per barrel amid geopolitical tensions and OPEC+ production cuts, benefiting energy sector stocks.",
      content: "The energy sector is experiencing a significant rally as oil prices surge...",
      category: "energy",
      source: "Wall Street Journal",
      author: "Robert Martinez",
      publishedAt: "2024-01-15T05:45:00Z",
      readTime: "4 min read",
      image: "/api/placeholder/400/200",
      tags: ["oil", "energy", "commodities"],
      trending: false
    }
  ];

  const categories = [
    { id: "all", label: "All News", count: news.length },
    { id: "earnings", label: "Earnings", count: news.filter(n => n.category === "earnings").length },
    { id: "market", label: "Market", count: news.filter(n => n.category === "market").length },
    { id: "technology", label: "Technology", count: news.filter(n => n.category === "technology").length },
    { id: "crypto", label: "Crypto", count: news.filter(n => n.category === "crypto").length },
    { id: "energy", label: "Energy", count: news.filter(n => n.category === "energy").length },
  ];

  const filteredNews = news.filter(article => {
    const matchesSearch = searchTerm === "" || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const trendingNews = news.filter(article => article.trending).slice(0, 3);

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const published = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - published.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "earnings": return "bg-profit text-profit-foreground";
      case "market": return "bg-primary text-primary-foreground";
      case "technology": return "bg-blue-500 text-white";
      case "crypto": return "bg-orange-500 text-white";
      case "energy": return "bg-green-600 text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Market News</h1>
        <p className="text-muted-foreground">Stay updated with the latest financial news and market insights.</p>
      </div>

      {/* Trending News */}
      <Card className="trading-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Trending Now
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {trendingNews.map((article) => (
              <div key={article.id} className="p-4 rounded-lg bg-card-hover hover:bg-muted/50 transition-colors cursor-pointer">
                <Badge className={getCategoryColor(article.category)} variant="secondary">
                  {article.category}
                </Badge>
                <h3 className="font-medium mt-2 mb-1 line-clamp-2">{article.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{article.summary.slice(0, 100)}...</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{article.source}</span>
                  <span>{formatTimeAgo(article.publishedAt)}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <Card className="trading-card">
        <CardContent className="pt-6">
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search news, stocks, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-6">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="text-xs">
                  {category.label}
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {category.count}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      {/* News List */}
      <div className="space-y-6">
        {filteredNews.map((article) => (
          <Card key={article.id} className="trading-card hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={getCategoryColor(article.category)}>
                      {article.category}
                    </Badge>
                    {article.trending && (
                      <Badge variant="outline" className="text-orange-500 border-orange-500">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                  </div>
                  
                  <h2 className="text-xl font-bold mb-2 hover:text-primary transition-colors">
                    {article.title}
                  </h2>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {article.summary}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        ${tag.toUpperCase()}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Globe className="h-4 w-4" />
                        {article.source}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {formatTimeAgo(article.publishedAt)}
                      </div>
                      <span>{article.readTime}</span>
                    </div>
                    
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Read More
                    </Button>
                  </div>
                </div>
                
                <div className="w-32 h-24 bg-muted rounded-lg flex items-center justify-center">
                  <Globe className="h-8 w-8 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredNews.length === 0 && (
        <Card className="trading-card">
          <CardContent className="pt-6 text-center">
            <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No news found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or category filters.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default News;