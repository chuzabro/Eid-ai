import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

export default function OtherDesignsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const name = location.state?.name || "";
  const selectedOption = location.state?.selectedOption || "";
  const [selectedDesign, setSelectedDesign] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Move these arrays here so they are accessible throughout the component
  const designImages = [
    "https://cdn.builder.io/api/v1/image/assets%2Ff31aa0067f7240bca8b84a2d6d209919%2F6eaba692d0cb43efa6cb4146c46da6cd?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2Ff31aa0067f7240bca8b84a2d6d209919%2Fe382ee81b4f543dfa715bd27f662d080?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2Ff31aa0067f7240bca8b84a2d6d209919%2F2262e547591344f0b2d8aaa805e39c19?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2Ff31aa0067f7240bca8b84a2d6d209919%2F0a790e5233b14f1184fd4225f3fe4fc1?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2Ff31aa0067f7240bca8b84a2d6d209919%2F52b65e90e4684ca28f041fd9f404c133?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2Ff31aa0067f7240bca8b84a2d6d209919%2F96b53ae5f1eb40a1ae739dceab99b054?format=webp&width=800",
  ];

  // const textPositions = [

  const textPositions = [
    { left: "45%", top: "18%", color: "#CD7D25" },
    { left: "45.5%", top: "21.5%", color: "#FFF" },
    { left: "340px", top: "80px", color: "#FFF" },
    { left: "52%", top: "68px", color: "#FFF" },
    { left: "45%", top: "65px", color: "#FFF" },
    { left: "48%", top: "640px", color: "#FFF" },
  ];


  const handleBack = () => {
    navigate("/next", { state: { name } });
  };

  const handleNext = () => {
    if (selectedDesign === null) {
      alert("يرجى اختيار تصميم أولاً");
      return;
    }

    navigate("/final-result", {
      state: {
        name,
        selectedOption,
        selectedDesign,
        designImages,
        textPositions,
      },
    });
  };

  const handleDesignSelect = (designIndex: number) => {
    setSelectedDesign(designIndex);
  };

  // Download canvas function (EXACTLY as in FinalResultPage)
  const handleDownload = () => {
    if (selectedDesign === null) {
      alert("يرجى اختيار تصميم أولاً");
      return;
    }
    const canvas = canvasRef.current;
    const currentImage = designImages[selectedDesign];
    const currentPosition = textPositions[selectedDesign];
    if (!canvas || !currentImage || !currentPosition) {
      alert("لا يوجد تصميم محدد للتحميل");
      return;
    }
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      canvas.width = 800;
      canvas.height = 800;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        alert("تعذر الحصول على سياق الرسم");
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      ctx.font = "bold 28px Arial, sans-serif";
      ctx.fillStyle = currentPosition.color || "#FFFFFF";
      ctx.strokeStyle = "rgba(15, 15, 15, 0.8)";
      ctx.lineWidth = 2;
      ctx.textAlign = "center";
      let x = canvas.width / 2;
      let y = canvas.height / 2;
      if (typeof currentPosition.left === "string" && currentPosition.left.includes("%")) {
        x = (parseFloat(currentPosition.left) / 100) * canvas.width;
      } else if (typeof currentPosition.left === "string") {
        x = (parseFloat(currentPosition.left) / 800) * canvas.width;
      }
      if (typeof currentPosition.top === "string" && currentPosition.top.includes("%")) {
        y = (parseFloat(currentPosition.top) / 100) * canvas.height;
      } else if (typeof currentPosition.top === "string") {
        y = (parseFloat(currentPosition.top.replace("px", "")) / 800) * canvas.height;
      }
      y += 120;
      ctx.strokeText(name, x, y);
      ctx.fillText(name, x, y);
      // Download the card
      const dataURL = canvas.toDataURL("image/png", 1.0);
      const link = document.createElement("a");
      link.download = `eid-design-${selectedDesign + 1}-${name.replace(/\s+/g, "-") || "design"}.png`;
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    img.onerror = () => {
      alert("تعذر تحميل الصورة المحددة");
    };
    img.src = currentImage;
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://cdn.builder.io/api/v1/image/assets/TEMP/b37441c973e48eb00df249611cee60605f9128e1?width=3026')",
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-3 sm:px-4 py-6 sm:py-8"
        style={{ marginTop: "-4px" }}
      >
        {/* Logo */}
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/44601a5eb5d1394f281854f475784406e2daf9df?width=1009"
          alt="Logo"
          className="h-12 sm:h-16 md:h-20 lg:h-22 w-auto object-contain max-w-[90vw] mb-8 sm:mb-12 md:mb-16"
          style={{ marginTop: "-2px" }}
        />

        {/* Main Card */}
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
          <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 border border-white/20 shadow-2xl">
            <div className="space-y-8">
              {/* Main Question */}
              <div className="text-center">
                <h1
                  style={{
                    color: "#FFF",
                    textAlign: "center",
                    fontFamily:
                      "The Year of The Camel, Scheherazade New, Noto Naskh Arabic, Amiri, Cairo, system-ui, sans-serif",
                    fontSize: "clamp(24px, 5vw, 48px)",
                    fontStyle: "normal",
                    fontWeight: "700",
                    lineHeight: "normal",
                  }}
                >
                  <p>اختار التصميم الذي يناسبك :</p>
                </h1>
              </div>

              {/* Content Grid - تصاميم قابلة للاختيار */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* تصميم 1 */}
                <button
                  onClick={() => handleDesignSelect(0)}
                  className={`relative glass-input rounded-2xl p-0 border min-h-[300px] overflow-hidden transition-all duration-200 hover:scale-105 ${
                    selectedDesign === 0
                      ? "border-orange-400 border-2"
                      : "border-white/30"
                  }`}
                >
                  <img
                    src={designImages[0]}
                    alt="تصميم 1"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <div
                    className="absolute"
                    style={{
                      top: "72px",
                      left: "45%",
                      transform: "translateX(-50%)",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        color: textPositions[0].color,
                        fontFamily:
                          "KO Aynama, Amiri, Scheherazade New, Noto Naskh Arabic, Cairo, system-ui, sans-serif",
                        fontSize: "16px",
                        fontWeight: "500",
                        fontStyle: "normal",
                        
                        
                      }}
                    >
                      {name || "عبدالوهاب عبدالعزيز"}
                    </span>
                  </div>
                </button>

                {/* تصميم 2 */}
                <button
                  onClick={() => handleDesignSelect(1)}
                  className={`relative glass-input rounded-2xl p-0 border min-h-[300px] overflow-hidden transition-all duration-200 hover:scale-105 ${
                    selectedDesign === 1
                      ? "border-blue-400 border-2"
                      : "border-white/30"
                  }`}
                >
                  <img
                    src={designImages[1]}
                    alt="تصميم 2"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <div
                    className="absolute transform -translate-x-1/2"
                    style={{
                      top: "72px",
                      left: "45%",
                      textAlign: "center",
                      
                    }}
                  >
                    <span
                      style={{
                        color: textPositions[1].color,
                        fontFamily:
                          "KO Aynama, Amiri, Scheherazade New, Noto Naskh Arabic, Cairo, system-ui, sans-serif",
                        fontSize: "16px",
                        fontWeight: "500",
                        fontStyle: "normal",
                        
                      }}
                    >
                      {name || "عبدالوهاب عبدالعزيز"}
                    </span>
                  </div>
                </button>

                {/* تصميم 3 */}
                <button
                  onClick={() => handleDesignSelect(2)}
                  className={`relative glass-input rounded-2xl p-0 border min-h-[300px] overflow-hidden transition-all duration-200 hover:scale-105 ${
                    selectedDesign === 2
                      ? "border-blue-400 border-2"
                      : "border-white/30"
                  }`}
                >
                  <img
                    src={designImages[2]}
                    alt="تصميم 3"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <div
                    className="absolute"
                    style={{
                      top: "88px",
                      left: "45%",
                      textAlign: "center",
                      // border:"solid 1px red",
                        marginLeft:"-50px",
                        marginTop:"-20px"
                    }}
                  >
                    <span
                      style={{
                        color: textPositions[2].color,
                        fontFamily:
                          "KO Aynama, Amiri, Scheherazade New, Noto Naskh Arabic, Cairo, system-ui, sans-serif",
                        fontSize: "16px",
                        fontWeight: "500",
                        fontStyle: "normal",
                        
                      }}
                    >
                      {name || "عبدالوهاب عبدالعزيز"}
                    </span>
                  </div>
                </button>

                {/* تصميم 4 */}
                <button
                  onClick={() => handleDesignSelect(3)}
                  className={`relative glass-input rounded-2xl p-0 border min-h-[300px] overflow-hidden transition-all duration-200 hover:scale-105 ${
                    selectedDesign === 3
                      ? "border-blue-400 border-2"
                      : "border-white/30"
                  }`}
                >
                  <img
                    src={designImages[3]}
                    alt="تصميم 4"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <div
                    className="absolute transform -translate-x-1/2"
                    style={{
                      top: "80px",
                      left: "45%",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        color: textPositions[3].color,
                        fontFamily:
                          "KO Aynama, Amiri, Scheherazade New, Noto Naskh Arabic, Cairo, system-ui, sans-serif",
                        fontSize: "16px",
                        fontWeight: "500",
                        fontStyle: "normal",
                      }}
                    >
                      {name || "عبدالوهاب عبدالعزيز"}
                    </span>
                  </div>
                </button>

                {/* تصميم 5 */}
                <button
                  onClick={() => handleDesignSelect(4)}
                  className={`relative glass-input rounded-2xl p-0 border min-h-[300px] overflow-hidden transition-all duration-200 hover:scale-105 ${
                    selectedDesign === 4
                      ? "border-green-400 border-2"
                      : "border-white/30"
                  }`}
                >
                  <img
                    src={designImages[4]}
                    alt="تصميم 5"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <div
                    className="absolute transform -translate-x-1/2"
                    style={{
                      top: "80px",
                      left: "52%",
                      textAlign: "center",
                      

                    }}
                  >
                    <span
                      style={{
                        color: textPositions[4].color,
                        fontFamily:
                          "KO Aynama, Amiri, Scheherazade New, Noto Naskh Arabic, Cairo, system-ui, sans-serif",
                        fontSize: "16px",
                        fontWeight: "500",
                        fontStyle: "normal",
                        
                       
                        
                      }}
                    >
                      {name || "عبدالوهاب عبدالعزيز"}
                    </span>
                  </div>
                </button>

                {/* تصميم 6 */}
                <button
                  onClick={() => handleDesignSelect(5)}
                  className={`relative glass-input rounded-2xl p-0 border min-h-[300px] overflow-hidden transition-all duration-200 hover:scale-105 ${
                    selectedDesign === 5
                      ? "border-yellow-400 border-2"
                      : "border-white/30"
                  }`}
                >
                  <img
                    src={designImages[5]}
                    alt="تصميم 6"
                    className="w-full h-[350px] object-cover rounded-2xl"
                  />
                  <div
                    className="absolute transform -translate-x-1/2"
                    style={{
                      top: "315px",
                      left: "45%",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        color: textPositions[5].color,
                        fontFamily:
                          "KO Aynama, Amiri, Scheherazade New, Noto Naskh Arabic, Cairo, system-ui, sans-serif",
                        fontSize: "16px",
                        fontWeight: "500",
                        fontStyle: "normal",
                        // border: "solid 2px red"
                      }}
                    >
                      {name || "عبدالوهاب عبدالعزيز"}
                    </span>
                  </div>
                </button>
              </div>

              {/* Hidden Canvas for Download */}
              <canvas
                ref={canvasRef}
                style={{ display: "none" }}
                width={800}
                height={800}
              />

              {/* Navigation & Download Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <button
                  onClick={handleBack}
                  className="glass-button rounded-full px-8 py-3 sm:px-12 sm:py-3 md:px-16 md:py-4 border border-white/30 transition-all duration-200 hover:bg-white/20 active:scale-95 touch-manipulation min-h-[48px] min-w-[120px]"
                >
                  <span
                    style={{
                      color: "rgba(255, 255, 255, 0.75)",
                      fontFamily:
                        "The Year of The Camel, Scheherazade New, Noto Naskh Arabic, Amiri, Cairo, system-ui, sans-serif",
                      fontSize: "20px",
                      fontStyle: "normal",
                      fontWeight: "400",
                      lineHeight: "100.909%",
                    }}
                  >
                    السابق
                  </span>
                </button>
                {/* Next Button */}
                <button
                  onClick={handleNext}
                  disabled={selectedDesign === null}
                  className={`glass-button rounded-full px-8 py-3 sm:px-12 sm:py-3 md:px-16 md:py-4 border border-white/30 transition-all duration-200 active:scale-95 touch-manipulation min-h-[48px] min-w-[120px] ${
                    selectedDesign !== null
                      ? "hover:bg-white/20 cursor-pointer"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  <span
                    style={{
                      color: "rgba(255, 255, 255, 0.75)",
                      fontFamily:
                        "The Year of The Camel, Scheherazade New, Noto Naskh Arabic, Amiri, Cairo, system-ui, sans-serif",
                      fontSize: "20px",
                      fontStyle: "normal",
                      fontWeight: "400",
                      lineHeight: "100.909%",
                    }}
                  >
                    التالي
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
