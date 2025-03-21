import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import LanguageSelection from "@/pages/LanguageSelection";
import LessonsOverview from "@/pages/LessonsOverview";
import LessonExercise from "@/pages/LessonExercise";
import LessonCompletion from "@/pages/LessonCompletion";
import Profile from "@/pages/Profile";
import Leaderboard from "@/pages/Leaderboard";
import Settings from "@/pages/Settings";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileNavigation from "@/components/MobileNavigation";
import { LanguageProvider } from "@/context/LanguageContext";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LanguageSelection} />
      <Route path="/lessons/:language" component={LessonsOverview} />
      <Route path="/lesson/:language/:lessonId" component={LessonExercise} />
      <Route path="/completion/:language/:lessonId" component={LessonCompletion} />
      <Route path="/profile" component={Profile} />
      <Route path="/leaderboard" component={Leaderboard} />
      <Route path="/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <div className="flex-grow">
            <Router />
          </div>
          <Footer />
          <MobileNavigation />
        </div>
        <Toaster />
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
