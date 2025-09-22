import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const Market = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const stocks = [
    { 
      symbol: "AAPL", 
      name: "Apple Inc.", 
      price: 175.43, 
      change: 2.15, 
      changePercent: 1.24, 
      volume: "52.3M",
      marketCap: "2.8T",
      category: "Technology"
    },
    { 
      symbol: "TSLA", 
      name: "Tesla Inc.", 
      price: 242.68, 
      change: -5.32, 
      changePercent: -2.14, 
      volume: "45.1M",
      marketCap: "772B",
      category: "Automotive"
    },
    { 
      symbol: "GOOGL", 
      name: "Alphabet Inc.", 
      price: 138.21, 
      change: 1.85, 
      changePercent: 1.36, 
      volume: "28.7M",
      marketCap: "1.7T",
      category: "Technology"
    },
    { 
      symbol: "MSFT", 
      name: "Microsoft Corp.", 
      price: 378.85, 
      change: 4.12, 
      changePercent: 1.10, 
      volume: "22.4M",
      marketCap: "2.8T",
      category: "Technology"
    },
    { 
      symbol: "INFY", 
      name: "Infosys Limited", 
      price: 18.76, 
      change: 0.45, 
      changePercent: 2.46, 
      volume: "8.2M",
      marketCap: "78B",
      category: "IT Services"
    },
    { 
      symbol: "TCS", 
      name: "Tata Consultancy Services", 
      price: 3420.50, 
      change: 15.20, 
      changePercent: 0.45, 
      volume: "1.1M",
      marketCap: "124B",
      category: "IT Services"
    },
    { 
      symbol: "RELIANCE", 
      name: "Reliance Industries", 
      price: 2456.80, 
      change: -12.45, 
      changePercent: -0.50, 
      volume: "3.8M",
      marketCap: "166B",
      category: "Energy"
    },
    { 
      symbol: "HDFC", 
      name: "HDFC Bank Limited", 
      price: 1598.25, 
      change: 8.95, 
      changePercent: 0.56, 
      volume: "2.9M",
      marketCap: "121B",
      category: "Banking"
    },
  ];

  const filteredStocks = stocks.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const topGainers = stocks
    .filter(stock => stock.changePercent > 0)
    .sort((a, b) => b.changePercent - a.changePercent)
    .slice(0, 3);

  const topLosers = stocks
    .filter(stock => stock.changePercent < 0)
    .sort((a, b) => a.changePercent - b.changePercent)
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Market</h1>
        <p className="text-muted-foreground">Explore stocks and make informed trading decisions.</p>
      </div>

      {/* Market Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="trading-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Top Gainers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {topGainers.map((stock) => (
                <div key={stock.symbol} className="flex justify-between items-center">
                  <span className="font-medium">{stock.symbol}</span>
                  <span className="text-profit">+{stock.changePercent.toFixed(2)}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="trading-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Top Losers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {topLosers.map((stock) => (
                <div key={stock.symbol} className="flex justify-between items-center">
                  <span className="font-medium">{stock.symbol}</span>
                  <span className="text-loss">{stock.changePercent.toFixed(2)}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="trading-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Market Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Status</span>
                <Badge variant="secondary" className="bg-profit text-profit-foreground">Open</Badge>
              </div>
              <div className="flex justify-between">
                <span>Time</span>
                <span className="text-sm">9:15 AM - 3:30 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Next Close</span>
                <span className="text-sm">5h 23m</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="trading-card">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search stocks by symbol or company name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Stocks List */}
      <Card className="trading-card">
        <CardHeader>
          <CardTitle>All Stocks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredStocks.map((stock) => (
              <div
                key={stock.symbol}
                className="flex items-center justify-between p-4 rounded-lg bg-card-hover hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-bold text-primary">{stock.symbol.slice(0, 2)}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{stock.symbol}</h3>
                    <p className="text-sm text-muted-foreground">{stock.name}</p>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {stock.category}
                    </Badge>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Market Cap</p>
                  <p className="font-medium">₹{stock.marketCap}</p>
                </div>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Volume</p>
                  <p className="font-medium">{stock.volume}</p>
                </div>

                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <div>
                      <p className="text-lg font-bold">₹{stock.price}</p>
                      <div className={`flex items-center text-sm ${
                        stock.change >= 0 ? 'text-profit' : 'text-loss'
                      }`}>
                        {stock.change >= 0 ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {stock.change >= 0 ? '+' : ''}₹{stock.change} ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent}%)
                      </div>
                    </div>
                    <Link to={`/market/${stock.symbol}`}>
                      <Button variant="outline" size="sm">
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Market;