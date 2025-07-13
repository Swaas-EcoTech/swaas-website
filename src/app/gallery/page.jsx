import Navbar from "../components/Navbar"
import DecorativeLeaves from '../components/DecorativeLeaves';
import BottomDecorations from "../components/BottomDecorations";

const GalleryImage = ({ src, alt, className, shape = "rounded" }) => {
  return (
    <div className={`gallery-image-container ${shape}`}>
      <div className="gallery-image-placeholder">
        {src && <img src={src || "/placeholder.svg"} alt={alt} className={`gallery-image ${className || ""}`} />}
      </div>
    </div>
  )
}

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

const WavyLine = () => {
  return (
    <div className="wavy-line-container">
      <svg width="600" height="80" viewBox="0 0 600 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 40C100 10 150 70 300 40C450 10 500 70 600 40" stroke="#556b2f" strokeWidth="1.5" fill="none" />
        <path d="M300 40C320 60 340 20 360 40C380 60 400 20 420 40" stroke="#556b2f" strokeWidth="1.5" fill="none" />
      </svg>
      <img src={"/leaf-wo-bg.png" || "/placeholder.svg"} alt="Leaf decoration" className="gallery-leaf" />
    </div>
  )
}

const Gallery = () => {
  // Sample image URLs - replace with your actual images
  const sampleImages = [
    { id: 1, src: "", alt: "Gallery Image 1" },
    { id: 2, src: "", alt: "Gallery Image 2" },
    { id: 3, src: "", alt: "Gallery Image 3" },
    { id: 4, src: "", alt: "Gallery Image 4", shape: "rounded-square" },
    { id: 5, src: "", alt: "Gallery Image 5" },
  ]

  return (
    <div>
        <Navbar/>
        <DecorativeLeaves />
    <div
      className="gallery-container"
      style={{
        // backgroundImage: `url(${'/screen.png'})`,
      }}
    >
      <div className="gallery-content">
        {/* Title section */}
        <section className="gallery-title-section">
          <DiamondIcon />
          <div className="gallery-title-container">
            <h1 className="gallery-title">GALLERY</h1>
          </div>
          <DiamondIcon />
        </section>

        {/* Wavy line with leaf */}
        <WavyLine />

        {/* Top row images */}
        <section className="gallery-images-top-row">
          <GalleryImage src={sampleImages[0].src} alt={sampleImages[0].alt} />
          <GalleryImage src={sampleImages[1].src} alt={sampleImages[1].alt} />
        </section>

        {/* Bottom row images */}
        <section className="gallery-images-bottom-row">
          <GalleryImage src={sampleImages[2].src} alt={sampleImages[2].alt} />
          <GalleryImage src={sampleImages[3].src} alt={sampleImages[3].alt} shape="rounded-square" />
          <GalleryImage src={sampleImages[4].src} alt={sampleImages[4].alt} />
        </section>


        <div className="bottom-curve"></div>
        <BottomDecorations/>
      </div>
    </div>
    </div>
  )
}

export default Gallery
