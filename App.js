import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Onboarding1 from './screens/Onboarding1';
import Onboarding2 from './screens/Onboarding2';
import SplashScreen from './screens/SplashScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Profile from './screens/Profile';
import Home from './screens/Home';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);

  // ========================= Code to test ==================================
  // const [firstLaunch, setFirstLaunch] = useState(null);
  // useEffect(() => {
  //   async function setData() {
  //     const appData = await AsyncStorage.getItem('appLaunched');
  //     if (appData == null) {
  //       setFirstLaunch(true);
  //       AsyncStorage.setItem('appLaunched', 'false');
  //     } else {
  //       setFirstLaunch(false);
  //     }
  //     setIsLoading(false);
  //   }
  //   setData();
  // }, []);
  // ========================================================================

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const userProfileData = await AsyncStorage.getItem('userProfileData');
        if (userProfileData !== null) {
          setIsOnboardingCompleted(true);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch data', error);
        setIsLoading(false);
      }
    };

    checkOnboardingStatus();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  //   return (
  //     firstLaunch != null && (
  //       <NavigationContainer>
  //         <Stack.Navigator>
  //           {!isOnboardingCompleted && (
  //             <>
  //               <Stack.Screen name="Welcome" component={Onboarding1} />
  //               <Stack.Screen name="Sign up" component={Onboarding2} />
  //             </>
  //           )}
  //           <Stack.Screen name="Profile" component={Profile} />
  //           <Stack.Screen name="Home" component={Home} />
  //         </Stack.Navigator>
  //       </NavigationContainer>
  //     )
  //   );
  // }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isOnboardingCompleted ? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Profile" component={Profile} />
          </>
        ) : (
          <>
            <Stack.Screen name="Welcome" component={Onboarding1} />
            <Stack.Screen name="Sign up" component={Onboarding2} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Home" component={Home} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// import React, { useState, useEffect } from 'react';
// // import 'react-native-gesture-handler';
// // import 'react-native-screens';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { NavigationContainer } from '@react-navigation/native';
// import Onboarding1 from './screens/Onboarding1';
// import Onboarding2 from './screens/Onboarding2';
// import SplashScreen from './screens/SplashScreen';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Profile from './screens/Profile';
// import Home from './screens/Home';

// const Stack = createNativeStackNavigator();

// export default function App() {

//   const [isLoading, setIsLoading] = useState(true);
//   const [firstLaunch, setFirstLaunch] = useState(null);
//   useEffect(() => {
//     async function setData() {
//       const appData = await AsyncStorage.getItem('appLaunched');
//       if (appData == null) {
//         setFirstLaunch(true);
//         AsyncStorage.setItem('appLaunched', 'false');
//       } else {
//         setFirstLaunch(false);
//       }
//       setIsLoading(false);
//     }
//     setData();
//   }, []);

//   if (isLoading) {
//     return <SplashScreen />;
//   }

//   return (
//     firstLaunch != null && (
//       <NavigationContainer>
//         <Stack.Navigator>
//           {firstLaunch && (
//             <>
//               <Stack.Screen name="Welcome" component={Onboarding1} />
//               <Stack.Screen name="Sign up" component={Onboarding2} />
//             </>
//           )}
//          <Stack.Screen name="Profile" component={Profile} />
//           <Stack.Screen name="Home" component={Home} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     )
//   );
// }
