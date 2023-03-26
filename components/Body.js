import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Poster from './Poster';
import Search from './Search';
import Track from './Track';
import { ViewGridIcon } from '@heroicons/react/solid';
import RecentlyPlayed from './RecentlyPlayed';
import Dropdown from './Dropdown';
function Body({ chooseTrack, spotifyApi }) {
  const { data: session } = useSession();
  const { accessToken } = session;
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  // Searching...
  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;

    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          return {
            id: track.id,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.album.images[0].url,
            popularity: track.popularity,
          };
        })
      );
    });

    return () => (cancel = true);
  }, [search, accessToken]);

  // Recently Played Tracks...
  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.getMyRecentlyPlayedTracks({ limit: 20 }).then((res) => {
      console.log(res);
      setRecentlyPlayed(
        res.body.items.map(({ track }) => {
          return {
            id: track.id,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.album.images[0].url,
          };
        })
      );
    });
  }, [accessToken]);
  // New Releases...
  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.getNewReleases().then((res) => {
      setNewReleases(
        res.body.albums.items.map((track) => {
          return {
            id: track.id,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.images[0].url,
          };
        })
      );
    });
  }, [accessToken]);

  return (
    <section className="bg-black ml-24 py-4 space-y-8 flex-grow md:mr-2.5">
      <div className="flex">
        <Search search={search} setSearch={setSearch} />
        <Dropdown />
      </div>
      <div className="grid overflow-y-scroll scrollbar-hide h-96 py-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 p-4">
        {searchResults.length === 0
          ? newReleases
              .slice(0, 4)
              .map((track) => (
                <Poster
                  key={track.id}
                  track={track}
                  chooseTrack={chooseTrack}
                />
              ))
          : searchResults
              .slice(0, 4)
              .map((track) => (
                <Poster
                  key={track.id}
                  track={track}
                  chooseTrack={chooseTrack}
                />
              ))}
      </div>

      <div className="flex gap-x-8 absolute min-w-full md:relative ml-6">
        {/* Tracks */}
        <div style={{ width: '100%' }}>
          <h2 className="text-white font-bold mb-3">
            {searchResults.length === 0 ? 'New Releases' : 'Tracks'}
          </h2>
          <div className="flex recent">
            <div
              style={{ width: '60%', marginRight: '1rem' }}
              className="space-y-3 border-2 border-[#262626] rounded-2xl p-3 bg-[#0D0D0D] overflow-y-scroll h-[1000px] md:h-96 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-rounded hover:scrollbar-thumb-gray-500 w-[830px]"
            >
              {searchResults.length === 0
                ? newReleases
                    .slice(4, newReleases.length)
                    .map((track) => (
                      <Track
                        key={track.id}
                        track={track}
                        chooseTrack={chooseTrack}
                      />
                    ))
                : searchResults
                    .slice(4, searchResults.length)
                    .map((track) => (
                      <Track
                        key={track.id}
                        track={track}
                        chooseTrack={chooseTrack}
                      />
                    ))}
            </div>
            <div
              style={{ width: '40%', marginRight: '1rem' }}
              className="bg-[#0D0D0D] border-2 border-[#262626] p-4 rounded-xl space-y-4 recent-div"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-white font-semibold text-sm">
                  Recently Played
                </h4>
                <ViewGridIcon className="text-[#686868] h-6" />
              </div>

              <div className="space-y-4 overflow-y-scroll overflow-x-hidden h-[250px] scrollbar-hide">
                {recentlyPlayed.map((track, index) => (
                  <RecentlyPlayed
                    key={index}
                    track={track}
                    chooseTrack={chooseTrack}
                  />
                ))}
              </div>
              {/* <button className="text-[#CECECE] bg-[#1A1A1A] text-[13px] py-3.5 px-4 rounded-2xl w-full font-bold bg-opacity-80 hover:bg-opacity-100 transition ease-out">
                View All
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Body;
