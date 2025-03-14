import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { languages } from "@/data/languages";
import { Trophy, Medal, User, Search, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock user data for leaderboard
const mockLeaderboardUsers = [
  { id: 1, name: "Sarah Johnson", xp: 3250, streak: 28, language: "french", avatar: null },
  { id: 2, name: "Miguel Rodriguez", xp: 2875, streak: 15, language: "spanish", avatar: null },
  { id: 3, name: "David Chen", xp: 2630, streak: 32, language: "german", avatar: null },
  { id: 4, name: "You", xp: 2400, streak: 12, language: "french", isCurrentUser: true, avatar: null },
  { id: 5, name: "Emma Wilson", xp: 2150, streak: 9, language: "spanish", avatar: null },
  { id: 6, name: "Ahmed Hassan", xp: 1920, streak: 24, language: "english", avatar: null },
  { id: 7, name: "Olivia Taylor", xp: 1780, streak: 8, language: "german", avatar: null },
  { id: 8, name: "Carlos Mendez", xp: 1650, streak: 19, language: "french", avatar: null },
  { id: 9, name: "Priya Sharma", xp: 1510, streak: 14, language: "english", avatar: null },
  { id: 10, name: "Liam Johnson", xp: 1340, streak: 7, language: "spanish", avatar: null },
];

const Leaderboard = () => {
  const { userProgress } = useLanguage();
  const [currentPeriod, setCurrentPeriod] = useState("week");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Calculate user's total XP for leaderboard positioning
  const totalXP = userProgress.reduce((sum, lang) => sum + lang.xp, 0);
  
  // Filter leaderboard based on selected criteria
  const filteredLeaderboard = mockLeaderboardUsers
    .filter(user => selectedLanguage === "all" || user.language === selectedLanguage)
    .filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => b.xp - a.xp);
  
  // Determine user's position in leaderboard
  const userPosition = filteredLeaderboard.findIndex(user => user.isCurrentUser) + 1;
  
  return (
    <section className="py-8 px-4 container mx-auto max-w-4xl">
      <Card className="mb-6 bg-gradient-to-r from-primary/10 to-primary/5 border-none">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl flex items-center">
              <Trophy className="h-6 w-6 text-yellow-500 mr-2" />
              Leaderboard
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Select value={currentPeriod} onValueChange={setCurrentPeriod}>
                <SelectTrigger className="w-[120px] bg-white">
                  <SelectValue placeholder="Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="alltime">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <CardDescription>
            Compete with other learners and track your ranking
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-white p-4 rounded-lg flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="font-bold">Your Ranking</div>
                <div className="text-sm text-gray-500">Keep learning to climb the ranks!</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">#{userPosition || "—"}</div>
              <Badge variant="outline" className="bg-primary/5">{totalXP} XP</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters */}
        <div className="w-full md:w-1/3 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Language</label>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Languages</SelectItem>
                    {languages.map(lang => (
                      <SelectItem key={lang.id} value={lang.id}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Search Users</label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Search by name" 
                    className="pl-8" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top Friends</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-500 py-4">Connect with friends to see their progress!</p>
              <Button className="w-full">Find Friends</Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Leaderboard */}
        <div className="w-full md:w-2/3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top Learners</CardTitle>
              <CardDescription>
                {currentPeriod === "day" && "Today's top performers"}
                {currentPeriod === "week" && "This week's top performers"}
                {currentPeriod === "month" && "This month's top performers"}
                {currentPeriod === "alltime" && "All-time top performers"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {filteredLeaderboard.map((user, index) => (
                  <div 
                    key={user.id}
                    className={`p-3 rounded-lg flex items-center 
                      ${user.isCurrentUser ? 'bg-primary/10 border border-primary/20' : 
                        index < 3 ? 'bg-yellow-50' : 'bg-gray-50'}`}
                  >
                    <div className="w-8 text-center mr-3">
                      {index === 0 && <Trophy className="h-5 w-5 text-yellow-500 mx-auto" />}
                      {index === 1 && <Medal className="h-5 w-5 text-gray-400 mx-auto" />}
                      {index === 2 && <Medal className="h-5 w-5 text-amber-700 mx-auto" />}
                      {index > 2 && <span className="font-bold text-gray-500">#{index + 1}</span>}
                    </div>
                    
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center">
                        <span className={`font-medium ${user.isCurrentUser ? 'text-primary' : ''}`}>
                          {user.name}
                        </span>
                        {user.isCurrentUser && (
                          <Badge className="ml-2 bg-primary/10 text-primary border-none" variant="outline">You</Badge>
                        )}
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <img 
                          src={languages.find(l => l.id === user.language)?.flag} 
                          alt={user.language} 
                          className="w-4 h-4 rounded-full mr-1" 
                        />
                        <span>{languages.find(l => l.id === user.language)?.name}</span>
                        <span className="mx-1">•</span>
                        <span>{user.streak} day streak</span>
                      </div>
                    </div>
                    
                    <div className="text-right font-bold">
                      {user.xp} XP
                    </div>
                  </div>
                ))}
                
                {filteredLeaderboard.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <p>No users found matching your criteria</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;