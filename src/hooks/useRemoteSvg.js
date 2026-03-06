import { useEffect, useState, useCallback } from 'react';
import parse from 'html-react-parser';

/**
 * A custom hook to securely fetch and render an SVG from a remote URL as an interactive component.
 * @param {string} url The full URL to the SVG asset.
 * @returns {{error: Error|null, loading: boolean, Svg: React.FC | null}}
 */
export function useRemoteSvg(url) {
  const [SvgComponent, setSvgComponent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) {
      setSvgComponent(null);
      return;
    }

    const fetchSvg = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(url);
        if (!res.ok) {
          // Handle HTTP errors like 404 or 500
          throw new Error(`Failed to fetch SVG: ${res.status} ${res.statusText}`);
        }
        const svgText = await res.text();
        
        // Memoize the component function to ensure a stable reference
        const component = () => parse(svgText);
        setSvgComponent(() => component);

      } catch (err) {
        console.error("Error fetching remote SVG:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSvg();
  }, [url]);

  return { Svg: SvgComponent, loading, error };
}