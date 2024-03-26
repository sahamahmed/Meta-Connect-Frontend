import { useTypewriter, Cursor } from "react-simple-typewriter";

export const TypeEffect = () => {
     const [text] = useTypewriter({
       words: ["Explore.", "Discover.", "Inspire."],
       loop: true,
       typeSpeed: 30,
       deleteSpeed: 10,
       delaySpeed: 1500,
     });
  return (
    <p className="text-xl md:text-4xl text-gray-600 font-bold  mt-4 lg:text-3xl share-tech-mono">
      {text}
      <Cursor cursorBlinking cursorStyle="|" cursorColor="#A0BED2"></Cursor>
    </p>
  );
}
