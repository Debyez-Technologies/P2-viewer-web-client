import { useCallback } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';


function useOptimalCameraPosition(targetRef, baseCameraPosition, padding = 1.1) {

    const { camera, size } = useThree(); // Destructure size from useThree

    const computeOptimalPosition = useCallback(() => {
        if (!targetRef.current || !baseCameraPosition) return null;

        // Get the bounding box of the target object
        const box = new THREE.Box3().setFromObject(targetRef.current);

        // Get the center and size of the bounding box
        const center = box.getCenter(new THREE.Vector3());
        const sizeBox = box.getSize(new THREE.Vector3()); // Renamed to avoid conflict with size from useThree

        // Get the maximum dimension
        const maxDim = Math.max(sizeBox.x, sizeBox.y, sizeBox.z);

        // Calculate the direction from the base camera position to the object center
        // Ensure baseCameraPosition is not the same as center, to avoid division by zero
        const direction = new THREE.Vector3().subVectors(baseCameraPosition, center).normalize();
        if (direction.length() === 0) { // Handle case where baseCameraPosition might be at center
            direction.set(0, 0, 1); // Default to looking from positive Z if no clear direction
        }


        // Calculate required distance based on FOV and aspect ratio
        const fov = camera.fov * Math.PI / 180;
        const aspect = size.width / size.height; // Use current canvas size for aspect ratio

        // Calculate distance required to fit the model vertically
        const distanceForVertical = (maxDim * padding) / (2 * Math.tan(fov / 2));

        // Calculate distance required to fit the model horizontally
        // This takes into account the aspect ratio of the viewport
        const distanceForHorizontal = ((maxDim * aspect) * padding) / (2 * Math.tan(fov / 2));
        // A more robust way to calculate horizontal fit:
        // const distanceForHorizontal = (maxDim / aspect * padding) / (2 * Math.tan(fov / 2));
        // Or simply compare maxDim/aspect with maxDim to get the effective dimension considering aspect
        const effectiveHorizontalDim = maxDim / aspect;
        const distanceForAspectFit = (Math.max(maxDim, effectiveHorizontalDim) * padding) / (2 * Math.tan(fov / 2));


        // We need the camera to be far enough to fit both width and height
        const requiredDistance = Math.max(distanceForVertical, distanceForAspectFit);


        // Position the camera at the required distance from the object center
        const optimalPosition = new THREE.Vector3().copy(center).add(
            direction.multiplyScalar(requiredDistance)
        );

        return { position: optimalPosition, center };
    }, [targetRef, baseCameraPosition, camera, padding, size.width, size.height]); // Add size to dependencies

    return computeOptimalPosition;
}

export { useOptimalCameraPosition }