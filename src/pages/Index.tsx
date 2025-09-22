import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, BarChart3, Shield, Users, Zap, Target, ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: TrendingUp,
      title: "Real-time Market Data",
      description: "Access live stock prices and market movements to make informed trading decisions."
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Comprehensive charts and technical indicators to analyze stock performance."
    },
    {
      icon: Shield,
      title: "Risk-free Trading",
      description: "Practice with virtual money - no real financial risk while you learn."
    },
    {
      icon: Users,
      title: "Community Learning",
      description: "Join thousands of traders and learn from the community leaderboard."
    },
    {
      icon: Zap,
      title: "Instant Execution",
      description: "Lightning-fast order execution with real-time portfolio updates."
    },
    {
      icon: Target,
      title: "Goal Tracking",
      description: "Set and track your trading goals with detailed performance metrics."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Finance Student",
      content: "TradePro helped me understand stock trading before investing real money. The tutorials are fantastic!",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "New Investor",
      content: "The virtual trading platform is incredibly realistic. I gained confidence before starting real trading.",
      rating: 5
    },
    {
      name: "Priya Patel",
      role: "Day Trader",
      content: "Great for testing new strategies without risk. The analytics tools are professional-grade.",
      rating: 5
    }
  ];

  const stats = [
    { label: "Active Traders", value: "10,000+" },
    { label: "Virtual Trades", value: "500K+" },
    { label: "Success Rate", value: "85%" },
    { label: "Learning Hours", value: "50K+" }
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="text-center space-y-8 py-20">
        <div className="space-y-4">
          <Badge variant="outline" className="text-primary border-primary/20">
            Virtual Stock Trading Platform
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Master Stock Trading
            <br />
            <span className="bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
              Without the Risk
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn to trade stocks with our advanced virtual trading platform. Practice with real market data, 
            get ₹1,00,000 virtual money, and master trading strategies risk-free.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/dashboard">
            <Button variant="trading" size="lg" className="text-lg px-8 py-3">
              Start Trading Now
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
          <Link to="/tutorials">
            <Button variant="outline" size="lg" className="text-lg px-8 py-3">
              Learn First
            </Button>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-primary">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Why Choose TradePro?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform combines real market data with educational tools to create the perfect learning environment.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="trading-card">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Platform Preview */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Professional Trading Platform</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience real-time market data and professional-grade tools in a risk-free environment.
          </p>
        </div>
        
        <Card className="trading-card p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Start with ₹1,00,000 Virtual Money</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-profit" />
                  <span>Real-time stock prices and market data</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-profit" />
                  <span>Advanced charting and technical analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-profit" />
                  <span>Portfolio tracking and performance analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-profit" />
                  <span>Educational tutorials and resources</span>
                </li>
              </ul>
              <Link to="/market">
                <Button variant="default" size="lg">
                  Explore Market
                </Button>
              </Link>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-8 text-center">
              <TrendingUp className="h-24 w-24 text-primary mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">Live Market Data</h4>
              <p className="text-muted-foreground">
                Practice with real stock prices and market movements
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* Testimonials */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">What Our Traders Say</h2>
          <p className="text-muted-foreground">
            Join thousands of successful traders who started their journey with TradePro.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="trading-card">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                <div>
                  <div className="font-medium">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-8 py-20">
        <Card className="trading-card bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="pt-12 pb-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Trading Journey?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of traders who have mastered the markets with TradePro. 
              Start trading with virtual money today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button variant="trading" size="lg" className="text-lg px-8 py-3">
                  Get Started Free
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link to="/tutorials">
                <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                  Browse Tutorials
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Index;
