import React from "react";

function Footer() {
  return (
    <footer className="bg-white shadow-sm p-3 mt-auto">
      {" "}
      {/* Ensure it sticks to bottom */}
      <div className="container mx-auto text-center text-gray-500 text-sm">
        <p>
          Trello Clone | Built with React & Tailwind CSS by [Your Name/Credit]
        </p>
      </div>
    </footer>
  );
}

export default Footer;
