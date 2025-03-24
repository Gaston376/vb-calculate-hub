
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.gsstec.calculator',
  appName: 'GSS-TEC Calculator',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#1A1D1F",
      showSpinner: true,
      spinnerColor: "#8B5CF6",
      androidSplashResourceName: "splash"
    }
  },
  android: {
    buildOptions: {
      keystorePath: null,
      keystorePassword: null,
      keystoreAlias: null,
      keystoreAliasPassword: null,
    }
  }
};

export default config;
