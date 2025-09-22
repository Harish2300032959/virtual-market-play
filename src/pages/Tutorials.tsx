import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, PlayCircle, CheckCircle, Clock, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Tutorials = () => {
  const tutorials = [
    {
      id: 1,
      title: "Stock Market Basics",
      description: "Learn the fundamentals of stock market investing, including key terminology and concepts.",
      level: "Beginner",
      duration: "15 min",
      completed: true,
      topics: ["What are stocks?", "Market cap", "P/E ratio", "Dividends"],
      icon: BookOpen
    },
    {
      id: 2,
      title: "Reading Stock Charts",
      description: "Understand how to read and interpret stock price charts and technical indicators.",
      level: "Beginner",
      duration: "20 min",
      completed: true,
      topics: ["Candlestick charts", "Volume", "Moving averages", "Support & Resistance"],
      icon: TrendingUp
    },
    {
      id: 3,
      title: "Types of Orders",
      description: "Learn about different order types and when to use each one effectively.",
      level: "Intermediate",
      duration: "12 min",
      completed: false,
      topics: ["Market orders", "Limit orders", "Stop-loss orders", "Good Till Cancelled"],
      icon: PlayCircle
    },
    {
      id: 4,
      title: "Risk Management",
      description: "Essential strategies for managing risk and protecting your investment capital.",
      level: "Intermediate",
      duration: "25 min",
      completed: false,
      topics: ["Position sizing", "Diversification", "Stop-loss strategies", "Risk-reward ratio"],
      icon: BookOpen
    },
    {
      id: 5,
      title: "Fundamental Analysis",
      description: "Learn how to evaluate a company's financial health and growth prospects.",
      level: "Advanced",
      duration: "35 min",
      completed: false,
      topics: ["Financial statements", "Valuation ratios", "Industry analysis", "Economic indicators"],
      icon: PlayCircle
    },
    {
      id: 6,
      title: "Technical Analysis",
      description: "Master chart patterns and technical indicators for timing your trades.",
      level: "Advanced",
      duration: "40 min",
      completed: false,
      topics: ["Chart patterns", "RSI & MACD", "Bollinger Bands", "Fibonacci retracements"],
      icon: TrendingUp
    }
  ];

  const learningPaths = [
    {
      name: "Complete Beginner",
      description: "Start from the basics and build your foundation",
      tutorials: [1, 2, 3],
      color: "bg-profit"
    },
    {
      name: "Active Trader",
      description: "Learn advanced strategies for frequent trading",
      tutorials: [2, 3, 6],
      color: "bg-primary"
    },
    {
      name: "Long-term Investor",
      description: "Focus on fundamental analysis and value investing",
      tutorials: [1, 4, 5],
      color: "bg-loss"
    }
  ];

  const stats = {
    totalTutorials: tutorials.length,
    completed: tutorials.filter(t => t.completed).length,
    totalTime: tutorials.reduce((sum, t) => sum + parseInt(t.duration), 0),
    activeUsers: 1247
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-profit text-profit-foreground";
      case "Intermediate": return "bg-primary text-primary-foreground";
      case "Advanced": return "bg-loss text-loss-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Trading Tutorials</h1>
        <p className="text-muted-foreground">Master the art of trading with our comprehensive learning resources.</p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="trading-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
            <CheckCircle className="h-4 w-4 text-profit" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completed}/{stats.totalTutorials}</div>
            <p className="text-xs text-muted-foreground">Tutorials completed</p>
          </CardContent>
        </Card>

        <Card className="trading-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Learning Time</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTime}</div>
            <p className="text-xs text-muted-foreground">Minutes of content</p>
          </CardContent>
        </Card>

        <Card className="trading-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Community</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Active learners</p>
          </CardContent>
        </Card>

        <Card className="trading-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Goal</CardTitle>
            <TrendingUp className="h-4 w-4 text-profit" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">50%</div>
            <p className="text-xs text-muted-foreground">Complete beginner path</p>
          </CardContent>
        </Card>
      </div>

      {/* Learning Paths */}
      <Card className="trading-card">
        <CardHeader>
          <CardTitle>Learning Paths</CardTitle>
          <p className="text-muted-foreground">Structured learning journeys based on your goals</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {learningPaths.map((path, index) => (
              <div key={index} className="p-4 rounded-lg bg-card-hover hover:bg-muted/50 transition-colors cursor-pointer">
                <div className={`w-12 h-12 rounded-full ${path.color} flex items-center justify-center mb-3`}>
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">{path.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{path.description}</p>
                <div className="flex flex-wrap gap-1">
                  {path.tutorials.map(tutorialId => (
                    <Badge key={tutorialId} variant="outline" className="text-xs">
                      Tutorial {tutorialId}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tutorials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tutorials.map((tutorial) => {
          const Icon = tutorial.icon;
          return (
            <Card key={tutorial.id} className={`trading-card ${tutorial.completed ? 'border-profit/20' : ''}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg ${tutorial.completed ? 'bg-profit' : 'bg-primary'} flex items-center justify-center`}>
                      {tutorial.completed ? (
                        <CheckCircle className="h-5 w-5 text-white" />
                      ) : (
                        <Icon className="h-5 w-5 text-white" />
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={getLevelColor(tutorial.level)}>
                          {tutorial.level}
                        </Badge>
                        <span className="text-sm text-muted-foreground flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {tutorial.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                  {tutorial.completed && (
                    <Badge variant="default" className="bg-profit text-profit-foreground">
                      Completed
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{tutorial.description}</p>
                
                <div className="space-y-2 mb-4">
                  <h4 className="text-sm font-medium">What you'll learn:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {tutorial.topics.map((topic, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex space-x-2">
                  <Button 
                    variant={tutorial.completed ? "outline" : "default"}
                    className="flex-1"
                  >
                    {tutorial.completed ? "Review" : "Start Tutorial"}
                  </Button>
                  <Link to="/trade">
                    <Button variant="outline" size="sm">
                      Practice
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Call to Action */}
      <Card className="trading-card bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">Ready to Start Trading?</h3>
            <p className="text-muted-foreground mb-4">
              Apply what you've learned with our virtual trading platform. No real money at risk!
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/trade">
                <Button variant="trading" size="lg">
                  Start Trading
                </Button>
              </Link>
              <Link to="/market">
                <Button variant="outline" size="lg">
                  Explore Market
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Tutorials;