import React, {
    useRef,
    useState,
    useEffect,
    useLayoutEffect,
    useCallback,
} from "react";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Stats, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import Overlay from "../../ui-components/Overlay";
import { useAppStore } from "../../../store/app-store";

import { useOptimalCameraPosition } from "../../../hooks/useOptimalCameraPosition";
import ControlPanel from "./ControlPanel";

import OrbitLeft from "./../../../assets/icons/left-view.svg?react";
import ResetOrbit from "./../../../assets/icons/reset-view.svg?react";
import RightOrbit from "./../../../assets/icons/right-view.svg?react";
import TopOrbit from "./../../../assets/icons/top-view.svg?react";
import BottomOrbit from "./../../../assets/icons/bottom-view.svg?react";

import { useUIStore } from "../../../store/ui-store";
import axios from "axios";
import { API_BASE_URL } from "@/config/settings";


// Component that handles camera positioning
function CameraController({
    targetRef,
    cameraPosition,
    padding = 1.2,
    enableControls = true,
}) {
    const { camera, size, gl } = useThree();
    const controlsRef = useRef();
    const getOptimalPosition = useOptimalCameraPosition(
        targetRef,
        cameraPosition,
        padding,
    );

    useLayoutEffect(() => {
        if (
            !targetRef.current ||
            !cameraPosition ||
            targetRef.current.children.length === 0
        )
            return;

        const result = getOptimalPosition();
        if (!result) return;

        camera.position.copy(result.position);
        camera.lookAt(result.center);
        camera.updateProjectionMatrix();

        if (controlsRef.current) {
            controlsRef.current.target.copy(result.center);
            controlsRef.current.update();
        }
    }, [camera, cameraPosition, targetRef, getOptimalPosition]);

    useEffect(() => {
        if (
            !targetRef.current ||
            !cameraPosition ||
            targetRef.current.children.length === 0
        )
            return;

        const result = getOptimalPosition();
        if (!result) return;

        camera.position.copy(result.position);
        camera.lookAt(result.center);
        camera.updateProjectionMatrix();

        if (controlsRef.current) {
            controlsRef.current.target.copy(result.center);
            controlsRef.current.update();
        }
    }, [size.width, size.height]);

    // Prevent ctrl+scroll from zooming the page
    useEffect(() => {
        const canvas = gl.domElement;

        const preventPageZoom = (e) => {
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
            }
        };

        canvas.addEventListener("wheel", preventPageZoom, { passive: false });

        return () => {
            canvas.removeEventListener("wheel", preventPageZoom);
        };
    }, [gl]);

    return enableControls ? (
        <OrbitControls
            ref={controlsRef}
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            zoomSpeed={0.6}
            panSpeed={0.5}
            rotateSpeed={0.4}
            makeDefault
        />
    ) : null;
}

function LoadedModel({
    url,
    modelRef,
    targetSize,
    onModelReady,
    isWireframeMode,
}) {
    const gltf = useLoader(GLTFLoader, url);
    const materialsRef = useRef([]);
    const sceneRef = useRef(null);

    useLayoutEffect(() => {
        if (!gltf.scene || !modelRef.current) {
            console.log("Missing gltf.scene or modelRef");
            return;
        }

        console.log("Loading model from:", url);

        // Clone the scene
        const scene = gltf.scene.clone();
        sceneRef.current = scene;
        materialsRef.current = [];

        // Setup materials
        scene.traverse((obj) => {
            if (obj.isMesh) {
                if (obj.material) {
                    obj.material = obj.material.clone();
                } else {
                    obj.material = new THREE.MeshStandardMaterial({
                        color: 0xcccccc,
                        metalness: 0.2,
                        roughness: 0.8,
                    });
                }
                materialsRef.current.push(obj.material);
                obj.castShadow = true;
                obj.receiveShadow = true;
            }
        });

        // Calculate bounding box and scale
        const box = new THREE.Box3().setFromObject(scene);
        const size = new THREE.Vector3();
        box.getSize(size);

        console.log("Model size:", size);

        const maxDimension = Math.max(size.x, size.y, size.z);
        const scaleFactor = maxDimension > 0 ? targetSize / maxDimension : 1;

        scene.scale.setScalar(scaleFactor);

        // Center the model
        const center = new THREE.Box3()
            .setFromObject(scene)
            .getCenter(new THREE.Vector3());

        scene.position.sub(center);

        // Clear and add to modelRef
        modelRef.current.clear();
        modelRef.current.add(scene);

        console.log(
            "Model loaded successfully, children:",
            modelRef.current.children.length,
        );
        onModelReady?.(true);

        return () => {
            console.log("Cleaning up model");
            // Dispose of materials
            materialsRef.current.forEach((material) => {
                material.dispose();
            });
            materialsRef.current = [];

            // Dispose of geometries
            if (sceneRef.current) {
                sceneRef.current.traverse((obj) => {
                    if (obj.geometry) {
                        obj.geometry.dispose();
                    }
                });
            }

            // Clear the model ref
            if (modelRef.current) {
                modelRef.current.clear();
            }

            onModelReady?.(false);
            sceneRef.current = null;
        };
    }, [gltf, url, targetSize, modelRef, onModelReady]);

    useEffect(() => {
        materialsRef.current.forEach((m) => {
            m.wireframe = isWireframeMode;
            m.needsUpdate = true;
        });
    }, [isWireframeMode]);

    return null;
}

