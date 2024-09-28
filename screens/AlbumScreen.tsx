import * as React from "react";

import { Album } from "@components";

import { checkSavedTracks, getAlbum, getArtist, getArtistAlbums } from "@api";
import { AlbumModel, ArtistAlbumModel } from "@models";
import { FALLBACK_ALBUM_ID } from "@data";
import { ArtistModel } from "../models/Album/ArtistModel";
import { parseToArtist, parseToArtistAlbums } from "@utils";

export type AlbumScreenPropsType = {
  albumId: string;
};

export const AlbumScreen = ({
  albumId = FALLBACK_ALBUM_ID,
}: AlbumScreenPropsType) => {
  const [albumData, setAlbumData] = React.useState<AlbumModel | null>(null);
  const [artistsData, setArtistsData] = React.useState<ArtistModel[] | null>(
    null
  );
  const [artistsAlbumsData, setArtistsAlbums] = React.useState<
    | {
        artist: string;
        albums: ArtistAlbumModel[];
      }[]
    | null
  >(null);
  const [isAlbumSaved, setIsAlbumSaved] = React.useState<boolean | null>(null);
  const [savedTracks, setSavedTracks] = React.useState<boolean[] | null>(null);

  React.useEffect(() => {
    (async () => {
      try {
        const album = await getAlbum(albumId);
        setAlbumData(album);

        const artists = await Promise.all(
          album.artists.map(async ({ id }) =>
            parseToArtist(await getArtist(id))
          )
        );
        setArtistsData(artists);

        const artistAlbums = (
          await Promise.all(
            artists.map(async ({ id }) =>
              parseToArtistAlbums(await getArtistAlbums(id, "album"))
            )
          )
        ).map((albums, i) => ({ artist: artists[i].name, albums: albums }));
        setArtistsAlbums(artistAlbums);

        // TODO: get user-library-read access trough oAuth
        // const savedAlbums = await checkSavedAlbums([FALLBACK_ALBUM_ID]);
        const savedAlbums = [true];
        setIsAlbumSaved(savedAlbums[0]);

        const tracks = album.tracks.items;

        if (savedAlbums[0]) {
          setSavedTracks([...Array(tracks.length).fill(true)]);
          return;
        }

        const trackIdsArr = tracks.map((track) => track.id);
        const savedTracksArr = await checkSavedTracks(trackIdsArr);

        setSavedTracks(savedTracksArr);
      } catch (error) {
        setAlbumData(null);
        setIsAlbumSaved(null);
        setSavedTracks(null);
        console.error("Failed to get album data:", error);
      }
    })();
  }, [albumId]);

  if (
    albumData === null ||
    artistsData === null ||
    artistsAlbumsData === null ||
    isAlbumSaved === null ||
    savedTracks === null
  ) {
    return null;
  }

  return (
    <Album
      album={albumData}
      artists={artistsData}
      artistsAlbumsData={artistsAlbumsData}
      isAlbumSaved={isAlbumSaved}
      savedTracks={savedTracks}
    />
  );
};
