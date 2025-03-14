import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { languages } from "@/data/languages";
import { User, Settings, Award, CheckCircle, Heart, Gem, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProgressBar from "@/components/ProgressBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Profile = () => {
  const { userProgress } = useLanguage();
  const [activeTab, setActiveTab] = useState("stats");
  
  // Calculate total XP and other stats
  const totalXP = userProgress.reduce((sum, lang) => sum + lang.xp, 0);
  const totalGems = userProgress.reduce((sum, lang) => sum + lang.gems, 0);
  const currentStreak = Math.max(...userProgress.map(lang => lang.streak));
  const totalHearts = userProgress.reduce((sum, lang) => sum + lang.hearts, 0);
  
  // Mock achievements data
  const achievements = [
    { id: 1, name: "First Steps", description: "Complete your first lesson", isCompleted: true },
    { id: 2, name: "Streak Master", description: "Maintain a 7-day streak", isCompleted: false },
    { id: 3, name: "Perfect Score", description: "Complete a lesson with 100% accuracy", isCompleted: true },
    { id: 4, name: "Vocabulary Builder", description: "Learn 50 new words", isCompleted: false },
    { id: 5, name: "Grammar Expert", description: "Master 10 grammar rules", isCompleted: false },
    { id: 6, name: "Multilingual", description: "Study two different languages", isCompleted: userProgress.filter(p => p.xp > 0).length >= 2 },
  ];
  
  return (
    <section className="py-8 px-4 container mx-auto max-w-4xl">
      <div className="flex flex-col md:flex-row gap-6 md:items-start">
        {/* Profile sidebar */}
        <div className="md:w-1/3">
          <Card className="mb-6">
            <CardHeader className="text-center">
              <div className="mx-auto bg-primary/10 w-24 h-24 rounded-full flex items-center justify-center mb-4">
                <User className="h-12 w-12 text-primary" />
              </div>
              <CardTitle>Language Learner</CardTitle>
              <CardDescription>Member since March 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <Flame className="h-5 w-5 text-orange-500 mr-2" />
                  <span className="font-medium">{currentStreak} day streak</span>
                </div>
                <Badge variant="outline" className="bg-primary/10">{totalXP} XP</Badge>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-center mb-6">
                <div className="bg-gray-50 p-2 rounded-lg">
                  <Heart className="h-5 w-5 text-red-500 mx-auto mb-1" />
                  <span className="text-sm font-medium">{totalHearts}</span>
                </div>
                <div className="bg-gray-50 p-2 rounded-lg">
                  <Gem className="h-5 w-5 text-blue-500 mx-auto mb-1" />
                  <span className="text-sm font-medium">{totalGems}</span>
                </div>
                <div className="bg-gray-50 p-2 rounded-lg">
                  <Award className="h-5 w-5 text-yellow-500 mx-auto mb-1" />
                  <span className="text-sm font-medium">{achievements.filter(a => a.isCompleted).length}</span>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2"
                onClick={() => setActiveTab("settings")}
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Main content */}
        <div className="md:w-2/3">
          <Tabs defaultValue="stats" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="stats">Stats</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="stats" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Your Progress</CardTitle>
                  <CardDescription>
                    Track your learning journey across all languages
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {languages.map(language => {
                    const progress = userProgress.find(p => p.languageId === language.id);
                    if (!progress || progress.xp === 0) return null;
                    
                    return (
                      <div key={language.id} className="border-b pb-4 last:border-b-0">
                        <div className="flex items-center mb-2">
                          <img 
                            src={language.flag} 
                            alt={`${language.name} Flag`} 
                            className="w-8 h-8 rounded-full object-cover mr-3" 
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{language.name}</span>
                              <span className="text-sm text-gray-500">{progress.xp} XP</span>
                            </div>
                            <ProgressBar progress={progress.progress} className="mt-2" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  
                  {userProgress.filter(p => p.xp > 0).length === 0 && (
                    <div className="text-center py-4 text-gray-500">
                      <p>Start learning a language to see your progress!</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-2 text-center">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                      <div key={day + i} className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 
                          ${i < 3 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}>
                          {i < 3 && <CheckCircle className="h-5 w-5" />}
                        </div>
                        <span className="text-xs">{day}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="achievements" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                  <CardDescription>
                    Your learning milestones and accomplishments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {achievements.map(achievement => (
                      <div 
                        key={achievement.id} 
                        className={`p-4 border rounded-lg flex items-center gap-4 
                          ${achievement.isCompleted 
                            ? 'border-primary/30 bg-primary/5' 
                            : 'border-gray-200 opacity-60'
                          }`}
                      >
                        <div className={`p-2 rounded-full ${achievement.isCompleted 
                          ? 'bg-primary/20 text-primary' 
                          : 'bg-gray-100 text-gray-400'}`}
                        >
                          <Award className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{achievement.name}</h4>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                        </div>
                        {achievement.isCompleted && (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>
                    Manage your account and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Daily Goal</h4>
                    <div className="flex items-center space-x-2">
                      {[1, 2, 3, 4, 5].map(goal => (
                        <Button 
                          key={goal} 
                          variant={goal === 1 ? "default" : "outline"}
                          size="sm"
                        >
                          {goal * 10} XP
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Notifications</h4>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-center justify-between">
                        <span>Daily Reminders</span>
                        <input type="checkbox" className="toggle" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Weekly Progress</span>
                        <input type="checkbox" className="toggle" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>New Content</span>
                        <input type="checkbox" className="toggle" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button className="w-full">Save Settings</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default Profile;