function Model({
    props,
    modelRef,
    targetSize = 0.5,
    onModelReady,
    isWireframeMode,
}) {
    const { infoEntityIdent } = props;
    const [modelUrl, setModelUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!infoEntityIdent) {
            console.log("No infoEntityIdent provided");
            return;
        }

        setLoading(true);
        setError(null);

        axios
            .get(`${API_BASE_URL}/api/v1/datamodule/icn/${infoEntityIdent}`)
            .then((res) => {
                const url = res.data?.url || "";
                console.log("Model URL fetched:", url);
                setModelUrl(url);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching model URL:", err);
                setError(err.message);
                setModelUrl("");
                setLoading(false);
            });
    }, [infoEntityIdent]);

    if (loading) {
        return null;
    }

    if (error) {
        console.error("Model loading error:", error);
        return null;
    }

    return (
        <>
            {modelUrl && (
                <React.Suspense fallback={null}>
                    <LoadedModel
                        url={modelUrl}
                        modelRef={modelRef}
                        targetSize={targetSize}
                        onModelReady={onModelReady}
                        isWireframeMode={isWireframeMode}
                    />
                </React.Suspense>
            )}
        </>
    );
}

const RenderCanvas = ({
    props,
    selectedCameraPosition,
    isModal = false,
    isWireframeMode,
}) => {
    const modelRef = useRef();
    const [modelIsReady, setModelIsReady] = useState(false);

    // Initialize the group ref
    useEffect(() => {
        if (!modelRef.current) {
            modelRef.current = new THREE.Group();
        }
    }, []);

    const cameraPositions = [
        new THREE.Vector3(-2, 3, 10),
        new THREE.Vector3(10, 3, 2),
        new THREE.Vector3(-10, 3, 2),
        new THREE.Vector3(0, 15, 0),
        new THREE.Vector3(5, -5, 8),
    ];

    const baseCameraPosition =
        selectedCameraPosition !== undefined
            ? cameraPositions[selectedCameraPosition]
            : cameraPositions[0];

    return (
        <Canvas
            camera={{ position: [-2, 3, 10], fov: 45 }}
            style={{ touchAction: "none" }}
            gl={{
                antialias: true,
                alpha: true,
                preserveDrawingBuffer: true,
                powerPreference: "high-performance",
            }}
            onCreated={({ gl }) => {
                gl.shadowMap.enabled = true;
                gl.shadowMap.type = THREE.PCFSoftShadowMap;

                // Handle context loss
                gl.domElement.addEventListener(
                    "webglcontextlost",
                    (event) => {
                        event.preventDefault();
                        console.warn("WebGL context lost");
                    },
                    false,
                );

                gl.domElement.addEventListener(
                    "webglcontextrestored",
                    () => {
                        console.log("WebGL context restored");
                    },
                    false,
                );
            }}
        >
            <ambientLight intensity={0.5} />
            <directionalLight
                position={[5, 10, 7.5]}
                intensity={0.8}
                castShadow
            />
            <directionalLight position={[-5, -10, -7.5]} intensity={0.3} />
            <spotLight
                position={[0, 15, 0]}
                angle={Math.PI / 4}
                penumbra={0.5}
                intensity={1.5}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-bias={-0.0001}
            />
            <hemisphereLight
                skyColor={0xb1e1ff}
                groundColor={0xb97a20}
                intensity={0.2}
            />

            <group ref={modelRef}>
                <Model
                    props={{ ...props }}
                    modelRef={modelRef}
                    targetSize={0.5}
                    onModelReady={setModelIsReady}
                    isWireframeMode={isWireframeMode}
                />
            </group>

            {modelIsReady && (
                <CameraController
                    targetRef={modelRef}
                    cameraPosition={baseCameraPosition}
                    padding={1.2}
                    enableControls={true}
                />
            )}

            <gridHelper position={[0, 0, 0]} args={[25]} />
        </Canvas>
    );
};

