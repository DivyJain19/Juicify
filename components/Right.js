import { HiOutlineShieldCheck } from "react-icons/hi";
import { MdOutlineSettings } from "react-icons/md";
import { BiBell } from "react-icons/bi";
import { ViewGridIcon } from "@heroicons/react/solid";
import Profile from "./Profile";
import Dropdown from "./Dropdown";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

function Right({ chooseTrack, spotifyApi }) {
  const { data: session } = useSession();
  const { accessToken } = session;
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  // Recently Played Tracks...
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
    <section className="p-4 space-y-8 h-96 pr-8">
      <div className="flex space-x-2.5 items-center justify-between">
        {/* Icons */}
        <div className="flex items-center space-x-3 border-2 border-[#262626] rounded-full py-3 px-4">
          <HiOutlineShieldCheck className="text-[#CCCCCC] text-xl" />
          <MdOutlineSettings className="text-[#CCCCCC] text-xl" />
          <div>
            <BiBell className="text-[#CCCCCC] text-xl" />
          </div>
        </div>
        {/* Profile */}
        <Dropdown />
      </div>

      {/* Recently Played Tracks */}
      <div className="bg-[#212121] p-4 rounded-xl space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-white font-semibold text-sm">Recently Played</h4>
          <ViewGridIcon className="text-[#686868] h-6" />
        </div>

        <div className="space-y-4 overflow-y-scroll overflow-x-hidden h-[250px] md:h-[400px] scrollbar-hide">
          {recentlyPlayed.map((track, index) => (
            <Profile key={index} track={track} chooseTrack={chooseTrack} />
          ))}
        </div>
        <button className="text-[#CECECE] bg-[#383838] text-[13px] py-3 px-4 rounded-2xl w-full font-bold">
          View All
        </button>
      </div>
    </section>
  );
}

export default Right;