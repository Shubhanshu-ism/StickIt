import React from "react";
import { MdOutlineEmail } from "react-icons/md";
import { CiLinkedin } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-100 p-2 flex-shrink-0 text-center text-xs text-gray-400 border-t">
      <div className="container mx-auto text-center text-gray-500 text-xs">
        <p className="font-bold text-lg">Contact Me</p>
        <div className="flex justify-center gap-4 text-sm items-center">
          <span
            className="flex items-center gap-1 cursor-pointer"
            onClick={() =>
              window.open("mailto:shubhanshujain2233@gmail.com", "_blank")
            }
          >
            <MdOutlineEmail size={18} />
            Email
          </span>
          <span
            className="flex items-center gap-1 cursor-pointer"
            onClick={() =>
              window.open(
                "https://www.linkedin.com/in/shubhanshu-jain-iit-ism",
                "_blank"
              )
            }
          >
            <CiLinkedin size={18} />
            LinkedIn
          </span>
          <span
            className="flex items-center gap-1 cursor-pointer"
            onClick={() =>
              window.open("https://github.com/Shubhanshu-ism", "_blank")
            }
          >
            <FaGithub size={18} />
            GitHub
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
