import { getProviders, signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect } from 'react';
import Loader from '../../components/Loader';

function Signin({ providers }) {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session]);

  if (session) return <Loader />;

  return (
    <div
      style={{ backgroundImage: "url('back.jpg')", zIndex: '1000' }}
      className="signIn h-screen flex flex-col items-center pt-40 space-y-8"
    >
      <Head>
        <title>Login - Spotify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Image
        src="https://unsplash.com/photos/aWXVxy8BSzc"
        height={250}
        width={600}
        objectFit="contain"
        className="animate-pulse"
      /> */}
      <img
        className="image-back"
        src="https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
      />
      {Object.values(providers).map((provider) => (
        <div className="btn-div" key={provider.name} style={{ zIndex: '1000' }}>
          <button
            className="text-white py-4 px-6 rounded-full bg-[#1db954] transition duration-300 ease-out border border-transparent uppercase font-bold text-xs md:text-base tracking-wider hover:scale-105 hover:bg-[#0db146]"
            onClick={() => signIn(provider.id)}
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Signin;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
