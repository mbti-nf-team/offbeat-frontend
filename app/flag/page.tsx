/* eslint-disable react/no-unknown-property */

'use client';

import { Canvas } from '@react-three/fiber';

import Flag from 'components/three/Flag';

function Page() {
  return (
    <div style={{ height: '100vh' }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <Flag />
      </Canvas>
    </div>
  );
}
export default Page;
