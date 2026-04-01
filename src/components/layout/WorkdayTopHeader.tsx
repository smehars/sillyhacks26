import { useState } from "react";
import ChaosMediaOverlay, { pickRandomMedia } from "../ui/ChaosMediaOverlay";

const MEDIA = [
  new URL("../../assets/gifs/bruh.gif", import.meta.url).href,
  new URL("../../assets/gifs/cat_explode.gif", import.meta.url).href,
  new URL("../../assets/gifs/im_cooked.gif", import.meta.url).href,
  new URL("../../assets/gifs/please_please_please.gif", import.meta.url).href,
  new URL("../../assets/gifs/speed2.gif", import.meta.url).href,
  new URL("../../assets/gifs/woe_fakeout.gif", import.meta.url).href,
  new URL("../../assets/images/our_brains_are_shrinking.jpg", import.meta.url).href,
  new URL("../../assets/images/statement_so_bad.jpg", import.meta.url).href,
  new URL("../../assets/images/statement_so_good.jpeg", import.meta.url).href,
  new URL("../../assets/images/tiger.png", import.meta.url).href,
];

export default function WorkdayTopHeader() {
  const [activeMedia, setActiveMedia] = useState<string | null>(null);

  const popMain = () => {
    setActiveMedia(pickRandomMedia(MEDIA));
  };

  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-orange-500 text-sm font-black text-white">
            W
          </div>
          <span className="text-lg font-semibold text-orange-500">workday</span>
        </div>
        <nav className="flex gap-4 text-sm text-gray-500">
          <button className="cursor-pointer hover:text-orange-500" onClick={popMain} type="button">
            Help
          </button>
        </nav>
      </header>

      <ChaosMediaOverlay
        activeMedia={activeMedia}
        mediaPool={MEDIA}
        onClose={() => setActiveMedia(null)}
        cloudCount={5}
        zIndex={100}
        overlayToneClass="bg-linear-to-br from-red-900/80 via-fuchsia-800/80 to-cyan-800/80"
        altText="help chaos"
        imageClassName="max-h-[65vh] max-w-[82vw] rounded border-4 border-lime-300 object-contain shadow-[0_0_35px_rgba(255,0,255,0.8)]"
      />
    </>
  );
}
