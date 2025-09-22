import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, DollarSign, Activity, Users, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const portfolioValue = 125000;
  const initialBalance = 100000;
  const profit = portfolioValue - initialBalance;
  const profitPercentage = (profit / initialBalance) * 100;

  const topStocks = [
    { symbol: "AAPL", price: 175.43, change: 2.15, changePercent: 1.24 },
    { symbol: "TSLA", price: 242.68, change: -5.32, changePercent: -2.14 },
    { symbol: "INFY", price: 18.76, change: 0.45, changePercent: 2.46 },
    { symbol: "TCS", price: 3420.50, change: 15.20, changePercent: 0.45 },
  ];

  const recentTrades = [
    { symbol: "AAPL", type: "BUY", quantity: 10, price: 173.28, time: "2 hours ago" },
    { symbol: "TSLA", type: "SELL", quantity: 5, price: 248.00, time: "1 day ago" },
    { symbol: "INFY", type: "BUY", quantity: 50, price: 18.31, time: "2 days ago" },
  ];

  const leaderboard = [
    { rank: 1, name: "Alex Chen", profit: 45000, percentage: 45.0 },
    { rank: 2, name: "Sarah Kim", profit: 38500, percentage: 38.5 },
    { rank: 3, name: "You", profit: profit, percentage: profitPercentage },
    { rank: 4, name: "Mike Ross", profit: 22000, percentage: 22.0 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your trading overview.</p>
        </div>
        <Link to="/trade">
          <Button variant="trading" size="lg">
            Start Trading
          </Button>
        </Link>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="trading-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{portfolioValue.toLocaleString()}</div>
            <p className={`text-xs ${profit >= 0 ? 'text-profit' : 'text-loss'}`}>
              {profit >= 0 ? '+' : ''}₹{profit.toLocaleString()} ({profitPercentage.toFixed(2)}%)
            </p>
          </CardContent>
        </Card>

        <Card className="trading-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's P&L</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-profit">+₹3,245</div>
            <p className="text-xs text-profit">+2.68% from yesterday</p>
          </CardContent>
        </Card>

        <Card className="trading-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Positions</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">6 profitable, 2 in loss</p>
          </CardContent>
        </Card>

        <Card className="trading-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rank</CardTitle>
            <Trophy className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#3</div>
            <p className="text-xs text-muted-foreground">out of 150 traders</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Stocks */}
        <Card className="trading-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Market Movers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topStocks.map((stock) => (
                <div key={stock.symbol} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{stock.symbol}</p>
                    <p className="text-sm text-muted-foreground">₹{stock.price}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm ${stock.change >= 0 ? 'text-profit' : 'text-loss'}`}>
                      {stock.change >= 0 ? '+' : ''}₹{stock.change}
                    </p>
                    <p className={`text-xs ${stock.changePercent >= 0 ? 'text-profit' : 'text-loss'}`}>
                      {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/market">
              <Button variant="outline" className="w-full mt-4">
                View All Stocks
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Trades */}
        <Card className="trading-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Recent Trades
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTrades.map((trade, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{trade.symbol}</p>
                    <p className="text-sm text-muted-foreground">{trade.time}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${trade.type === 'BUY' ? 'text-profit' : 'text-loss'}`}>
                      {trade.type} {trade.quantity}
                    </p>
                    <p className="text-xs text-muted-foreground">₹{trade.price}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/portfolio">
              <Button variant="outline" className="w-full mt-4">
                View Portfolio
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Leaderboard */}
      <Card className="trading-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leaderboard.map((trader) => (
              <div 
                key={trader.rank} 
                className={`flex items-center justify-between p-3 rounded-lg ${
                  trader.name === 'You' ? 'bg-primary/10 border border-primary/20' : 'bg-card-hover'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    trader.rank === 1 ? 'bg-profit text-profit-foreground' :
                    trader.rank === 2 ? 'bg-muted text-muted-foreground' :
                    trader.rank === 3 ? 'bg-primary text-primary-foreground' :
                    'bg-secondary text-secondary-foreground'
                  }`}>
                    {trader.rank}
                  </div>
                  <p className="font-medium">{trader.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-profit">+₹{trader.profit.toLocaleString()}</p>
                  <p className="text-sm text-profit">+{trader.percentage.toFixed(1)}%</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;