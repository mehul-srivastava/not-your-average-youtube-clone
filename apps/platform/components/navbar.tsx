import LiveStreamButton from "./live-stream-button";
import UploadButton from "./upload-button";

const Navbar = () => {
  return (
    <nav className="border-b p-4 flex justify-end gap-4">
      <UploadButton />
      <LiveStreamButton />
    </nav>
  );
};

export default Navbar;
