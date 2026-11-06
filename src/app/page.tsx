'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// Use dynamic import with ssr: false for App to avoid any hydration mismatch with client-side state
const App = dynamic(() => import('../App'), { ssr: false });

export default function Home() {
  return <App />;
}

