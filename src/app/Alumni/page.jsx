'use client';
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar"
import DecorativeLeaves from '../components/DecorativeLeaves';
import BottomDecorations from "../components/BottomDecorations";
import CircularGallery from '../components/CircularGallery';
import Header from '../components/grid';
import { defaultTeamPayload } from "@/lib/teamDefaults";
const DiamondIcon = () => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="diamond-icon"
    >
      <path
        d="M20 0L26.7949 13.2051L40 20L26.7949 26.7949L20 40L13.2051 26.7949L0 20L13.2051 13.2051L20 0Z"
        fill="none"
        stroke="#556b2f"
        strokeWidth="1.5"
      />
    </svg>
  )
}

// const WavyLine = () => {
//   return (
//     <div className="wavy-line-container">
//       <svg width="600" height="80" viewBox="0 0 600 80" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M0 40C100 10 150 70 300 40C450 10 500 70 600 40" stroke="#556b2f" strokeWidth="1.5" fill="none" />
//         <path d="M300 40C320 60 340 20 360 40C380 60 400 20 420 40" stroke="#556b2f" strokeWidth="1.5" fill="none" />
//       </svg>
//       <img src={"/leaf-wo-bg.png" || "/placeholder.svg"} alt="Leaf decoration" className="gallery-leaf" />
//     </div>
//   )
// }

const Gallery = () => {
  const baseStaticAlumni = defaultTeamPayload.alumni;
  const [alumniItems, setAlumniItems] = useState(
    baseStaticAlumni.map((member) => ({
      image: member.imageUrl,
      text: member.name,
    }))
  );

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const res = await fetch("/api/team", { cache: "no-store" });
        const data = await res.json();
        const dynamicAlumni = data?.alumni || [];
        const mergedAlumni = [...baseStaticAlumni, ...dynamicAlumni].sort((a, b) => {
          const yearCompare = String(b.academicYear || "").localeCompare(String(a.academicYear || ""));
          if (yearCompare !== 0) return yearCompare;
          const orderCompare = Number(a.sortOrder || 0) - Number(b.sortOrder || 0);
          if (orderCompare !== 0) return orderCompare;
          return String(a.name || "").localeCompare(String(b.name || ""));
        });

        if (mergedAlumni.length > 0) {
          setAlumniItems(
            mergedAlumni.map((member) => ({
              image: member.imageUrl,
              text: member.name,
            }))
          );
        }
      } catch (error) {
        console.error("Failed to fetch alumni data:", error);
      }
    };

    fetchAlumni();
  }, []);

  return (
    <div>
        <Navbar/>
    <div
      className="gallery-container"
      style={{
        // backgroundImage: `url(${'/screen.png'})`,
      }}
    >
      <div className="">
        {/* Title section */}
        <section className="">
       <div className="teamContainer">
                        <div className={`diamondDecoration diamond1`}></div>
        <div className={`diamondDecoration diamond2`}></div>
        <div className={`diamondDecoration diamond3`}></div>
        <div className={`diamondDecoration diamond4`}></div>
                <Header title={"THE ORIGINALS"} />
              </div>
        </section>

        <DecorativeLeaves />
                <div style={{ height: '500px' }}>
          <CircularGallery items={alumniItems} bend={4} textColor="#000000" borderRadius={0.05} scrollEase={0.05}/>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Gallery
