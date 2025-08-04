// const API_BASE_URL = import.meta.env.VITE_API_URL as string;
import { fetchAuthSession } from '@aws-amplify/auth';

export interface Bookmark {
  id: string;
  title: string;
  url: string;
}

export type NewBookmark = Omit<Bookmark, 'id'>;

export async function getBookmarks(): Promise<Bookmark[]> {
  const session = await fetchAuthSession();
  const token = session.tokens?.idToken?.toString();

  if (!token) throw new Error('No ID token found');

  const response = await fetch('/api/bookmarks', {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return response.json();
}

export async function createBookmark(bookmark: NewBookmark): Promise<Bookmark> {
  const session = await fetchAuthSession();
  const token = session.tokens?.idToken?.toString();
  
  if (!token) throw new Error('No ID token found');

  const response = await fetch('/api/bookmarks', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json', 
      Authorization: `Bearer ${token}` 
    },
    body: JSON.stringify(bookmark),
  });

  return response.json();
}
