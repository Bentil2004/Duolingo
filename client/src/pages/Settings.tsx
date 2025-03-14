import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { languages } from "@/data/languages";
import { Bell, Volume2, Moon, Sun, Globe, User, Lock, LogOut, Settings as SettingsIcon, Shield, Sliders } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const Settings = () => {
  const { userProgress } = useLanguage();
  const [volume, setVolume] = useState(80);
  const [theme, setTheme] = useState("light");
  const [interfaceLanguage, setInterfaceLanguage] = useState("english");
  
  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };
  
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  
  return (
    <section className="py-12 px-4 container mx-auto max-w-5xl">
      <motion.div 
        className="text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
          <SettingsIcon className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 gradient-heading">
          Application Settings
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Customize your learning experience and manage your account preferences
        </p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="account" className="text-base py-3">Account</TabsTrigger>
            <TabsTrigger value="preferences" className="text-base py-3">Preferences</TabsTrigger>
            <TabsTrigger value="notifications" className="text-base py-3">Notifications</TabsTrigger>
            <TabsTrigger value="privacy" className="text-base py-3">Privacy</TabsTrigger>
          </TabsList>
          
          <TabsContent value="account" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <Card className="shadow-md border border-primary/10">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <User className="h-6 w-6 text-primary mr-2" />
                    Profile Information
                  </CardTitle>
                  <CardDescription className="text-base">
                    Manage your profile details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="font-medium mb-2 block">Display Name</label>
                      <Input type="text" placeholder="Your Name" defaultValue="Language Learner" className="py-6 text-base border-2" />
                    </div>
                    <div>
                      <label className="font-medium mb-2 block">Email</label>
                      <Input type="email" placeholder="Your Email" defaultValue="user@example.com" className="py-6 text-base border-2" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="font-medium mb-2 block">Bio</label>
                    <textarea 
                      className="w-full p-4 border-2 rounded-lg min-h-[120px] text-base"
                      placeholder="Tell others about yourself"
                      defaultValue="Learning languages to connect with the world!"
                    />
                  </div>
                  
                  <Button className="py-6 text-lg font-bold rounded-xl shadow-md w-full md:w-auto">Save Changes</Button>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <Card className="shadow-md border border-primary/10">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Lock className="h-6 w-6 text-primary mr-2" />
                    Password
                  </CardTitle>
                  <CardDescription className="text-base">
                    Update your password to keep your account secure
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-5">
                    <div>
                      <label className="font-medium mb-2 block">Current Password</label>
                      <Input type="password" placeholder="••••••••" className="py-6 text-base border-2" />
                    </div>
                    <div>
                      <label className="font-medium mb-2 block">New Password</label>
                      <Input type="password" placeholder="••••••••" className="py-6 text-base border-2" />
                    </div>
                    <div>
                      <label className="font-medium mb-2 block">Confirm Password</label>
                      <Input type="password" placeholder="••••••••" className="py-6 text-base border-2" />
                    </div>
                  </div>
                  
                  <Button variant="outline" className="py-6 text-lg font-bold rounded-xl border-2 border-gray-200 hover:bg-gray-50 transition-colors w-full md:w-auto">
                    Update Password
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <Card className="shadow-md border border-red-100">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center text-red-500">
                    <LogOut className="h-6 w-6 mr-2" />
                    Logout
                  </CardTitle>
                  <CardDescription className="text-base">
                    Sign out of your account across all devices
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6 text-lg">Sign out of your account across all devices.</p>
                  <Button variant="destructive" className="py-6 px-8 text-lg font-bold rounded-xl shadow-md">Logout</Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="preferences" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <Card className="shadow-md border border-primary/10">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Sun className="h-6 w-6 text-amber-500 mr-2" />
                    Appearance
                  </CardTitle>
                  <CardDescription className="text-base">
                    Customize how the app looks
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="flex justify-between items-center py-3 px-5 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      {theme === "light" ? (
                        <Sun className="h-6 w-6 text-amber-500" />
                      ) : (
                        <Moon className="h-6 w-6 text-indigo-500" />
                      )}
                      <span className="font-medium text-lg">Theme</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-medium">Light</span>
                      <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
                      <span className="font-medium">Dark</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center mb-3">
                      <Globe className="h-6 w-6 text-primary mr-2" />
                      <span className="font-medium text-lg">Interface Language</span>
                    </div>
                    <Select value={interfaceLanguage} onValueChange={setInterfaceLanguage}>
                      <SelectTrigger className="w-full md:w-[300px] py-6 text-base border-2">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
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
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <Card className="shadow-md border border-primary/10">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Volume2 className="h-6 w-6 text-primary mr-2" />
                    Sound
                  </CardTitle>
                  <CardDescription className="text-base">
                    Manage sound settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="flex justify-between items-center py-3 px-5 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Volume2 className="h-6 w-6 text-primary" />
                      <span className="font-medium text-lg">Sound Effects</span>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  
                  <div className="py-3 px-5 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-medium text-lg">Volume</span>
                      <span className="font-bold text-primary px-3 py-1 bg-primary/10 rounded-full">{volume}%</span>
                    </div>
                    <Slider 
                      defaultValue={[volume]} 
                      max={100} 
                      step={1}
                      onValueChange={handleVolumeChange}
                      className="py-2"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <Card className="shadow-md border border-primary/10">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Sliders className="h-6 w-6 text-primary mr-2" />
                    Learning Preferences
                  </CardTitle>
                  <CardDescription className="text-base">
                    Customize your learning experience
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="font-bold text-lg">Daily Goal</h3>
                    <div className="flex flex-wrap items-center gap-3">
                      {[10, 20, 30, 40, 50].map(goal => (
                        <Button 
                          key={goal} 
                          variant={goal === 10 ? "default" : "outline"}
                          size="lg"
                          className={goal === 10 ? "shadow-md text-lg py-6 px-8" : "border-2 text-lg py-6 px-8"}
                        >
                          {goal} XP
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3 bg-gray-50 p-5 rounded-xl">
                    <h3 className="font-bold text-lg mb-3">Exercise Types</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Show Translations</span>
                        <Switch defaultChecked={true} />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Typing Exercises</span>
                        <Switch defaultChecked={false} />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Speaking Exercises</span>
                        <Switch defaultChecked={true} />
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full py-6 text-lg font-bold rounded-xl shadow-md mt-4">Save Preferences</Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <Card className="shadow-md border border-primary/10">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Bell className="h-6 w-6 text-primary mr-2" />
                    Notification Settings
                  </CardTitle>
                  <CardDescription className="text-base">
                    Manage how and when we contact you
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="space-y-5 bg-gray-50 p-5 rounded-xl">
                    <div className="flex justify-between items-center pb-4 border-b">
                      <div>
                        <p className="font-bold text-lg">Daily Reminders</p>
                        <p className="text-gray-600">Remind you to practice each day</p>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                    
                    <div className="flex justify-between items-center pb-4 border-b">
                      <div>
                        <p className="font-bold text-lg">Streak Notifications</p>
                        <p className="text-gray-600">Alerts about maintaining your streak</p>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                    
                    <div className="flex justify-between items-center pb-4 border-b">
                      <div>
                        <p className="font-bold text-lg">Achievement Notifications</p>
                        <p className="text-gray-600">Be notified when you earn achievements</p>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                    
                    <div className="flex justify-between items-center pb-4 border-b">
                      <div>
                        <p className="font-bold text-lg">Weekly Progress Report</p>
                        <p className="text-gray-600">Get a summary of your weekly learning</p>
                      </div>
                      <Switch defaultChecked={false} />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-bold text-lg">New Content</p>
                        <p className="text-gray-600">Updates about new lessons and features</p>
                      </div>
                      <Switch defaultChecked={false} />
                    </div>
                  </div>
                  
                  <Button className="w-full py-6 text-lg font-bold rounded-xl shadow-md">Save Notification Settings</Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="privacy" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <Card className="shadow-md border border-primary/10">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Shield className="h-6 w-6 text-primary mr-2" />
                    Privacy Settings
                  </CardTitle>
                  <CardDescription className="text-base">
                    Manage how your information is handled
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="space-y-5 bg-gray-50 p-5 rounded-xl">
                    <div className="flex justify-between items-center pb-4 border-b">
                      <div>
                        <p className="font-bold text-lg">Public Profile</p>
                        <p className="text-gray-600">Allow others to view your profile</p>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                    
                    <div className="flex justify-between items-center pb-4 border-b">
                      <div>
                        <p className="font-bold text-lg">Appear on Leaderboard</p>
                        <p className="text-gray-600">Show your progress on the leaderboard</p>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                    
                    <div className="flex justify-between items-center pb-4 border-b">
                      <div>
                        <p className="font-bold text-lg">Activity Status</p>
                        <p className="text-gray-600">Show when you're active</p>
                      </div>
                      <Switch defaultChecked={false} />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-bold text-lg">Data Collection</p>
                        <p className="text-gray-600">Help improve the app with usage data</p>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t">
                    <h3 className="font-bold text-xl mb-4">Data Management</h3>
                    <div className="flex flex-wrap gap-4">
                      <Button variant="outline" className="py-6 px-8 text-lg font-bold rounded-xl border-2 border-gray-200 hover:bg-gray-50 transition-colors">
                        Download My Data
                      </Button>
                      <Button variant="destructive" className="py-6 px-8 text-lg font-bold rounded-xl shadow-md">
                        Delete My Account
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </section>
  );
};

export default Settings;