const ModelModal = ({ close, modelProps }) => {
    const [selectedCamera, setSelectedCamera] = useState(0);
    const { isWireframeMode } = useUIStore();

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            close();
        }
    };

    const cameraNames = [
        {
            name: "Front View",
            icon: <ResetOrbit />,
        },
        {
            name: "Right Side",
            icon: <RightOrbit />,
        },
        {
            name: "Left Side",
            icon: <OrbitLeft />,
        },
        {
            name: "Top View",
            icon: <TopOrbit />,
        },
        {
            name: "Bottom Right",
            icon: <BottomOrbit />,
        },
    ];

    return (
        <div
            className="fixed w-full h-full top-0 left-0 bg-black bg-opacity-40 z-40 flex items-center justify-center"
            onClick={handleBackdropClick}
        >
            <div
                className="relative bg-white p-4 rounded-lg shadow-xl overflow-hidden w-full h-full"
                onClick={(e) => e.stopPropagation()}
            >
                <ControlPanel
                    orbits={cameraNames}
                    setSelectedOrbit={setSelectedCamera}
                    selectedOrbit={selectedCamera}
                />
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-4">
                        <p className="text-sm text-gray-600">
                            Click and drag to look around, Ctrl + drag to pan,
                            scroll to zoom
                        </p>
                    </div>
                    <button
                        className="text-red-400 font-medium px-3 py-1 border border-red-400 rounded-md hover:bg-red-50"
                        onClick={() => close()}
                    >
                        Exit
                    </button>
                </div>

                <div
                    className="w-full h-[calc(100%-80px)] relative"
                    style={{ pointerEvents: "auto" }}
                >
                    <RenderCanvas
                        props={modelProps}
                        selectedCameraPosition={selectedCamera}
                        isModal={true}
                        isWireframeMode={isWireframeMode}
                    />
                </div>
            </div>
        </div>
    );
};

const ThreeDViewer = ({ props }) => {
    const { multimediaObjectWidth, multimediaObjectHeight, multimediaType } =
        props;
    const [isViewerOpen, setIsViewerOpen] = useState(false);

    const openModal = useCallback(() => {
        setIsViewerOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsViewerOpen(false);
    }, []);

    const containerClasses =
        "relative group inline-block overflow-hidden rounded-md shadow-md";

    console.log("multimedia Type", multimediaType);

    return (
        <div className={containerClasses}>
            {/* Only render inline viewer when modal is closed */}
            {!isViewerOpen && (
                <div style={{ height: 512, width: 512 }} className="relative">
                    <RenderCanvas props={props} isWireframeMode={false} />
                </div>
            )}

            {!isViewerOpen && (
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <Overlay opacity={70} bgColor="black">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center">
                            <button
                                className="pointer-events-auto border-white border p-3 rounded-md hover:bg-white hover:text-black transition-colors"
                                onClick={openModal}
                            >
                                Open 3D Viewer
                            </button>
                        </div>
                    </Overlay>
                </div>
            )}

            {isViewerOpen && (
                <ModelModal modelProps={{ ...props }} close={closeModal} />
            )}
        </div>
    );
};

export default ThreeDViewer;
