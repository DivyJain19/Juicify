import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import RecentlyPlayed from './RecentlyPlayed';
import { ViewGridIcon } from '@heroicons/react/solid';
const RecentPage = ({ chooseTrack, spotifyApi }) => {
  const { data: session } = useSession();
  const { accessToken } = session;
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);
  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.getMyRecentlyPlayedTracks({ limit: 20 }).then((res) => {
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
  return (
    <section className="bg-black ml-24 py-4 space-y-8 flex-grow md:mr-2.5">
      <h4
        style={{ margin: '1rem' }}
        className="text-white font-semibold text-sm "
      >
        Recently Played
      </h4>
      <div
        style={{ width: '95%', margin: '1rem' }}
        className="bg-[#0D0D0D] border-2 border-[#262626] p-4 rounded-xl space-y-4 recent-div"
      >
        <div className="space-y-4 overflow-y-scroll overflow-x-hidden  scrollbar-hide">
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
    </section>
  );
};

export default RecentPage;
