import Sidebar from './Sidebar';
import { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import { useSession } from 'next-auth/react';
import Player from './Player';
import { playingTrackState } from '../atoms/playerAtom';
import { useRecoilState } from 'recoil';
import Body from './Body';
import Right from './Right';
import RecentPage from './RecentPage';
import LikedSongsPage from './LikedSongsPage';
import AlbumsPage from './AlbumsPage';
import PlaylistsPage from './PlaylistsPage';
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
});

function Dashboard() {
  const { data: session } = useSession();
  const { accessToken } = session;

  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);
  const [showPlayer, setShowPlayer] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [likedSongs, setLikedSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  useEffect(() => {
    setShowPlayer(true);
  }, []);

  const chooseTrack = (track) => {
    setPlayingTrack(track);
  };

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.getMySavedTracks({ limit: 50 }).then((res) => {
      setLikedSongs(
        res.body.items.map((item) => {
          return {
            title: item.track.name,
            artist: item.track.artists[0].name,
            albumUrl: item.track.album.images[0].url,
            uri: item.track.uri,
          };
        })
      );
    });
  }, [accessToken]);
  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.getFeaturedPlaylists({ limit: 20 }).then((res) => {
      setAlbums(
        res.body.playlists.items.map((item) => {
          return {
            title: item.name,
            albumUrl: item.images[0].url,
            uri: item.uri,
          };
        })
      );
    });
  }, [accessToken]);
  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.getUserPlaylists(session.user.id).then((res) => {
      console.log('----', res);

      setPlaylists(
        res.body.items.map((item) => {
          return {
            title: item.name,
            albumUrl: item?.images[0]?.url || '',
            uri: item.uri,
          };
        })
      );
    });
  }, [accessToken]);
  function setPage(pageName) {
    console.log(pageName);
    setCurrentPage(pageName);
  }
  function pageSetter() {
    switch (currentPage) {
      case 'home':
        return <Body chooseTrack={chooseTrack} spotifyApi={spotifyApi} />;
      case 'recent':
        return <RecentPage chooseTrack={chooseTrack} spotifyApi={spotifyApi} />;
      case 'liked':
        return <LikedSongsPage songs={likedSongs} chooseTrack={chooseTrack} />;
      case 'albums':
        return <AlbumsPage albums={albums} chooseTrack={chooseTrack} />;
      case 'playlists':
        return (
          <PlaylistsPage playlists={playlists} chooseTrack={chooseTrack} />
        );
      default:
        return <Body chooseTrack={chooseTrack} spotifyApi={spotifyApi} />;
    }
  }
  return (
    <main className="flex min-h-screen min-w-max bg-black lg:pb-24">
      <Sidebar setPage={setPage} />
      {currentPage && pageSetter()}
      {/* <Body chooseTrack={chooseTrack} spotifyApi={spotifyApi} /> */}
      {/* <Right chooseTrack={chooseTrack} spotifyApi={spotifyApi} /> */}

      {showPlayer && (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <Player accessToken={accessToken} trackUri={playingTrack.uri} />
        </div>
      )}
    </main>
  );
}

export default Dashboard;
