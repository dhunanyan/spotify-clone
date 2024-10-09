import axios from 'axios';

import { SavedAlbumsResponseType } from '@config';
import { parseToSavedAlbums } from '@utils';
import { SavedAlbumModel } from '@models';

import { getSessionToken } from './getSessionToken';
import { fileSystemMiddleware } from './fileSystemMiddleware';

const fetchSavedAlbums = async (
  offset: number = 0,
  numberOfCalls: number = 0
): Promise<SavedAlbumModel[]> => {
  try {
    const maxAllowedLimit = 50;
    const token = await getSessionToken();

    const response = (await axios.get('https://api.spotify.com/v1/me/albums', {
      params: {
        limit: maxAllowedLimit,
        offset: offset,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })) as { data: SavedAlbumsResponseType };

    const { total } = response.data;
    const numberOfMaxCalls = Math.ceil(total / maxAllowedLimit) - 1;
    const result = parseToSavedAlbums(response.data.items);
    if (total / maxAllowedLimit <= 1 || numberOfCalls >= numberOfMaxCalls) {
      return result;
    }

    numberOfCalls++;
    offset += maxAllowedLimit;
    const next = await fetchSavedAlbums(offset, numberOfCalls);

    return [...result, ...next];
  } catch (error) {
    console.error(
      `Error fetching saved albums of currently logged in user`,
      error
    );
    throw error;
  }
};

export const getSavedAlbums = async () =>
  await fileSystemMiddleware<SavedAlbumModel[]>(
    'user_saved_albums',
    fetchSavedAlbums
  );
