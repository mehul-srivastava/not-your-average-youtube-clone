"use client";

import axios from "axios";

const Navbar = () => {
  async function handleUpload() {
    const response = await axios.post("/api/upload");
  }

  return (
    <nav className="border-b p-4 text-right">
      <button onClick={handleUpload}>Upload</button>
    </nav>
  );
};

export default Navbar;
