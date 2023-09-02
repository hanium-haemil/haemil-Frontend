import React,{useState, useEffect} from "react";
import { Image} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/Ionicons';
import hamillLogo from "./images/HamillLogoHeader.png";

import KakaoLogin from './components/KakaoLigin';
import HomePage from "./pages/HomePage";
import DailyPage from "./pages/DailyPage";
import LoginPage from "./pages/LoginPage";
import WeatherPage from "./pages/WeatherPage";
import MyPage from "./pages/MyPage";
import Splash from "./Splash";
import NaverLogin from "./components/NaverLogin";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function LogoTitle() {
  return (
    <Image
      source={hamillLogo}
      style={{ width: 80, height: 30, resizeMode: "contain" }}
    />
  );
}

const MainTabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomePage}
      options={{
        tabBarLabel: "메인화면",
        tabBarIcon: () => (
          <Icon name="home-outline" size={20} />
        ),
      }}
    />
    <Tab.Screen
      name="WeatherPage"
      component={WeatherPage}
      options={{
        tabBarLabel: "날씨",
        tabBarIcon: () => (
          <Icon name="cloud-outline" size={20} />
        ),
      }}
    />
    <Tab.Screen
      name="Daily"
      component={DailyPage}
      options={{
        tabBarLabel: "일정화면",
        tabBarIcon: () => (
          <Icon name="today-outline" size={20} />
        ),
      }}
    />
    
    <Tab.Screen
      name="MyPage"
      component={MyPage}
      options={{
        tabBarLabel: "내정보",
        tabBarIcon: () => (
          <Icon name="person-outline" size={20} />
        ),
      }}
    />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setIsLoggedIn(false); // 유저 정보가 있으면 true, 없으면 false
    }, 3000);
  }, []);

  if (isLoggedIn === null) {
    return <Splash />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerTitle: (props) => <LogoTitle />,
          headerTitleAlign: "center",
          headerBackVisible : false,
        }}
          
        initialRouteName={isLoggedIn ? "HomePage" : "LoginPage"}
      >

      {isLoggedIn ? (
          <>
            <Stack.Screen name="HomePage" component={MainTabNavigator} options={{headerLeft : null , headerStyle: { backgroundColor: '#ECEFF5'}}}/>
          </>
        ) : (
          <>
            <Stack.Screen name="LoginPage" component={LoginPage} options={{headerLeft : null, headerShown : false}}/>
            <Stack.Screen name="KakaoLogin" component={KakaoLogin} options={{headerLeft : null, headerShown : false}}/>
            <Stack.Screen name="NaverLogin" component={NaverLogin} options={{headerLeft : null, headerShown : false}}/>
            <Stack.Screen name="HomePage" component={MainTabNavigator} options={{headerLeft : null , headerStyle: { backgroundColor: '#ECEFF5'}}}/>
          </>
      )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;