import React from 'react';
import Track from './Track';
const LikedSongsPage = ({ songs, chooseTrack }) => {
  return (
    <section className="bg-black ml-24 py-4 space-y-8 flex-grow md:mr-2.5">
      {songs.length > 0 && (
        <>
          <h1
            style={{ width: '95%', margin: '1rem' }}
            className="text-white font-bold mb-3 text-lg"
          >
            Liked Songs
          </h1>
          <div
            style={{ width: '95%', margin: '1rem' }}
            className="bg-[#0D0D0D] border-2 border-[#262626] p-4 rounded-xl space-y-4 recent-div"
          >
            {songs.map((track) => (
              <Track
                key={track.title}
                track={track}
                chooseTrack={chooseTrack}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default LikedSongsPage;
