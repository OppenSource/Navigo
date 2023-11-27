import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Zoom@Tech',
  webDir: 'www',
  plugins:{
    PushNotifications:{
      presentationOptions:["badge", "sound", "alert"]
    }
  },
  server: {
    androidScheme: 'https'
  }
};

export default config;
