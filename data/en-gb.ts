export const EN_GB = {
  header: {
    home: 'Home',
    search: 'Search',
    library: 'Your Library',
  },
  router: {
    home: 'Home',
    search: 'Search',
    library: 'Your Library',
  },
  libraryCategories: {
    album: 'Albums',
    artist: 'Artists',
    downloaded: 'Downloaded',
    playlist: 'Playlists',
    show: 'Podcasts',
  },
  type: {
    album: 'Album',
    albums: 'Albums',
    artist: 'Artist',
    artists: 'Artists',
    compilation: 'Compilation',
    playlist: 'Playlist',
    playlists: 'Playlists',
    podcast: 'Podcast',
    podcasts: 'Podcasts',
    single: 'Single',
    singles: 'Singles',
  },
  moreOf: 'More of: ',
  updated: 'Updated: ',
  released: 'Released: ',
  showAll: 'Show all',
  tracks: 'tracks',
  saves: 'saves',
  yourPlaylist: 'Your Playlists',
  madeForYou: 'Made For You',
  yourTopArtists: (key: number | string) => `Your Recent Top ${key} Artists`,
  yourTopAlbums: (key: number | string) => `Your Recent Top ${key} Albums`,
  basedOnYourTopArtists: 'Based on your Top Artists',
  basedOnYourTopGenres: 'Based on your Top Genres',
  basedOnYourTopTracks: 'Based on your Top Tracks',
  afterListening: (key: string) => `After listening ${key}`,
  recommendations: 'Recommendations',
  loginWelcome: 'Millions of Songs. \n Free on Spotify.',
  loginButton: 'Sign in',
  loginNote: "NOTE: You won't be sharing your credentials",
};
