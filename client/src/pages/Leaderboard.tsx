import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { languages } from "@/data/languages";
import { Trophy, Medal, User, Search, Filter, Crown, Users, Globe } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";

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
    <section className="py-12 px-4 container mx-auto max-w-5xl">
      <motion.div 
        className="text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
          <Trophy className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 gradient-heading">
          Global Leaderboard
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Compete with language learners from around the world and track your progress
        </p>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Card className="mb-8 shadow-md border border-primary/10 bg-gradient-to-r from-primary/10 to-primary/5">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl flex items-center">
                <Crown className="h-7 w-7 text-yellow-500 mr-2" />
                Your Ranking
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Select value={currentPeriod} onValueChange={setCurrentPeriod}>
                  <SelectTrigger className="min-w-[140px] bg-white shadow-sm">
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
            <CardDescription className="text-base">
              Keep practicing to move up in the rankings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-sm flex items-center justify-between"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mr-5 border-2 border-primary/20">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <div className="font-bold text-xl mb-1">Your Ranking</div>
                  <div className="text-gray-600">Keep learning to climb the ranks!</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-extrabold mb-1 gradient-text">#{userPosition || "—"}</div>
                <Badge variant="secondary" className="bg-primary/10 text-primary px-3 py-1.5 text-base font-medium">{totalXP} XP</Badge>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters */}
        <motion.div 
          className="w-full md:w-1/3 space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Card className="shadow-md border border-primary/10">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Filter className="h-5 w-5 mr-2 text-primary" />
                Filters
              </CardTitle>
              <CardDescription className="text-base">
                Refine leaderboard results
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <label className="font-medium mb-2 block">Language</label>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="w-full border-2">
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className="flex items-center">
                      <Globe className="h-4 w-4 mr-2 text-primary" />
                      All Languages
                    </SelectItem>
                    {languages.map(lang => (
                      <SelectItem key={lang.id} value={lang.id}>
                        <div className="flex items-center">
                          <img 
                            src={lang.flag} 
                            alt={lang.name} 
                            className="w-5 h-5 rounded-full mr-2" 
                          />
                          {lang.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="font-medium mb-2 block">Search Users</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input 
                    placeholder="Search by name" 
                    className="pl-10 py-6 text-base border-2" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md border border-primary/10">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Users className="h-5 w-5 mr-2 text-primary" />
                Friends
              </CardTitle>
              <CardDescription className="text-base">
                Connect with other learners
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6 space-y-4">
                <p className="text-gray-600">Connect with friends to challenge each other and track progress together!</p>
                <Button className="w-full py-6 text-lg font-bold rounded-xl shadow-md">Find Friends</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Leaderboard */}
        <motion.div 
          className="w-full md:w-2/3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Card className="shadow-md border border-primary/10">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <Trophy className="h-6 w-6 text-yellow-500 mr-2" />
                Top Learners
              </CardTitle>
              <CardDescription className="text-base">
                {currentPeriod === "day" && "Today's top performing language learners"}
                {currentPeriod === "week" && "This week's top performing language learners"}
                {currentPeriod === "month" && "This month's top performing language learners"}
                {currentPeriod === "alltime" && "All-time top performing language learners"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredLeaderboard.map((user, index) => (
                  <motion.div 
                    key={user.id}
                    className={`p-4 rounded-xl flex items-center shadow-sm
                      ${user.isCurrentUser ? 'bg-primary/10 border-2 border-primary/20' : 
                        index < 3 ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50 border border-gray-100'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.05, duration: 0.3 }}
                  >
                    <div className="w-10 text-center mr-4">
                      {index === 0 && <Trophy className="h-7 w-7 text-yellow-500 mx-auto" />}
                      {index === 1 && <Medal className="h-7 w-7 text-gray-400 mx-auto" />}
                      {index === 2 && <Medal className="h-7 w-7 text-amber-700 mx-auto" />}
                      {index > 2 && <span className="font-bold text-lg text-gray-500">#{index + 1}</span>}
                    </div>
                    
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4 border border-gray-200">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center">
                        <span className={`font-bold text-lg ${user.isCurrentUser ? 'text-primary' : ''}`}>
                          {user.name}
                        </span>
                        {user.isCurrentUser && (
                          <Badge className="ml-2 bg-primary/10 text-primary border-none px-2 py-0.5" variant="outline">You</Badge>
                        )}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
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
                    
                    <div className="text-right font-bold text-lg">
                      {user.xp} XP
                    </div>
                  </motion.div>
                ))}
                
                {filteredLeaderboard.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <Trophy className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-xl">No users found matching your criteria</p>
                    <Button className="mt-4" onClick={() => {
                      setSelectedLanguage("all");
                      setSearchQuery("");
                    }}>Reset Filters</Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Leaderboard;