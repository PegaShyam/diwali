import React, { useState, useRef } from "react";
import Lightbox from "../components/Lightbox";
import BGMUSIC from "../assets/music/bg-music.mp3"
import haha from "../assets/music/haha-atumalaca.mp3"

/*
  Gallery:
  - blurred thumbnail grid with caption
  - click opens Lightbox with prev/next/close and per-image audio
  - replace src imports with your images & tracks
*/
import img1 from "../assets/gallery/1.jpg";
import img2 from "../assets/gallery/2.jpg";
import img3 from "../assets/gallery/3.jpg";
import img4 from "../assets/gallery/4.jpg";
import img5 from "../assets/gallery/5.jpg";
import img6 from "../assets/gallery/6.jpg";
import img7 from "../assets/gallery/7.png";
import img8 from "../assets/gallery/8.png";
import img9 from "../assets/gallery/9.png";
import img10 from "../assets/gallery/10.png";
import img11 from "../assets/gallery/11.png";
import img12 from "../assets/gallery/12.jpg";
import img13 from "../assets/gallery/13.jpg";
import img14 from "../assets/gallery/14.jpg";
import img15 from "../assets/gallery/15.png";
import vid16 from "../assets/gallery/16.mp4";
import img17 from "../assets/gallery/17.jpg";
import img18 from "../assets/gallery/18.jpg";
import img19 from "../assets/gallery/19.png";
import img20 from "../assets/gallery/20.png";
import img21 from "../assets/gallery/21.png";
import img22 from "../assets/gallery/22.jpg";
import img23 from "../assets/gallery/23.jpg";
import img24 from "../assets/gallery/24.jpg";
import img25 from "../assets/gallery/25.png";
import img26 from "../assets/gallery/26.jpg";
import img27 from "../assets/gallery/27.jpg";
import img28 from "../assets/gallery/28.jpg";
import img29 from "../assets/gallery/29.jpg";
import img30 from "../assets/gallery/30.jpg";
import img31 from "../assets/gallery/31.jpg";
import img32 from "../assets/gallery/32.jpg";
import vid33 from "../assets/gallery/33.mp4";
import img34 from "../assets/gallery/rahul1.jpg";
import img35 from "../assets/gallery/rahul2.png";
import vid36 from "../assets/gallery/vid36.mp4";

