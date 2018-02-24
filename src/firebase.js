import { initializeApp } from 'firebase'

var app = initializeApp({
  apiKey: 'AIzaSyAJD96-JNcjlnwhngJjK90u8vW3AMmQZTs',
  authDomain: 'ariefmanda-195202.firebaseapp.com',
  databaseURL: 'https://ariefmanda-195202.firebaseio.com',
  projectId: 'ariefmanda-195202',
  storageBucket: 'ariefmanda-195202.appspot.com',
  messagingSenderId: '807187906136'
})

export const db = app.database()
export const kanban = db.ref('kanban')
