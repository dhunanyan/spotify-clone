import { ALBUM_ARTIST_IMAGE_SIZE_VARIANT, ArtistResponseType } from '@config';
import { ArtistModel } from '@models';

export const parseToArtist = (data: ArtistResponseType): ArtistModel => ({
  type: data.type,
  id: data.id,
  followers: data.followers,
  genres: data.genres,
  imageURL: data.images[ALBUM_ARTIST_IMAGE_SIZE_VARIANT].url,
  name: data.name,
  popularity: 85,
});
