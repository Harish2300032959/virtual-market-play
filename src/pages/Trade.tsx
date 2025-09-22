import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Calculator, Clock, DollarSign, TrendingUp, AlertCircle } from "lucide-react";

const Trade = () => {
  const [searchParams] = useSearchParams();
  const [tradeType, setTradeType] = useState(searchParams.get("type") || "buy");
  const [selectedStock, setSelectedStock] = useState(searchParams.get("symbol") || "");
  const [quantity, setQuantity] = useState("");
  const [orderType, setOrderType] = useState("market");
  const [limitPrice, setLimitPrice] = useState("");

  const availableBalance = 50000; // Mock available balance

  const stocks = [
    { symbol: "AAPL", name: "Apple Inc.", price: 175.43, change: 2.15, changePercent: 1.24 },
    { symbol: "TSLA", name: "Tesla Inc.", price: 242.68, change: -5.32, changePercent: -2.14 },
    { symbol: "GOOGL", name: "Alphabet Inc.", price: 138.21, change: 1.85, changePercent: 1.36 },
    { symbol: "MSFT", name: "Microsoft Corp.", price: 378.85, change: 4.12, changePercent: 1.10 },
    { symbol: "INFY", name: "Infosys Limited", price: 18.76, change: 0.45, changePercent: 2.46 },
    { symbol: "TCS", name: "Tata Consultancy Services", price: 3420.50, change: 15.20, changePercent: 0.45 },
  ];

  const selectedStockData = stocks.find(stock => stock.symbol === selectedStock);
  const currentPrice = selectedStockData?.price || 0;
  const effectivePrice = orderType === "limit" ? parseFloat(limitPrice) || 0 : currentPrice;
  const totalValue = (parseFloat(quantity) || 0) * effectivePrice;
  const brokerageFee = totalValue * 0.001; // 0.1% brokerage
  const totalCost = tradeType === "buy" ? totalValue + brokerageFee : totalValue - brokerageFee;

  // Mock holdings for sell orders
  const holdings = [
    { symbol: "AAPL", quantity: 15, avgPrice: 165.20 },
    { symbol: "TSLA", quantity: 8, avgPrice: 250.30 },
    { symbol: "GOOGL", quantity: 12, avgPrice: 135.50 },
    { symbol: "INFY", quantity: 100, avgPrice: 17.80 },
  ];

  const availableToSell = holdings.find(h => h.symbol === selectedStock)?.quantity || 0;

  useEffect(() => {
    const typeFromUrl = searchParams.get("type");
    const symbolFromUrl = searchParams.get("symbol");
    
    if (typeFromUrl) setTradeType(typeFromUrl);
    if (symbolFromUrl) setSelectedStock(symbolFromUrl);
  }, [searchParams]);

  const handleTrade = () => {
    if (!selectedStock) {
      toast({
        title: "Error",
        description: "Please select a stock to trade.",
        variant: "destructive",
      });
      return;
    }

    if (!quantity || parseFloat(quantity) <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid quantity.",
        variant: "destructive",
      });
      return;
    }

    if (tradeType === "buy" && totalCost > availableBalance) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough balance for this trade.",
        variant: "destructive",
      });
      return;
    }

    if (tradeType === "sell" && parseFloat(quantity) > availableToSell) {
      toast({
        title: "Insufficient Holdings",
        description: `You only have ${availableToSell} shares of ${selectedStock}.`,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Trade Executed",
      description: `Successfully ${tradeType === "buy" ? "bought" : "sold"} ${quantity} shares of ${selectedStock}.`,
    });

    // Reset form
    setQuantity("");
    setLimitPrice("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Trade Stocks</h1>
        <p className="text-muted-foreground">Buy and sell stocks with real-time pricing.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trade Form */}
        <div className="lg:col-span-2">
          <Card className="trading-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Place Order
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={tradeType} onValueChange={setTradeType} className="mb-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="buy" className="data-[state=active]:bg-profit data-[state=active]:text-profit-foreground">
                    Buy
                  </TabsTrigger>
                  <TabsTrigger value="sell" className="data-[state=active]:bg-loss data-[state=active]:text-loss-foreground">
                    Sell
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="space-y-4">
                {/* Stock Selection */}
                <div>
                  <Label htmlFor="stock">Select Stock</Label>
                  <Select value={selectedStock} onValueChange={setSelectedStock}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a stock to trade" />
                    </SelectTrigger>
                    <SelectContent>
                      {stocks.map((stock) => (
                        <SelectItem key={stock.symbol} value={stock.symbol}>
                          <div className="flex items-center justify-between w-full">
                            <span>{stock.symbol} - {stock.name}</span>
                            <span className="ml-4">₹{stock.price}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Current Price Display */}
                {selectedStockData && (
                  <div className="p-4 rounded-lg bg-card-hover">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{selectedStockData.symbol}</h3>
                        <p className="text-sm text-muted-foreground">{selectedStockData.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold">₹{selectedStockData.price}</p>
                        <p className={`text-sm ${selectedStockData.change >= 0 ? 'text-profit' : 'text-loss'}`}>
                          {selectedStockData.change >= 0 ? '+' : ''}₹{selectedStockData.change} ({selectedStockData.changePercent >= 0 ? '+' : ''}{selectedStockData.changePercent}%)
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Order Type */}
                <div>
                  <Label htmlFor="orderType">Order Type</Label>
                  <Select value={orderType} onValueChange={setOrderType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="market">Market Order</SelectItem>
                      <SelectItem value="limit">Limit Order</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Limit Price (if limit order) */}
                {orderType === "limit" && (
                  <div>
                    <Label htmlFor="limitPrice">Limit Price (₹)</Label>
                    <Input
                      id="limitPrice"
                      type="number"
                      step="0.01"
                      placeholder="Enter limit price"
                      value={limitPrice}
                      onChange={(e) => setLimitPrice(e.target.value)}
                    />
                  </div>
                )}

                {/* Quantity */}
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    placeholder="Enter number of shares"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                  {tradeType === "sell" && selectedStock && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Available to sell: {availableToSell} shares
                    </p>
                  )}
                </div>

                {/* Trade Summary */}
                {quantity && selectedStockData && (
                  <div className="p-4 rounded-lg bg-card-hover space-y-2">
                    <div className="flex justify-between">
                      <span>Shares:</span>
                      <span>{quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Price per share:</span>
                      <span>₹{effectivePrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>₹{totalValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Brokerage (0.1%):</span>
                      <span>₹{brokerageFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t border-border pt-2">
                      <span>Total {tradeType === "buy" ? "Cost" : "Proceeds"}:</span>
                      <span>₹{totalCost.toLocaleString()}</span>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  onClick={handleTrade}
                  variant={tradeType === "buy" ? "buy" : "sell"}
                  size="lg"
                  className="w-full"
                  disabled={!selectedStock || !quantity}
                >
                  {tradeType === "buy" ? "Buy" : "Sell"} {selectedStock} Stocks
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Account Info & Quick Stats */}
        <div className="space-y-4">
          <Card className="trading-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Account Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Available Balance</span>
                <span className="font-bold">₹{availableBalance.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Portfolio Value</span>
                <span className="font-bold">₹125,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total P&L</span>
                <span className="font-bold text-profit">+₹25,000</span>
              </div>
            </CardContent>
          </Card>

          {tradeType === "sell" && (
            <Card className="trading-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Your Holdings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {holdings.map((holding) => (
                    <div
                      key={holding.symbol}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedStock === holding.symbol
                          ? "bg-primary/10 border border-primary/20"
                          : "bg-card-hover hover:bg-muted/50"
                      }`}
                      onClick={() => setSelectedStock(holding.symbol)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{holding.symbol}</p>
                          <p className="text-sm text-muted-foreground">
                            {holding.quantity} shares @ ₹{holding.avgPrice}
                          </p>
                        </div>
                        {selectedStock === holding.symbol && (
                          <Badge variant="default">Selected</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="trading-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Market Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Status</span>
                  <Badge variant="default" className="bg-profit text-profit-foreground">Open</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Hours</span>
                  <span className="text-sm">9:15 AM - 3:30 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Closes in</span>
                  <span className="text-sm">5h 23m</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="trading-card border-amber-500/20 bg-amber-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-500">
                <AlertCircle className="h-5 w-5" />
                Trading Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Market orders execute immediately at current price</li>
                <li>• Limit orders execute only at your specified price or better</li>
                <li>• Always review your order before placing</li>
                <li>• Consider setting stop-loss orders to manage risk</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Trade;