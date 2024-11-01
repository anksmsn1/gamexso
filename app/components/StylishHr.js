 
import Image from "next/image";
import Logo from    "../../public/logo.jpg";
const StylishHr = ({ variant = "gradient", text = "" }) => {
    switch (variant) {
      case "gradient":
        return <hr className="border-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 my-8" />;
  
      case "dotted":
        return <hr className="border-t border-dotted border-gray-400 my-8" />;
  
      case "dashedShadow":
        return <hr className="border-t border-dashed border-blue-500 shadow-lg my-8" />;
  
      case "iconDivider":
        return (
          <div className="flex items-center my-8">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-golden-500">
 
            <Image src={Logo} className="h-20 w-20" alt="Devider"/>

            </span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
        );
  
      case "textDivider":
        return (
          <div className="flex items-center my-8">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500 font-medium bg-white px-3 py-1 rounded-full">{text}</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
        );
  
      default:
        return <hr className="border-t border-gray-300 my-8" />;
    }
  };
  
  export default StylishHr;
  