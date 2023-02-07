// Import the functions you need from the SDKs you need
import { getApps, getApp, initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// for development
import firebaseConfig from '../firebaseConfig'

// Your web app's Firebase configuration

// Initialize Firebase
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
export const storage = getStorage(app)
