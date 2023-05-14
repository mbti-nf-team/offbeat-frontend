/* eslint-disable react/no-unknown-property */
import { useRef } from 'react';

import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

import flagImage from '../../../lib/assets/flag_of_south_korea.png';

function Flag() {
  const ref = useRef();
  const flagTexture = useLoader(TextureLoader, flagImage.src);

  console.log(flagImage);

  // flagTexture.crossOrigin = 'anonymous'; // CORS 우회

  // useEffect(() => {
  //   const texture = new TextureLoader().load(flagImage.src);
  //   ref.current.material.map = texture;
  //   texture.wrapS = RepeatWrapping;
  //   texture.wrapT = RepeatWrapping;
  //   texture.repeat.set(150, 225);
  // }, []);

  // useFrame(({ clock }) => {
  //   const positions = ref.current.geometry.attributes.position.array;
  //   for (let i = 0; i < positions.length; i += 3) {
  //     const x = positions[i];
  //     const z = Math.sin((x * 10) + clock.elapsedTime) * 0.1;
  //     positions[i + 2] = z;
  //   }
  //   ref.current.geometry.attributes.position.needsUpdate = true;
  // });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry args={[1, 1]} />
      <meshBasicMaterial map={flagTexture} />
    </mesh>
  );
}

export default Flag;
