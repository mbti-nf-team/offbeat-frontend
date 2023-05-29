let scene, camera, renderer;
let flag;
let flagColor = "#ffffff";

const [width, height] = [600, 400];
const [flagWidth, flagHeight, flagWidthSegments, flagHeightSegments] = [30, 20, 30, 20];
const texturePath = 'korea-flag.png';

const init = () => {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);

    camera.position.set(0, 0, 40);
    camera.lookAt(new THREE.Vector3(0, 0.0));

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    document.getElementById("renderArea").appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight("#FFFFFF");
    light.position.set(10, 50, 100);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight("#999999");
    scene.add(ambientLight);

    // 깃발
    // geometry: 기하학 객체
    // material: 기하학 객체를 그리는데 사용하는 표면 속성
    const loader = new THREE.TextureLoader();

    let geometry = new THREE.PlaneGeometry(flagWidth, flagHeight, flagWidthSegments, flagHeightSegments);
    let material = new THREE.MeshLambertMaterial({
        color: flagColor,
        map: loader.load(texturePath),
        side: THREE.DoubleSide,
        // wireframe: true,
    });

    // mesh: 3D 화면을 구성하는 물체, material로 geometry를 그리는 객체
    flag = new THREE.Mesh(geometry, material);
    scene.add(flag);

    update();
}

const setCamera = () => {
    const angle = document.getElementById("angle").value;
    document.getElementById("textAngle").innerText = `[${angle}°]`;

    camera.position.x = 40 * Math.sin(angle * Math.PI / 180);
    camera.position.z = 40 * Math.cos(angle * Math.PI / 180);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
}

const update = () => {
    const horizontal = document.getElementById("h").value;
    const vertical = document.getElementById("v").value;
    const swing = document.getElementById("w").value;
    const speed = document.getElementById("s").value;

    // == 1. 오른쪽 펄럭 (구버전) ==
    // for (let y = 0; y < flagHeightSegments + 1; y++) {
    //     for (let x = 0; x < flagWidthSegments + 1; x++) {
    //         const index = x + y * (flagWidthSegments + 1);
    //         const vertex = flag.geometry.vertices[index];
    //         const time = Date.now() * speed / 50;

    //         const change = Math.sin(horizontal * x + vertical * y - time) * swing * x / 4;
    //         vertex.z = change;
    //     }
    // }

    // == 2. 양쪽 펄럭 (구버전) ==
    // for (let y = 0; y < flagHeightSegments + 1; y++) {
    //     for (let x = 0; x < flagWidthSegments + 1; x++) {
    //         const index = x + y * (flagWidthSegments + 1);
    //         const vertex = flag.geometry.vertices[index];
    //         const time = Date.now() * speed / 50;

    //         const change = Math.sin(x * horizontal + y * vertical - time) * 0.6;
    //         vertex.z = change;
    //     }
    // }

    // == 3. 양쪽 펄럭 (신버전) ==
    for (let y = 0; y < flagHeightSegments + 1; y++) {
        for (let x = 0; x < flagWidthSegments + 1; x++) {
            const index = x + y * (flagWidthSegments + 1);
            const time = Date.now() * speed / 50;

            const change = Math.sin(x * horizontal + y * vertical - time) * 0.6;
            flag.geometry.attributes.position.setZ(index, change);
        }
    }

    flag.geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
    window.requestAnimationFrame(update);
}

