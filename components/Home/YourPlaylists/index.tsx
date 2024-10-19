import * as React from 'react';

import { getSavedPlaylists } from '@api';
import { LibraryItemModel } from '@models';
import { useUserData } from '@context';
import { Shapes, Sizes } from '@config';
import { translations } from '@data';

import { Slider } from '../../Slider';

export const YourPlaylists = () => {
  const [savedPlaylists, setDataSavedPlaylists] = React.useState<
    LibraryItemModel[] | null
  >(null);
  const { userData } = useUserData();

  React.useEffect(() => {
    (async () => {
      try {
        const savedPlaylistsData = await getSavedPlaylists();
        setDataSavedPlaylists(savedPlaylistsData);
      } catch (error) {
        setDataSavedPlaylists(null);
        console.error(error);
      }
    })();
  }, []);

  const userPlaylists = React.useMemo(
    () =>
      savedPlaylists && userData
        ? savedPlaylists.filter(
            (savedPlaylist) => savedPlaylist.ownerId === userData.id
          )
        : null,
    [userData, savedPlaylists]
  );

  // TODO: get rid of this
  if (!userPlaylists) {
    return;
  }

  return (
    <Slider
      title={translations.yourPlaylist}
      slides={userPlaylists}
      size={Sizes.MEDIUM}
      shape={Shapes.SQUARE_BORDER}
      withShowAll={true}
    />
  );
};