export default function Gallery() {
  const items = [
    { src: img1, caption: "Stadium indaa morii tankaa", audio: haha, description: "Adidas Lover but use maadodu SparX 🩴🩴" },
    { src: img2, caption: "Tirboki Nan Makklu", audio: haha, description: "Adventure Land presents Monkey Land" },
    { src: img3, caption: "Honesty is my policy", audio: haha, description: "Grandson of Mahatma Gandhi" },
    { src: img4, caption: "Microsoft Mangaa ❤ Open Source Nigga", audio: haha, description: "Lover Boys" },
    { src: img5, caption: "How niggas show up after that one person says : 'Banro ivat nande treat-u'", audio: haha, description: "Halkett nan maklu" },
    { src: img6, caption: "Cafe Coffee Day❌ Raju Momos✅", audio: haha, description: "Our favourite Couple - Made for Each Other💕" },
    { src: img7, caption: "Nodakk aschte Maharshi, Madad ella Kall Rishi🤓", audio: haha, description: "Notty Sckool Boys" },
    { src: img8, caption: "Kamakshipalaya Fried Chicken (KFC🍗🐔)", audio: haha, description: "Kunal is getting wet💦" },
    { src: img9, caption: "Dry Gobi Chandru", audio: haha, description: "Wet Kunal💦" },
    { src: img10, caption: "Jodi Parivaalagalu❌ Jodi Kaagegalu✅", audio: haha, description: "KAW KAW" },
    { src: img11, caption: "GRWM for First Night with Gowda 💜 💦", audio: haha, description: "Mysuru Mysuru Malligee..." },
    { src: img12, caption: "Cutlery Cutie Pie 🍴", audio: haha, description: "Aa auntie na yaavdo video dalli nodidini...🚕" },
    { src: img13, caption: "Ammaa thaayeee🪙", audio: haha, description: "Micheal Jordon from Kamakshipalaya" },
    { src: img14, caption: "Mungaru Molee Madesha 💦", audio: haha, description: "Mungaru Moleye ♫ ..." },
    { src: img15, caption: "Bandh Unnu Ba 🍫", audio: haha, description: "Gowda ninge helidu...." },
    { src: vid16, caption: "Aytaaa...Kushii Na?😂", audio: haha, description: "Papa he looked like he was having such a nice dream..." },
    { src: img17, caption: "I see my future behind me! 👀", audio: haha, description: "Palace alla, left alli HUDGI nodo lowde!👱‍♀️" },
    { src: img18, caption: "Can I cut... YOUR grass? 🌿", audio: haha, description: "Nim podhe 🌿 ge naan nan neer 💦 haakboudhaa??" },
    { src: img19, caption: "Coolie no. 69420", audio: haha, description: "Kaaleesha thamma Kariyappa [Big fan of Monica 💃🏻]" },
    { src: img20, caption: "Fair and Lovely: Mokha Pala Pala✨", audio: haha, description: "But I also like to use Nivea Mens Face Wash before applying." },
    { src: img21, caption: "Kariyaa I love you💅🏻", audio: haha, description: "Ivat nan crushh hatra hogbitt avl pencil eeskotini" },
    { src: img22, caption: "gowda, tera sabun slow hai kya🥸?", audio: haha, description: "Snana maado lowda gowda" },
    { src: img23, caption: "Are you a car?.......Because you can park in ME 🍆 💦", audio: haha, description: "Gold plated Omni" },
    { src: img24, caption: "Chiii Hoguu🌸", audio: haha, description: "Anna first night mood alli avre...gowda ushaaru" },
    { src: img25, caption: "Shah Rukh Khan thamma Shamsuddeen Khan 🐐", audio: haha, description: "Yak guru nan yen ning thap madide antha istond powder hak kursidiya - to cameraman" },
    { src: img26, caption: "NUDE BEACH with gowdaa👙🏖", audio: haha, description: "Nkn kelag yaak nodtha idiyaa, nan kannu illi mel irodu" },
    { src: img27, caption: "Ethnic Day Attrocities", audio: haha, description: "Yellow yellow dirty fellow💛 - nkn naale nan crush jothe ne dance hodiyadu" },
    { src: img28, caption: "Gaadi Challan❌ Electricity Bill✅", audio: haha, description: "55rs electric bill ge en use madudno yappa💀"},
    { src: img29, caption: "Gowda: 'Smoke 💨 hesitaavne anbitt nange grenade 💣💥 hesdaa....... lowdaa Raabta'", audio: haha, description: "~Ee lowda gal jothe nan PUBG jeevna" },
    { src: img30, caption: "Dhoom Machale dhoom machaleee...🛵 dhoooommm🔥🔥💨", audio: haha, description: "POV : Chandru picking up Rahul to play badminton" },
    { src: img31, caption: "MBA madbek ankondide mistake agi darii tappi engineering bande 🎓", audio: haha, description: "Buy 1, Get 2 free - Lowde tshirt ge helidu, nang alla🫨💀" },
    { src: img32, caption: "Happy Birthday Version.24.0.1🤓", audio: haha, description: "Patch Notes - Hodkondiro Count Has Increased, nothing else new found." },
    { src: img34, caption: "Randi Raabta🌼 [BONUS-1]", audio: haha, description: "Strong ithu nan body, Weak aaytu nin nodi ♫" },
    { src: img35, caption: "6 inches and more - Desi Sins Ft. Randi Raabta [BONUS-2]", audio: haha, description: "Latina Raabta gets stuck in washing machine again🍌🍑" },
    { src: vid36, caption: "MHMMM MUAHHHH👀🫣 [BONUS-3]", audio: haha, description: "🍌🍑💦💦💦" },
    { src: vid33, caption: "HAPPY DIWALI 2025!!!", audio: haha, description: "🎉🎊🎇🎆🎉🎊🎇🎆 Hodiyamma Hodiyamma 😂🤣🤣" },
    
    
  ];

  const [lightboxIndex, setLightboxIndex] = useState(null);
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold mb-6">WOW SUPARR, Enta lucku guru nindu! <br /> 📸 Togo gift aagi gallery ninge!</h2>
      <p className="mb-6"><span className="font-semibold tracking-wider">Disclaimer :</span> No one's feelings was meant to be be hurt through this work. Yaaru thapp thilkobedi please.</p>

<audio
        ref={audioRef}
        src={BGMUSIC}
        autoPlay
        loop
        muted={isMuted}
        preload="auto"
      />
      <button
        onClick={toggleMute}
        className="cursor-pointer bg-white/80 backdrop-blur-md text-black rounded-full px-4 py-2 shadow-lg font-bold z-50 hover:bg-black hover:text-white transition-all mb-4"
      >
        {isMuted ? "🔇 Unmute BG Music" : "🔊 Mute BG Music"}
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((it, idx) => (
          <div key={idx} className="group relative cursor-pointer" onClick={() => setLightboxIndex(idx)}>
            <div className="overflow-hidden rounded-lg">
              <img src={it.src} alt={it.caption} className="w-full h-56 object-cover transition duration-300 filter blur-sm group-hover:blur-0 group-hover:scale-105" />
            </div>
            <div className="mt-2">
              <div className="text-lg font-semibold">{it.caption}</div>
              <div className="text-sm text-gray-500">{it.description}</div>
            </div>
          </div>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox items={items} startIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}
    </div>
  );
}
