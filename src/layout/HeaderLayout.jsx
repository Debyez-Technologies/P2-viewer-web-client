/**
 * A reusable layout component that provides the common wrapper and styling for all headers.
 * It accepts children to allow for flexible content.
 */
const HeaderLayout = ({ children }) => {
  return (
    <div className="border-b">
      <header className="w-full pt-2 pb-4 px-3">
        <div className="flex flex-row justify-between items-center">
          {children}
        </div>
      </header>
    </div>
  );
};

export default HeaderLayout;