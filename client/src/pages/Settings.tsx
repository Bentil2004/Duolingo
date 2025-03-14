import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { languages } from "@/data/languages";
import { Bell, Volume2, Moon, Sun, Globe, User, Lock, LogOut } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

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
    <section className="py-8 px-4 container mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>
        
        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Manage your profile details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Display Name</label>
                  <Input type="text" placeholder="Your Name" defaultValue="Language Learner" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Email</label>
                  <Input type="email" placeholder="Your Email" defaultValue="user@example.com" />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Bio</label>
                <textarea 
                  className="w-full p-2 border rounded-md min-h-[100px]"
                  placeholder="Tell others about yourself"
                  defaultValue="Learning languages to connect with the world!"
                />
              </div>
              
              <Button className="w-full md:w-auto">Save Changes</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="h-5 w-5 mr-2" />
                Password
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Current Password</label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">New Password</label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Confirm Password</label>
                  <Input type="password" placeholder="••••••••" />
                </div>
              </div>
              
              <Button variant="outline">Update Password</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-red-500 flex items-center">
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Sign out of your account across all devices.</p>
              <Button variant="destructive">Logout</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize how the app looks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  {theme === "light" ? (
                    <Sun className="h-5 w-5 text-orange-400" />
                  ) : (
                    <Moon className="h-5 w-5 text-indigo-400" />
                  )}
                  <span>Theme</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">Light</span>
                  <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
                  <span className="text-sm">Dark</span>
                </div>
              </div>
              
              <div>
                <div className="flex items-center mb-2">
                  <Globe className="h-5 w-5 mr-2" />
                  <span>Interface Language</span>
                </div>
                <Select value={interfaceLanguage} onValueChange={setInterfaceLanguage}>
                  <SelectTrigger className="w-full md:w-[250px]">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map(lang => (
                      <SelectItem key={lang.id} value={lang.id}>
                        <div className="flex items-center">
                          <img 
                            src={lang.flag} 
                            alt={lang.name} 
                            className="w-4 h-4 rounded-full mr-2" 
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
          
          <Card>
            <CardHeader>
              <CardTitle>Sound</CardTitle>
              <CardDescription>
                Manage sound settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-2">
                  <Volume2 className="h-5 w-5" />
                  <span>Sound Effects</span>
                </div>
                <Switch defaultChecked={true} />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span>Volume</span>
                  <span className="text-sm">{volume}%</span>
                </div>
                <Slider 
                  defaultValue={[volume]} 
                  max={100} 
                  step={1}
                  onValueChange={handleVolumeChange}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Learning Preferences</CardTitle>
              <CardDescription>
                Customize your learning experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Daily Goal</label>
                <div className="flex items-center space-x-2">
                  {[10, 20, 30, 40, 50].map(goal => (
                    <Button 
                      key={goal} 
                      variant={goal === 10 ? "default" : "outline"}
                      size="sm"
                    >
                      {goal} XP
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Show Translations</span>
                  <Switch defaultChecked={true} />
                </div>
                <div className="flex justify-between items-center">
                  <span>Typing Exercises</span>
                  <Switch defaultChecked={false} />
                </div>
                <div className="flex justify-between items-center">
                  <span>Speaking Exercises</span>
                  <Switch defaultChecked={true} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Notification Settings
              </CardTitle>
              <CardDescription>
                Manage how and when we contact you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Daily Reminders</p>
                    <p className="text-sm text-gray-500">Remind you to practice each day</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Streak Notifications</p>
                    <p className="text-sm text-gray-500">Alerts about maintaining your streak</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Achievement Notifications</p>
                    <p className="text-sm text-gray-500">Be notified when you earn achievements</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Weekly Progress Report</p>
                    <p className="text-sm text-gray-500">Get a summary of your weekly learning</p>
                  </div>
                  <Switch defaultChecked={false} />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">New Content</p>
                    <p className="text-sm text-gray-500">Updates about new lessons and features</p>
                  </div>
                  <Switch defaultChecked={false} />
                </div>
              </div>
              
              <Button className="w-full md:w-auto">Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="privacy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>
                Manage how your information is handled
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Public Profile</p>
                    <p className="text-sm text-gray-500">Allow others to view your profile</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Appear on Leaderboard</p>
                    <p className="text-sm text-gray-500">Show your progress on the leaderboard</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Activity Status</p>
                    <p className="text-sm text-gray-500">Show when you're active</p>
                  </div>
                  <Switch defaultChecked={false} />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Data Collection</p>
                    <p className="text-sm text-gray-500">Help improve the app with usage data</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="font-medium mb-2">Data Management</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full md:w-auto">Download My Data</Button>
                  <Button variant="destructive" className="w-full md:w-auto">Delete My Account</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Settings;