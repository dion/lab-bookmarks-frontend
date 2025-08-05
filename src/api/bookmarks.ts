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
  if (!session.tokens?.idToken) {
    throw console.error("User is not authenticated");
  }
  const token = session.tokens.idToken.toString();

  if (!token) throw new Error('No ID token found');

  try {
    const response = await fetch('https://370jjpg9ni.execute-api.us-east-1.amazonaws.com/prod/bookmarks', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    throw error;
  } 
}

export async function createBookmark(bookmark: NewBookmark): Promise<Bookmark> {
  const session = await fetchAuthSession();
  if (!session.tokens?.idToken) {
    console.warn("User is not authenticated");
    throw console.error("User is not authenticated"); 
  }
  const token = session.tokens.idToken.toString();
  
  if (!token) throw new Error('No ID token found');

  try {
    const response = await fetch('https://370jjpg9ni.execute-api.us-east-1.amazonaws.com/prod/bookmarks', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify(bookmark),
    }); 

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error creating bookmark:', error);
    throw error;
  }
}
