import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

export default function FinalResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const name = location.state?.name || "";
  const selectedDesign =
    location.state?.selectedDesign !== undefined
      ? location.state.selectedDesign
      : 0;
  const selectedOption = location.state?.selectedOption || "";
  const designImages = location.state?.designImages || [];
  const textPositions = location.state?.textPositions || [];

  // Get current design data
  const currentImage = designImages[selectedDesign];
  const currentPosition = textPositions[selectedDesign];

  // Draw image and text on canvas for preview and download
  const drawImageWithText = () => {
    const canvas = canvasRef.current;
    if (!canvas || !currentImage || !currentPosition || !name) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      canvas.width = 550;
      canvas.height = 700;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      ctx.font = "bold 28px Arial, sans-serif";
      ctx.fillStyle = currentPosition.color || "#FFFFFF";
      ctx.strokeStyle = "rgba(0, 0, 0, 0.8)";
      ctx.lineWidth = 2;
      ctx.textAlign = "center";

      let x = canvas.width / 2;
      let y = canvas.height / 2;

      // Calculate position as before...
      if (typeof currentPosition.left === "string" && currentPosition.left.includes("%")) {
        x = (parseFloat(currentPosition.left) / 100) * canvas.width;
      } else if (typeof currentPosition.left === "string") {
        x = (parseFloat(currentPosition.left) / 550) * canvas.width;
      }

      if (typeof currentPosition.top === "string" && currentPosition.top.includes("%")) {
        y = (parseFloat(currentPosition.top) / 100) * canvas.height;
      } else if (typeof currentPosition.top === "string") {
        y = (parseFloat(currentPosition.top.replace("px", "")) / 800) * canvas.height;
      }

      // Add margin from top (e.g., 80px)
      y += 80;

      ctx.strokeText(name, x, y);
      ctx.fillText(name, x, y);

      setImageLoaded(true);
    };
    img.src = currentImage;
  };

  const handleBack = () => {
    if (selectedOption === "نادي الذكاء الاصطناعي") {
      navigate("/ai-club", { state: { name, selectedOption } });
    } else {
      navigate("/other-designs", { state: { name, selectedOption } });
    }
  };

  // Download the selected card image
  const handleDownload = async () => {
    alert("جاري تحميل الصورة...");

    const canvas = canvasRef.current;
    if (!canvas) {
      alert("يرجى الانتظار حتى يتم تحميل الصورة أولاً");
      return;
    }

    if (!currentImage || !currentPosition) {
      alert("لا يوجد تصميم محدد للتحميل");
      return;
    }

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      canvas.width = 550;
      canvas.height = 700;

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

      // Download the selected card
      const dataURL = canvas.toDataURL("image/png", 1.0);
      const link = document.createElement("a");
      link.download = `eid-design-${selectedDesign + 1}-${name.replace(/\s+/g, "-") || "design"}.png`;
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // After download, navigate to the new page
      setTimeout(() => {
        navigate("/download-complete");
      }, 500); // short delay to ensure download triggers
    };
    img.onerror = () => {
      alert("تعذر تحميل الصورة المحددة");
    };
    img.src = currentImage;
  };

  // Share the card image (if supported)
  const handleShare = () => {
    const canvas = canvasRef.current;
    if (!canvas || !imageLoaded) {
      handleDownload();
      return;
    }

    canvas.toBlob((blob) => {
      if (blob && navigator.share) {
        const file = new File([blob], `eid-design-${name || "design"}.png`, {
          type: "image/png",
        });

        navigator
          .share({
            title: "تصميم عيد الأضحى المبارك",
            text: `تصميم عيد الأضحى المبارك - ${name}`,
            files: [file],
          })
          .catch(() => handleDownload());
      } else {
        handleDownload();
      }
    });
  };

  // Draw preview when image loads
  // This ensures the canvas is ready for download/share
  // You can also use useEffect if you want to auto-draw on mount

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
        <div className="w-full max-w-2xl mx-auto px-4 sm:px-6">
          <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 border border-white/20 shadow-2xl">
            <div className="space-y-8">
              {/* Success Message */}
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
                  تم إنشاء تصميمك بنجاح!
                </h1>
                <p
                  style={{
                    color: "rgba(255, 255, 255, 0.75)",
                    fontFamily:
                      "The Year of The Camel, Scheherazade New, Noto Naskh Arabic, Amiri, Cairo, system-ui, sans-serif",
                    fontSize: "18px",
                    marginTop: "16px",
                  }}
                >
                  عيد أضحى مبارك يا {name}
                </p>
              </div>

              {/* Preview with Image and Text Overlay */}
              <div className="relative glass-input rounded-2xl p-4 border border-white/30">
                <div className="relative w-[235px] sm:w-[300px] md:w-[400px] h-[350px] sm:h-[480px] md:h-[500px] mx-auto">
                  {currentImage && currentPosition && (
                    <>
                      <img
                        src={currentImage}
                        alt="تصميم عيد الأضحى"
                        className="w-full h-full object-cover rounded-xl"
                        onLoad={drawImageWithText}
                      />
                      {/* Text overlay preview */}
                      <div
                        className="absolute pointer-events-none"
                        style={{
                          top: "80px",
                          left: "34%",
                          transform: "translateX(-50%)",
                          textAlign: "center",
                        }}
                      >
                        <span
                          className="block font-bold text-[10px] sm:text-[18px] ml-[100px] mt-2"
                          style={{
                            color: currentPosition.color || "#FFF",
                            fontFamily: "KO Aynama, Arial, sans-serif",
                            textShadow: "2px 2px 4px rgba(17, 17, 17, 0.8)",
                            whiteSpace: "nowrap",
                            // border: "solid 2px red"
                          }}
                        >
                          {name}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Hidden Canvas for Download */}
              <canvas
                ref={canvasRef}
                style={{ display: "none" }}
                width={550}
                height={800}
              />

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                {/* Download Button */}
                <button
                  onClick={handleDownload}
                  className="glass-button rounded-full px-8 py-3 sm:px-12 sm:py-3 md:px-16 md:py-4 border border-white/30 transition-all duration-200 hover:bg-white/20 active:scale-95 touch-manipulation min-h-[48px] min-w-[120px] bg-green-500/20 hover:bg-green-500/30"
                >
                  <span
                    style={{
                      color: "rgba(255, 255, 255, 0.90)",
                      fontFamily:
                        "The Year of The Camel, Scheherazade New, Noto Naskh Arabic, Amiri, Cairo, system-ui, sans-serif",
                      fontSize: "20px",
                      fontStyle: "normal",
                      fontWeight: "400",
                      lineHeight: "100.909%",
                    }}
                  >
                    تحميل الصورة
                  </span>
                </button>

                {/* Share Button */}
                <button
                  onClick={handleShare}
                  className="glass-button rounded-full px-8 py-3 sm:px-12 sm:py-3 md:px-16 md:py-4 border border-white/30 transition-all duration-200 hover:bg-white/20 active:scale-95 touch-manipulation min-h-[48px] min-w-[120px] bg-blue-500/20 hover:bg-blue-500/30"
                >
                  <span
                    style={{
                      color: "rgba(255, 255, 255, 0.90)",
                      fontFamily:
                        "The Year of The Camel, Scheherazade New, Noto Naskh Arabic, Amiri, Cairo, system-ui, sans-serif",
                      fontSize: "20px",
                      fontStyle: "normal",
                      fontWeight: "400",
                      lineHeight: "100.909%",
                    }}
                  >
                    مشاركة
                  </span>
                </button>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-center gap-4 pt-4 border-t border-white/20">
                {/* Back Button */}
                <button
                  onClick={handleBack}
                  className="glass-button rounded-full px-8 py-3 sm:px-12 sm:py-3 md:px-16 md:py-4 border border-white/30 transition-all duration-200 hover:bg-white/20 active:scale-95 touch-manipulation min-h-[38px] min-w-[120px]"
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

                {/* New Design Button */}
                <button
                  onClick={() => {
                    alert("سيتم الانتقال لإنشاء تصميم جديد!");
                    navigate("/");
                  }}
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
                    تصميم جديد
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
