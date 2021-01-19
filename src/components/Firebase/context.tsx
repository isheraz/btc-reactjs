import * as React from 'react';
import Firebase from './firebase';

// Create/Export Firebase Context/Provider
export const FirebaseContext = React.createContext<Firebase | null>(null);
export const FirebaseProvider = FirebaseContext.Provider;
