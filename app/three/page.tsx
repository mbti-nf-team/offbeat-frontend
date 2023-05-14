/* eslint-disable react/no-unknown-property */

'use client';

import { Canvas } from '@react-three/fiber';

const doubleSide = 2;

function Page() {
  const [sizeW, sizeH, segW, segH] = [30, 20, 30, 20];

  // const test = () => {
  //   const h = 0.5;
  //   const v = 0.3;
  //   const w = 0.2;
  //   const s = 0.5;

  //   for (let y = 0; y < segH + 1; y++) {
  //     for (let x = 0; x < segW + 1; x++) {
  //       const index = x + y * (segW+1);
  //       const vertex = flag.geometry.vertices[index];
  //       const time = Date.now() * s / 50;
  //       vertex.z = Math.sin(h * x + v * y - time) * w * x / 4;
  //     }
  //   }
  // };

  return (
    <div id="canvas-container">
      <Canvas camera={{
        position: [0, 0, 40],
        // lookAt: (a, b, c) => {
        //   console.log(a, b, c);
        // },
      }}
      >
        <directionalLight color="red" position={[10, 50, 100]} />
        <ambientLight color="#999999" />
        <mesh position={[-15, -10, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 40, 16, 1]} />
          <meshPhongMaterial color="#ffffff" specular="#999999" shininess={30} />
        </mesh>
        <mesh getVertexPosition={(index, target) => {
          console.log(index, target);
          return target;
        }}
        >
          <planeGeometry args={[sizeW, sizeH, segW, segH]} />
          <meshLambertMaterial color="#ffffff" side={doubleSide} />
          {/* <bufferGeometry attributes={{ }} /> */}
        </mesh>
      </Canvas>
    </div>
  );
}

export default Page;
