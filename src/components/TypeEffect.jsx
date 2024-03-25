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
    <p className="text-xl md:text-3xl text-#003366 font-bold text-center mt-8 lg:text-3xl share-tech-mono">
      {text}
      <Cursor cursorBlinking cursorStyle="|" cursorColor="#ffffff"></Cursor>
    </p>
  );
}
