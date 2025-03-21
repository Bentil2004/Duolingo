import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { languages } from "@/data/languages";
import { User, Settings, Award, CheckCircle, Heart, Gem, Flame, Trophy, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProgressBar from "@/components/ProgressBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const Profile = () => {
  const { userProgress } = useLanguage();
  const [activeTab, setActiveTab] = useState("stats");
  
  const totalXP = userProgress.reduce((sum, lang) => sum + lang.xp, 0);
  const totalGems = userProgress.reduce((sum, lang) => sum + lang.gems, 0);
  const currentStreak = Math.max(...userProgress.map(lang => lang.streak));
  const totalHearts = userProgress.reduce((sum, lang) => sum + lang.hearts, 0);
  
  const achievements = [
    { id: 1, name: "First Steps", description: "Complete your first lesson", isCompleted: true },
    { id: 2, name: "Streak Master", description: "Maintain a 7-day streak", isCompleted: false },
    { id: 3, name: "Perfect Score", description: "Complete a lesson with 100% accuracy", isCompleted: true },
    { id: 4, name: "Vocabulary Builder", description: "Learn 50 new words", isCompleted: false },
    { id: 5, name: "Grammar Expert", description: "Master 10 grammar rules", isCompleted: false },
    { id: 6, name: "Multilingual", description: "Study two different languages", isCompleted: userProgress.filter(p => p.xp > 0).length >= 2 },
  ];
  
  return (
    <section className="py-12 px-4 container mx-auto max-w-5xl">
      <motion.div 
        className="text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
          <User className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 gradient-heading">
          Your Language Profile
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Track your progress, view achievements, and manage your language learning journey
        </p>
      </motion.div>
      












      <div className="flex flex-col md:flex-row gap-8 md:items-start">
        <motion.div 
          className="md:w-1/3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card className="mb-6 shadow-md border border-primary/10">
            <CardHeader className="text-center">
              <div className="mx-auto bg-primary/10 w-28 h-28 rounded-full flex items-center justify-center mb-4">
                <User className="h-14 w-14 text-primary" />
              </div>
              <CardTitle className="text-2xl">Language Learner</CardTitle>
              <CardDescription className="text-base">Member since March 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <Flame className="h-6 w-6 text-orange-500 mr-2" />
                  <span className="font-bold text-lg">{currentStreak} day streak</span>
                </div>
                <Badge variant="outline" className="bg-primary/10 text-primary px-3 py-1 text-base">{totalXP} XP</Badge>
              </div>
              
              <div className="grid grid-cols-3 gap-3 text-center mb-6">
                <div className="bg-red-50 p-3 rounded-xl shadow-sm">
                  <Heart className="h-6 w-6 text-red-500 mx-auto mb-2" />
                  <span className="text-base font-bold text-red-700">{totalHearts}</span>
                </div>
                <div className="bg-blue-50 p-3 rounded-xl shadow-sm">
                  <Gem className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                  <span className="text-base font-bold text-blue-700">{totalGems}</span>
                </div>
                <div className="bg-amber-50 p-3 rounded-xl shadow-sm">
                  <Award className="h-6 w-6 text-amber-500 mx-auto mb-2" />
                  <span className="text-base font-bold text-amber-700">{achievements.filter(a => a.isCompleted).length}</span>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2 py-5 text-lg rounded-xl border-2 border-gray-200 hover:bg-gray-50 transition-colors"
                onClick={() => setActiveTab("settings")}
              >
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div 
          className="md:w-2/3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Tabs defaultValue="stats" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="stats" className="text-base py-3">Stats</TabsTrigger>
              <TabsTrigger value="achievements" className="text-base py-3">Achievements</TabsTrigger>
              <TabsTrigger value="settings" className="text-base py-3">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="stats" className="space-y-6">
              <Card className="shadow-md border border-primary/10">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Trophy className="h-6 w-6 text-primary mr-2" />
                    Your Progress
                  </CardTitle>
                  <CardDescription className="text-base">
                    Track your learning journey across all languages
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  {languages.map((language, index) => {
                    const progress = userProgress.find(p => p.languageId === language.id);
                    if (!progress || progress.xp === 0) return null;
                    
                    return (
                      <motion.div 
                        key={language.id} 
                        className="border-b pb-5 last:border-b-0"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                      >
                        <div className="flex items-center mb-2">
                          <img 
                            src={language.flag} 
                            alt={`${language.name} Flag`} 
                            className="w-10 h-10 rounded-full object-cover mr-3 border border-gray-200" 
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-lg">{language.name}</span>
                              <span className="text-sm font-medium px-3 py-1 bg-primary/10 rounded-full text-primary">{progress.xp} XP</span>
                            </div>
                            <ProgressBar progress={progress.progress} className="mt-3" height={8} showAnimation={true} />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                  
                  {userProgress.filter(p => p.xp > 0).length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Shield className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-lg">Start learning a language to see your progress!</p>
                      <Button className="mt-4">Choose a Language</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card className="shadow-md border border-primary/10">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Flame className="h-6 w-6 text-orange-500 mr-2" />
                    Weekly Activity
                  </CardTitle>
                  <CardDescription className="text-base">
                    Keep your streak going by practicing daily
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-3 text-center">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                      <motion.div 
                        key={day + i} 
                        className="flex flex-col items-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.05, duration: 0.3 }}
                      >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 
                          ${i < 3 ? 'bg-primary text-white shadow-md' : 'bg-gray-100 text-gray-400'}`}>
                          {i < 3 && <CheckCircle className="h-6 w-6" />}
                        </div>
                        <span className="text-sm font-medium">{day}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="achievements" className="space-y-6">
              <Card className="shadow-md border border-primary/10">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Award className="h-6 w-6 text-amber-500 mr-2" />
                    Achievements
                  </CardTitle>
                  <CardDescription className="text-base">
                    Your learning milestones and accomplishments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {achievements.map((achievement, index) => (
                      <motion.div 
                        key={achievement.id} 
                        className={`p-5 border rounded-xl flex items-center gap-4 shadow-sm
                          ${achievement.isCompleted 
                            ? 'border-primary/30 bg-primary/5' 
                            : 'border-gray-200 opacity-60'
                          }`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.08, duration: 0.4 }}
                      >
                        <div className={`p-3 rounded-full ${achievement.isCompleted 
                          ? 'bg-primary/20 text-primary' 
                          : 'bg-gray-100 text-gray-400'}`}
                        >
                          <Award className="h-7 w-7" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-lg">{achievement.name}</h4>
                          <p className="text-gray-600">{achievement.description}</p>
                        </div>
                        {achievement.isCompleted && (
                          <CheckCircle className="h-6 w-6 text-green-500" />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card className="shadow-md border border-primary/10">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Settings className="h-6 w-6 text-primary mr-2" />
                    Profile Settings
                  </CardTitle>
                  <CardDescription className="text-base">
                    Manage your account and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="font-bold text-lg">Daily Goal</h4>
                    <div className="flex flex-wrap items-center gap-2">
                      {[1, 2, 3, 4, 5].map(goal => (
                        <Button 
                          key={goal} 
                          variant={goal === 1 ? "default" : "outline"}
                          size="lg"
                          className={goal === 1 ? "shadow-md" : ""}
                        >
                          {goal * 10} XP
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-bold text-lg">Notifications</h4>
                    <div className="grid grid-cols-1 gap-3 bg-gray-50 p-4 rounded-xl">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Daily Reminders</span>
                        <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Weekly Progress</span>
                        <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">New Content</span>
                        <input type="checkbox" className="toggle toggle-primary" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button className="w-full py-6 text-lg font-bold rounded-xl shadow-md">Save Settings</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
};

export default Profile;