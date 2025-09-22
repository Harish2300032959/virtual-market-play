import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Activity, Calendar, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const Portfolio = () => {
  const holdings = [
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      quantity: 15,
      avgPrice: 165.20,
      currentPrice: 175.43,
      value: 2631.45,
      profitLoss: 153.45,
      profitLossPercent: 6.20
    },
    {
      symbol: "TSLA",
      name: "Tesla Inc.",
      quantity: 8,
      avgPrice: 250.30,
      currentPrice: 242.68,
      value: 1941.44,
      profitLoss: -60.96,
      profitLossPercent: -3.04
    },
    {
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      quantity: 12,
      avgPrice: 135.50,
      currentPrice: 138.21,
      value: 1658.52,
      profitLoss: 32.52,
      profitLossPercent: 2.00
    },
    {
      symbol: "INFY",
      name: "Infosys Limited",
      quantity: 100,
      avgPrice: 17.80,
      currentPrice: 18.76,
      value: 1876.00,
      profitLoss: 96.00,
      profitLossPercent: 5.39
    },
  ];

  const transactionHistory = [
    { date: "2024-01-15", symbol: "AAPL", type: "BUY", quantity: 10, price: 173.28, total: 1732.80 },
    { date: "2024-01-14", symbol: "TSLA", type: "SELL", quantity: 5, price: 248.00, total: 1240.00 },
    { date: "2024-01-13", symbol: "INFY", type: "BUY", quantity: 50, price: 18.31, total: 915.50 },
    { date: "2024-01-12", symbol: "GOOGL", type: "BUY", quantity: 12, price: 135.50, total: 1626.00 },
    { date: "2024-01-11", symbol: "AAPL", type: "BUY", quantity: 5, price: 157.12, total: 785.60 },
  ];

  const totalValue = holdings.reduce((sum, holding) => sum + holding.value, 0);
  const totalProfitLoss = holdings.reduce((sum, holding) => sum + holding.profitLoss, 0);
  const totalProfitLossPercent = (totalProfitLoss / (totalValue - totalProfitLoss)) * 100;

  // Portfolio allocation data for pie chart
  const allocationData = holdings.map(holding => ({
    name: holding.symbol,
    value: holding.value,
    percentage: ((holding.value / totalValue) * 100).toFixed(1)
  }));

  // Performance data for bar chart
  const performanceData = holdings.map(holding => ({
    symbol: holding.symbol,
    profitLoss: holding.profitLoss,
    percentage: holding.profitLossPercent
  }));

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--profit))', 'hsl(var(--loss))', 'hsl(var(--muted))'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Portfolio</h1>
          <p className="text-muted-foreground">Track your investments and performance.</p>
        </div>
        <Link to="/trade">
          <Button variant="trading">
            <Activity className="h-4 w-4 mr-2" />
            New Trade
          </Button>
        </Link>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="trading-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Current portfolio value</p>
          </CardContent>
        </Card>

        <Card className="trading-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total P&L</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalProfitLoss >= 0 ? 'text-profit' : 'text-loss'}`}>
              {totalProfitLoss >= 0 ? '+' : ''}₹{totalProfitLoss.toLocaleString()}
            </div>
            <p className={`text-xs ${totalProfitLoss >= 0 ? 'text-profit' : 'text-loss'}`}>
              {totalProfitLoss >= 0 ? '+' : ''}{totalProfitLossPercent.toFixed(2)}%
            </p>
          </CardContent>
        </Card>

        <Card className="trading-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Holdings</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{holdings.length}</div>
            <p className="text-xs text-muted-foreground">Active positions</p>
          </CardContent>
        </Card>

        <Card className="trading-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Day's Change</CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-profit">+₹1,245</div>
            <p className="text-xs text-profit">+1.85% today</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="holdings" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="holdings">Holdings</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>

        <TabsContent value="holdings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="trading-card">
                <CardHeader>
                  <CardTitle>Current Holdings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {holdings.map((holding) => (
                      <div key={holding.symbol} className="flex items-center justify-between p-4 rounded-lg bg-card-hover">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="font-bold text-primary">{holding.symbol.slice(0, 2)}</span>
                          </div>
                          <div>
                            <h3 className="font-semibold">{holding.symbol}</h3>
                            <p className="text-sm text-muted-foreground">{holding.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {holding.quantity} shares @ ₹{holding.avgPrice}
                            </p>
                          </div>
                        </div>

                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Current Price</p>
                          <p className="font-medium">₹{holding.currentPrice}</p>
                        </div>

                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Market Value</p>
                          <p className="font-bold">₹{holding.value.toLocaleString()}</p>
                        </div>

                        <div className="text-right">
                          <div className={`text-sm font-medium ${holding.profitLoss >= 0 ? 'text-profit' : 'text-loss'}`}>
                            {holding.profitLoss >= 0 ? '+' : ''}₹{Math.abs(holding.profitLoss).toLocaleString()}
                          </div>
                          <div className={`text-xs ${holding.profitLoss >= 0 ? 'text-profit' : 'text-loss'}`}>
                            {holding.profitLoss >= 0 ? '+' : ''}{holding.profitLossPercent.toFixed(2)}%
                          </div>
                          <Link to={`/market/${holding.symbol}`}>
                            <Button variant="outline" size="sm" className="mt-2">
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Portfolio Allocation */}
            <Card className="trading-card">
              <CardHeader>
                <CardTitle>Portfolio Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={allocationData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        dataKey="value"
                      >
                        {allocationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Value']}
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2 mt-4">
                  {allocationData.map((item, index) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="text-sm">{item.name}</span>
                      </div>
                      <span className="text-sm font-medium">{item.percentage}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <Card className="trading-card">
            <CardHeader>
              <CardTitle>Performance by Stock</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="symbol" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      formatter={(value: number) => [`₹${value.toLocaleString()}`, 'P&L']}
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar 
                      dataKey="profitLoss" 
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions">
          <Card className="trading-card">
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactionHistory.map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-card-hover">
                    <div className="flex items-center space-x-4">
                      <Badge 
                        variant={transaction.type === 'BUY' ? 'default' : 'destructive'}
                        className={transaction.type === 'BUY' ? 'bg-profit text-profit-foreground' : 'bg-loss text-loss-foreground'}
                      >
                        {transaction.type}
                      </Badge>
                      <div>
                        <p className="font-medium">{transaction.symbol}</p>
                        <p className="text-sm text-muted-foreground">{transaction.date}</p>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Quantity</p>
                      <p className="font-medium">{transaction.quantity}</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Price</p>
                      <p className="font-medium">₹{transaction.price}</p>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="font-bold">₹{transaction.total.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Portfolio;