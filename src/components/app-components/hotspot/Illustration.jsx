import { forwardRef } from "react";
import { useDynamicSvgImport } from "../../../hooks/useDynamicImport";

const Illustration = forwardRef(({ url, onSvgLoad }, ref) => {
  const { loading, Svg, error } = useDynamicSvgImport(url);

  if (error) {
    return <div className="text-red-500">{error.message}</div>;
  }

  return (
    <>
      {Svg && <Svg ref={ref} onSvgLoad={onSvgLoad} />}
      {loading && <div>Loading...</div>}
    </>
  );
});

export default Illustration;
