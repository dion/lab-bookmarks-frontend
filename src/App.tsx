import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';
import '@aws-amplify/ui-react/styles.css';

import { getBookmarks, createBookmark, type Bookmark, type NewBookmark } from './api/bookmarks';

Amplify.configure(outputs);

function App() {
  // const [count, setCount] = useState(0)
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    getBookmarks().then(setBookmarks).catch(console.error);
  }, []);

   const handleAdd = async () => {
    const newBookmark: NewBookmark = {
      title: 'My Site',
      url: 'https://mysite.com',
    };

    const result = await createBookmark(newBookmark);
    setBookmarks([...bookmarks, result]);
  };

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user?.username}</h1>
          <button onClick={signOut}>Sign out</button>
          <div>
            <a href="https://vite.dev" target="_blank">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          {/* <h1>Vite + React</h1>
          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
            <p>
              Edit <code>src/App.tsx</code> and save to test HMR
            </p>
          </div>
          <p className="read-the-docs">
            Click on the Vite and React logos to learn more
          </p> */}
          <div>
            <h1>Bookmarks</h1>
            {bookmarks.length > 0 && (
              <ul>
                {bookmarks.map((b) => (
                  <li key={b.id}>{b.title} - {b.url}</li>
                ))}
              </ul>
            )}
            <button onClick={handleAdd}>Add Bookmark</button>
          </div>
        </main>
      )}
    </Authenticator>
  )
}

export default App
