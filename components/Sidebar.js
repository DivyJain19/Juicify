import {
  ChartBarIcon,
  ClockIcon,
  DotsHorizontalIcon,
  HomeIcon,
} from '@heroicons/react/solid';
import { useState } from 'react';
import { MdFeaturedPlayList } from 'react-icons/md';
import { RiPlayListFill } from 'react-icons/ri';
import { AiFillHeart } from 'react-icons/ai';
import Image from 'next/image';

function Sidebar(props) {
  const [iconSelected, setIconSelected] = useState('home');
  return (
    <section className="fixed top-0 z-40 flex flex-col p-4 items-center bg-black w-[90px] h-screen space-y-8">
      <Image
        src="https://rb.gy/xkacau"
        width={56}
        height={56}
        objectFit="contain"
      />
      <div className="flex flex-col space-y-8">
        <HomeIcon
          className={`sidebarIcon opacity-[0.85] ml-1 ${
            iconSelected === 'home' ? 'text-white' : ''
          }`}
          onClick={() => {
            props.setPage('home');
            setIconSelected('home');
          }}
        />
        <AiFillHeart
          className={`sidebarIcon text-2xl ml-1 ${
            iconSelected === 'liked' && 'text-white'
          }`}
          onClick={() => {
            props.setPage('liked');
            setIconSelected('liked');
          }}
        />
        <ClockIcon
          className={`sidebarIcon ${iconSelected === 'recent' && 'text-white'}`}
          onClick={() => {
            props.setPage('recent');
            setIconSelected('recent');
          }}
        />
        <MdFeaturedPlayList
          className={`sidebarIcon ml-1 text-2xl ${
            iconSelected === 'albums' && 'text-white'
          }`}
          onClick={() => {
            props.setPage('albums');
            setIconSelected('albums');
          }}
        />
        <RiPlayListFill
          className={`sidebarIcon text-2xl ml-1 ${
            iconSelected === 'playlists' && 'text-white'
          }`}
          onClick={() => {
            props.setPage('playlists');
            setIconSelected('playlists');
          }}
        />
      </div>
    </section>
  );
}

export default Sidebar;
