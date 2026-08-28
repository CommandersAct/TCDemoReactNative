/**
 * Bootstraps the CommandersAct SDKs once for the whole app. initSdk() does
 * the actual work — two plain, sequential init calls. TCServerSide must be
 * initialised before TCConsent (TCConsent's init reads ServerSide's state).
 * Screens read readiness via useCommandersActSDKInit() instead of calling
 * the SDKs' init functions directly.
 */
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { TCDebugInstance } from '@commandersact/tccore-react-native';
import * as TCConsent from '@commandersact/tcconsent-react-native';
import * as TCServerSide from '@commandersact/tcserverside-react-native';
import { TCStatsLog } from '../native/TCStatsLog';

export const SITE_ID = 1111;
export const PRIVACY_ID = 2222;
export const SOURCE_KEY = 'a_source_key';

async function initSdk(onServerSideReady: () => void, onConsentReady: () => void) {
  TCDebugInstance.enableNativeDebug(); // very important for logs to appear on Xcode Console / Android studio LogCat
  TCStatsLog.start(); // native logs listener

  try {
    await TCServerSide.initServerSide(SITE_ID, SOURCE_KEY);
    TCDebugInstance.enableNativeDebug(); // initServerSide resets logging to Info; restore verbose logging.
    onServerSideReady();
  } catch (error) {
    console.warn('TCServerSide.initServerSide failed', error);
  }

  try {
    await TCConsent.setSiteIDPrivacyID(SITE_ID, PRIVACY_ID);
    onConsentReady();
  } catch (error) {
    console.warn('TCConsent.setSiteIDPrivacyID failed', error);
  }
}

type CommandersActSDKInitState = {
  serverSideReady: boolean;
  consentReady: boolean;
};

const CommandersActSDKInitContext = createContext<CommandersActSDKInitState>({
  serverSideReady: false,
  consentReady: false,
});

export function CommandersActInitProvider({ children }: { children: ReactNode }) {
  const [serverSideReady, setServerSideReady] = useState(false);
  const [consentReady, setConsentReady] = useState(false);

  useEffect(() => {
    initSdk(
      () => setServerSideReady(true),
      () => setConsentReady(true)
    );
  }, []);

  return (
    <CommandersActSDKInitContext.Provider value={{ serverSideReady, consentReady }}>
      {children}
    </CommandersActSDKInitContext.Provider>
  );
}

export function useCommandersActSDKInit(): CommandersActSDKInitState {
  return useContext(CommandersActSDKInitContext);
}
