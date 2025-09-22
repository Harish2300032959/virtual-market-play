import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield, 
  AlertTriangle,
  RefreshCw,
  Settings,
  Trophy,
  TrendingUp,
  DollarSign
} from "lucide-react";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    joinDate: "2024-01-01",
    tradingExperience: "Intermediate",
    riskProfile: "Moderate"
  });

  const [isEditing, setIsEditing] = useState(false);

  const tradingStats = {
    totalTrades: 145,
    winRate: 68.5,
    totalProfitLoss: 25000,
    bestTrade: 3500,
    worstTrade: -1200,
    avgHoldingPeriod: "5.2 days",
    favoriteStock: "AAPL",
    tradingRank: "#3"
  };

  const achievements = [
    {
      title: "First Trade",
      description: "Completed your first successful trade",
      icon: TrendingUp,
      earned: true,
      date: "2024-01-02"
    },
    {
      title: "Profit Streak",
      description: "5 consecutive profitable trades",
      icon: Trophy,
      earned: true,
      date: "2024-01-10"
    },
    {
      title: "Big Winner",
      description: "Single trade profit over ₹2,500",
      icon: DollarSign,
      earned: true,
      date: "2024-01-12"
    },
    {
      title: "Risk Manager",
      description: "Use stop-loss orders on 10 trades",
      icon: Shield,
      earned: false,
      date: null
    },
    {
      title: "Diversified Portfolio",
      description: "Hold stocks from 5 different sectors",
      icon: TrendingUp,
      earned: false,
      date: null
    },
    {
      title: "Marathon Trader",
      description: "Complete 100 trades",
      icon: Trophy,
      earned: true,
      date: "2024-01-14"
    }
  ];

  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
    setIsEditing(false);
  };

  const handleResetBalance = () => {
    toast({
      title: "Balance Reset",
      description: "Your virtual balance has been reset to ₹1,00,000.",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setUserInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">Manage your account and trading preferences.</p>
        </div>
        <Button 
          variant={isEditing ? "default" : "outline"}
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
        >
          <Settings className="h-4 w-4 mr-2" />
          {isEditing ? "Save Changes" : "Edit Profile"}
        </Button>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="trading">Trading Stats</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Info */}
            <div className="lg:col-span-2">
              <Card className="trading-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={userInfo.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={userInfo.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={userInfo.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={userInfo.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="experience">Trading Experience</Label>
                      <Input
                        id="experience"
                        value={userInfo.tradingExperience}
                        onChange={(e) => handleInputChange("tradingExperience", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="risk">Risk Profile</Label>
                      <Input
                        id="risk"
                        value={userInfo.riskProfile}
                        onChange={(e) => handleInputChange("riskProfile", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Profile Summary */}
            <Card className="trading-card">
              <CardHeader>
                <CardTitle>Profile Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <User className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg">{userInfo.name}</h3>
                  <p className="text-muted-foreground">{userInfo.tradingExperience} Trader</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{userInfo.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{userInfo.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Joined {new Date(userInfo.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Trading Rank</span>
                    <Badge variant="default" className="bg-profit text-profit-foreground">
                      {tradingStats.tradingRank}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trading">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="trading-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Trades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{tradingStats.totalTrades}</div>
                <p className="text-xs text-muted-foreground">Completed trades</p>
              </CardContent>
            </Card>

            <Card className="trading-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Win Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-profit">{tradingStats.winRate}%</div>
                <p className="text-xs text-muted-foreground">Profitable trades</p>
              </CardContent>
            </Card>

            <Card className="trading-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total P&L</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-profit">+₹{tradingStats.totalProfitLoss.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Overall profit</p>
              </CardContent>
            </Card>

            <Card className="trading-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Best Trade</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-profit">+₹{tradingStats.bestTrade.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Single trade profit</p>
              </CardContent>
            </Card>

            <Card className="trading-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Worst Trade</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-loss">₹{tradingStats.worstTrade.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Single trade loss</p>
              </CardContent>
            </Card>

            <Card className="trading-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Avg Holding</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{tradingStats.avgHoldingPeriod}</div>
                <p className="text-xs text-muted-foreground">Average period</p>
              </CardContent>
            </Card>

            <Card className="trading-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Favorite Stock</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{tradingStats.favoriteStock}</div>
                <p className="text-xs text-muted-foreground">Most traded</p>
              </CardContent>
            </Card>

            <Card className="trading-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Rank</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{tradingStats.tradingRank}</div>
                <p className="text-xs text-muted-foreground">Leaderboard</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="achievements">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <Card key={index} className={`trading-card ${achievement.earned ? 'border-profit/20 bg-profit/5' : 'opacity-75'}`}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        achievement.earned ? 'bg-profit text-profit-foreground' : 'bg-muted text-muted-foreground'
                      }`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                        {achievement.earned ? (
                          <Badge variant="default" className="bg-profit text-profit-foreground">
                            Earned {achievement.date && new Date(achievement.date).toLocaleDateString()}
                          </Badge>
                        ) : (
                          <Badge variant="outline">
                            In Progress
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="trading-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5" />
                  Account Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-card-hover">
                  <h3 className="font-medium mb-2">Reset Virtual Balance</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Reset your virtual trading balance back to ₹1,00,000. This will clear all your current positions and trade history.
                  </p>
                  <Button 
                    variant="destructive"
                    onClick={handleResetBalance}
                    className="w-full"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reset Balance
                  </Button>
                </div>

                <div className="p-4 rounded-lg bg-card-hover">
                  <h3 className="font-medium mb-2">Export Data</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Download your trading history and portfolio data as a CSV file.
                  </p>
                  <Button variant="outline" className="w-full">
                    Download Trading Data
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="trading-card border-amber-500/20 bg-amber-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-500">
                  <AlertTriangle className="h-5 w-5" />
                  Account Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Two-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Add an extra layer of security to your account.
                  </p>
                  <Button variant="outline">
                    <Shield className="h-4 w-4 mr-2" />
                    Enable 2FA
                  </Button>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Change Password</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Update your account password for better security.
                  </p>
                  <Button variant="outline">
                    Change Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;