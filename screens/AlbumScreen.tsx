import * as React from "react";

import { Album } from "@components";

import { checkSavedTracks, getAlbum, getArtist } from "@api";
import { AlbumModel } from "@models";
import { ALBUM_ID } from "@data";
import { ArtistModel } from "../models/ArtistModel";

export const AlbumScreen = () => {
  const [albumData, setAlbumData] = React.useState<AlbumModel | null>(null);
  const [artistsData, setArtistsData] = React.useState<ArtistModel[] | null>(
    null
  );
  const [isAlbumSaved, setIsAlbumSaved] = React.useState<boolean | null>(null);
  const [savedTracks, setSavedTracks] = React.useState<boolean[] | null>(null);

  React.useEffect(() => {
    (async () => {
      try {
        const album = await getAlbum(ALBUM_ID);
        setAlbumData(album);

        const artists = await Promise.all(
          album.artists.map(async ({ id }) => await getArtist(id))
        );
        setArtistsData(artists);

        // TODO: get user-library-read access trough oAuth
        // const savedAlbums = await checkSavedAlbums([ALBUM_ID]);
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
  }, []);

  if (
    albumData === null ||
    artistsData === null ||
    isAlbumSaved === null ||
    savedTracks === null
  ) {
    return null;
  }

  return (
    <Album
      album={albumData}
      artists={artistsData}
      isAlbumSaved={isAlbumSaved}
      savedTracks={savedTracks}
    />
  );
};
