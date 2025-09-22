import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, TrendingUp, TrendingDown, Clock, Volume, DollarSign } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const StockDetail = () => {
  const { symbol } = useParams();
  const [timeframe, setTimeframe] = useState("1D");

  // Mock stock data
  const stockData = {
    AAPL: {
      symbol: "AAPL",
      name: "Apple Inc.",
      price: 175.43,
      change: 2.15,
      changePercent: 1.24,
      volume: "52.3M",
      marketCap: "2.8T",
      pe: 28.5,
      high52: 198.23,
      low52: 124.17,
      category: "Technology",
      description: "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide."
    }
  };

  const currentStock = stockData[symbol as keyof typeof stockData] || stockData.AAPL;

  // Mock chart data
  const chartData = [
    { time: "9:30", price: 173.28 },
    { time: "10:00", price: 174.15 },
    { time: "10:30", price: 173.89 },
    { time: "11:00", price: 175.20 },
    { time: "11:30", price: 174.67 },
    { time: "12:00", price: 175.43 },
    { time: "12:30", price: 176.12 },
    { time: "1:00", price: 175.85 },
    { time: "1:30", price: 175.43 },
  ];

  const news = [
    {
      title: "Apple Reports Strong Q4 Earnings",
      summary: "Apple Inc. reported better-than-expected quarterly earnings with strong iPhone sales.",
      time: "2 hours ago",
      source: "Financial Times"
    },
    {
      title: "New iPhone Models Drive Revenue Growth",
      summary: "Latest iPhone lineup shows strong consumer demand across all price segments.",
      time: "5 hours ago",
      source: "Reuters"
    },
    {
      title: "Apple Expands Services Revenue",
      summary: "Services segment continues to show double-digit growth year-over-year.",
      time: "1 day ago",
      source: "Bloomberg"
    }
  ];

  const timeframes = ["1D", "5D", "1M", "3M", "1Y", "5Y"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link to="/market">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Market
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">{currentStock.symbol}</h1>
          <p className="text-muted-foreground">{currentStock.name}</p>
        </div>
        <Badge variant="outline">{currentStock.category}</Badge>
      </div>

      {/* Price and Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="trading-card">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-3xl font-bold">₹{currentStock.price}</div>
                  <div className={`flex items-center text-lg ${
                    currentStock.change >= 0 ? 'text-profit' : 'text-loss'
                  }`}>
                    {currentStock.change >= 0 ? (
                      <TrendingUp className="h-5 w-5 mr-1" />
                    ) : (
                      <TrendingDown className="h-5 w-5 mr-1" />
                    )}
                    {currentStock.change >= 0 ? '+' : ''}₹{currentStock.change} ({currentStock.changePercent >= 0 ? '+' : ''}{currentStock.changePercent}%)
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Link to={`/trade?symbol=${currentStock.symbol}&type=buy`}>
                    <Button variant="buy">Buy</Button>
                  </Link>
                  <Link to={`/trade?symbol=${currentStock.symbol}&type=sell`}>
                    <Button variant="sell">Sell</Button>
                  </Link>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Timeframe Selector */}
              <div className="flex space-x-2 mb-4">
                {timeframes.map((tf) => (
                  <Button
                    key={tf}
                    variant={timeframe === tf ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTimeframe(tf)}
                  >
                    {tf}
                  </Button>
                ))}
              </div>

              {/* Chart */}
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="time" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      domain={['dataMin - 1', 'dataMax + 1']}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stock Stats */}
        <div className="space-y-4">
          <Card className="trading-card">
            <CardHeader>
              <CardTitle>Key Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Market Cap</span>
                <span className="font-medium">₹{currentStock.marketCap}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Volume</span>
                <span className="font-medium">{currentStock.volume}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">P/E Ratio</span>
                <span className="font-medium">{currentStock.pe}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">52W High</span>
                <span className="font-medium">₹{currentStock.high52}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">52W Low</span>
                <span className="font-medium">₹{currentStock.low52}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="trading-card">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to={`/trade?symbol=${currentStock.symbol}&type=buy`}>
                <Button variant="buy" className="w-full">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Buy {currentStock.symbol}
                </Button>
              </Link>
              <Link to={`/trade?symbol=${currentStock.symbol}&type=sell`}>
                <Button variant="sell" className="w-full">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Sell {currentStock.symbol}
                </Button>
              </Link>
              <Button variant="outline" className="w-full">
                Add to Watchlist
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Company Info and News */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="trading-card">
          <CardHeader>
            <CardTitle>About {currentStock.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {currentStock.description}
            </p>
          </CardContent>
        </Card>

        <Card className="trading-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent News
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {news.map((article, index) => (
                <div key={index} className="border-b border-border pb-4 last:border-b-0">
                  <h4 className="font-medium mb-1">{article.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{article.summary}</p>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{article.source}</span>
                    <span>{article.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StockDetail;