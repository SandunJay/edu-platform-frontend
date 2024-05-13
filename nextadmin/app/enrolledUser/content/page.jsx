import Video from 'next-video';
import awesomeVideo from 'https://utfs.io/f/d471748b-6a38-47d1-b780-0903504ab2e3-529e5u.mp4';
 
export default function Page() {
  return <Video src={awesomeVideo} />;
}