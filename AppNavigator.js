import React,{useState, useEffect} from "react";
import { Image} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/Ionicons';
import hamillLogo from "./images/HamillLogoHeader.png";

import KakaoLogin from './components/loginpage/KakaoLigin';
import HomePage from "./pages/HomePage";
import DailyPage from "./pages/DailyPage";
import LoginPage from "./pages/LoginPage";
import WeatherPage from "./pages/WeatherPage";
import MyPage from "./pages/MyPage";
import Splash from "./Splash";
import NaverLogin from "./components/loginpage/NaverLogin";
import WriteScreen from './pages/WriteScreen';
import MyInfoPage from "./components/mypage/MyInfoPage";
import AppInfoPage from "./components/mypage/AppInfoPage";
import EditEvent from "./components/dailypage/EditEvent";

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
    // AsyncStorage에서 userId 가져오기
    const checkLoginStatus = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (userId !== null) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('로그인 상태 확인 에러:', error);
        setIsLoggedIn(false); // 에러 발생 시 로그아웃 처리
      }
    };

    setTimeout(() => {
      checkLoginStatus();
    }, 4000);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerTitle: (props) => <LogoTitle />,
          headerTitleAlign: "left",
          headerBackVisible: false,
        }}
        initialRouteName={isLoggedIn ? "HomePage" : "Splash"}
      >
        {isLoggedIn === null ? (
          <>
            <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
            <Stack.Screen name="LoginPage" component={LoginPage} options={{ headerLeft: null, headerShown: false }} />
            <Stack.Screen name="KakaoLogin" component={KakaoLogin} options={{ headerLeft: null, headerShown: false }} />
            <Stack.Screen name="NaverLogin" component={NaverLogin} options={{ headerLeft: null, headerShown: false }} />
            <Stack.Screen name="HomePage" component={MainTabNavigator} options={{ headerLeft: null, headerStyle: { backgroundColor: '#ECEFF5' } }} />
            <Stack.Screen name="MyInfoPage" component={MyInfoPage} options={{ headerShown: false }} />
            <Stack.Screen name="AppInfoPage" component={AppInfoPage} options={{ headerShown: false }} />
            <Stack.Screen name="EditEvent" component={EditEvent} options={{ headerShown: false }} />
          </>
          
        ) : isLoggedIn ? (
          <>
            <Stack.Screen name="HomePage" component={MainTabNavigator} options={{ headerLeft: null, headerStyle: { backgroundColor: '#ECEFF5' } }} />
            <Stack.Screen name="Write" component={WriteScreen} options={{ headerShown: false }} />
            <Stack.Screen name="LoginPage" component={LoginPage} options={{ headerLeft: null, headerShown: false }} />
            <Stack.Screen name="KakaoLogin" component={KakaoLogin} options={{ headerLeft: null, headerShown: false }} />
            <Stack.Screen name="NaverLogin" component={NaverLogin} options={{ headerLeft: null, headerShown: false }} />
            <Stack.Screen name="MyInfoPage" component={MyInfoPage} options={{ headerShown: false }} />
            <Stack.Screen name="AppInfoPage" component={AppInfoPage} options={{ headerShown: false }} />
            <Stack.Screen name="EditEvent" component={EditEvent} options={{ headerShown: false }} />
          
          </>
        ) : (
          <>
            <Stack.Screen name="LoginPage" component={LoginPage} options={{ headerLeft: null, headerShown: false }} />
            <Stack.Screen name="KakaoLogin" component={KakaoLogin} options={{ headerLeft: null, headerShown: false }} />
            <Stack.Screen name="NaverLogin" component={NaverLogin} options={{ headerLeft: null, headerShown: false }} />
            <Stack.Screen name="Write" component={WriteScreen} options={{ headerShown: false }} />
            <Stack.Screen name="HomePage" component={MainTabNavigator} options={{ headerLeft: null, headerStyle: { backgroundColor: '#ECEFF5' } }} />
            <Stack.Screen name="MyInfoPage" component={MyInfoPage} options={{ headerShown: false }} />
            <Stack.Screen name="AppInfoPage" component={AppInfoPage} options={{ headerShown: false }} />
            <Stack.Screen name="EditEvent" component={EditEvent} options={{ headerShown: false }} />
         
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;