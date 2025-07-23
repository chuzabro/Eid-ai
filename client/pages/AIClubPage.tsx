import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AIClubPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const name = location.state?.name || "";
  const selectedOption = location.state?.selectedOption || "";
  const [selectedDesign, setSelectedDesign] = useState<number | null>(null);

  const handleBack = () => {
    navigate("/next", { state: { name } });
  };

  const handleNext = () => {
    if (selectedDesign === null) {
      alert("يرجى اختيار تصميم أولاً");
      return;
    }

    const designImages = [
      "https://cdn.builder.io/api/v1/image/assets%2Ff31aa0067f7240bca8b84a2d6d209919%2F0f6d408a380b4e768b567e471bda4422?format=webp&width=800",
      "https://cdn.builder.io/api/v1/image/assets%2Ff31aa0067f7240bca8b84a2d6d209919%2Fe7a8bc6e60074702a35620eb622af786?format=webp&width=800",
      "https://cdn.builder.io/api/v1/image/assets%2Ff31aa0067f7240bca8b84a2d6d209919%2F4573685d3b664853845521b00c7c1af4?format=webp&width=800",
      "https://cdn.builder.io/api/v1/image/assets%2Ff31aa0067f7240bca8b84a2d6d209919%2Fe51bcf82f4d14907a2aef17e28483c47?format=webp&width=800",
      "https://cdn.builder.io/api/v1/image/assets%2Ff31aa0067f7240bca8b84a2d6d209919%2Fbf958ed6b18d4d95b00b7b6ff14f71dd?format=webp&width=800",
      "https://cdn.builder.io/api/v1/image/assets%2Ff31aa0067f7240bca8b84a2d6d209919%2F86886dbec71c4db7bac2e1c32e664c91?format=webp&width=800",
    ];

    const textPositions = [
      { left: "45%", top: "18%", color: "#CD7D25" },
      { left: "45.5%", top: "21.5%", color: "#FFF" },
      { left: "350px", top: "610px", color: "#FFF" },
      { left: "52%", top: "58px", color: "#FFF" },
      { left: "45%", top: "65px", color: "#FFF" },
      { left: "48%", top: "56px", color: "#FFF" },
    ];

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
        {/* Logo - ثابت كما طلبت */}
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
                {/* تصميم 1: الفوانيس - نص في الأعلى يسار */}
                <button
                  onClick={() => handleDesignSelect(0)}
                  className={`relative glass-input rounded-2xl p-0 border min-h-[300px] overflow-hidden transition-all duration-200 hover:scale-105 ${
                    selectedDesign === 0
                      ? "border-blue-400 border-2"
                      : "border-white/30"
                  }`}
                >
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2Ff31aa0067f7240bca8b84a2d6d209919%2F0f6d408a380b4e768b567e471bda4422?format=webp&width=800"
                    alt="تصميم الفوانيس"
                    className="w-full h-full object-cover rounded-2xl mx-auto"
                  />
                  <div
                    className="absolute"
                    style={{
                      left: "45%",
                      top: "22%",
                      transform: "translateX(-50%)",
                    }}
                  >
                    <span
                      style={{
                        color: "#CD7D25",
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

                {/* تصميم 2: الكرة الأرضية الليلية - نص في الوسط */}
                <button
                  onClick={() => handleDesignSelect(1)}
                  className={`relative glass-input rounded-2xl p-0 border min-h-[300px] overflow-hidden transition-all duration-200 hover:scale-105 ${
                    selectedDesign === 1
                      ? "border-blue-400 border-2"
                      : "border-white/30"
                  }`}
                >
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2Ff31aa0067f7240bca8b84a2d6d209919%2Fe7a8bc6e60074702a35620eb622af786?format=webp&width=800"
                    alt="تصميم الكرة الأرضية الليلية"
                    className="w-full h-full object-cover rounded-2xl mx-auto"
                  />
                  <div
                    className="absolute top-[24.5%] left-[45.5%] transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      paddingLeft: "-3px",
                    }}
                  >
                    <span
                      style={{
                        color: "#FFF",
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

                {/* تصميم 3: المباني التراثية - نص في ا��وسط */}
                <button
                  onClick={() => handleDesignSelect(2)}
                  className={`relative glass-input rounded-2xl p-0 border min-h-[300px] overflow-hidden transition-all duration-200 hover:scale-105 ${
                    selectedDesign === 2
                      ? "border-orange-400 border-2"
                      : "border-white/30"
                  }`}
                >
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2Ff31aa0067f7240bca8b84a2d6d209919%2F4573685d3b664853845521b00c7c1af4?format=webp&width=800"
                    alt="تصميم المباني التراثية"
                    className="w-full h-[350px] object-cover rounded-2xl mx-auto"
                  />
                  <div
                    className="absolute transform -translate-x-1/2"
                    style={{
                      top: "325px",
                      left: "45%",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        color: "#FFF",
                        fontFamily:
                          "KO Aynama, Amiri, Scheherazade New, Noto Naskh Arabic, Cairo, system-ui, sans-serif",
                        fontSize: "16px",
                        fontWeight: "500",
                        fontStyle: "normal",
                        // border:"solid 1px red",
                      }}
                    >
                      {name || "عبدالوهاب عبدالعزيز"}
                    </span>
                  </div>
                </button>

                {/* تصميم 4: الأطفال مع الخراف ال��هارية - نص في الأعلى */}
                <button
                  onClick={() => handleDesignSelect(3)}
                  className={`relative glass-input rounded-2xl p-0 border min-h-[300px] overflow-hidden transition-all duration-200 hover:scale-105 ${
                    selectedDesign === 3
                      ? "border-white border-2"
                      : "border-white/30"
                  }`}
                >
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2Ff31aa0067f7240bca8b84a2d6d209919%2Fe51bcf82f4d14907a2aef17e28483c47?format=webp&width=800"
                    alt="تصميم الأطفال مع الخراف النهارية"
                    className="w-full h-full object-cover rounded-2xl mx-auto"
                  />
                  <div
                    className="absolute top-[87px] left-[52%] transform -translate-x-1/2"
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        color: "#FFF",
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

                {/* تصميم 5: النافورة الليلية - نص في الأسفل */}
                <button
                  onClick={() => handleDesignSelect(4)}
                  className={`relative glass-input rounded-2xl p-0 border min-h-[300px] overflow-hidden transition-all duration-200 hover:scale-105 ${
                    selectedDesign === 4
                      ? "border-blue-400 border-2"
                      : "border-white/30"
                  }`}
                >
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2Ff31aa0067f7240bca8b84a2d6d209919%2Fbf958ed6b18d4d95b00b7b6ff14f71dd?format=webp&width=800"
                    alt="تصميم النافورة الليلية"
                    className="w-full h-full object-cover rounded-2xl mx-auto"
                  />
                  <div
                    className="absolute transform -translate-x-1/2"
                    style={{
                      top: "90px",
                      left: "45%",
                    }}
                  >
                    <span
                      style={{
                        color: "#FFF",
                        fontFamily:
                          "KO Aynama, Amiri, Scheherazade New, Noto Naskh Arabic, Cairo, system-ui, sans-serif",
                        fontSize: "16px",
                        fontWeight: "500",
                        fontStyle: "normal",
                        // border: "solid 2px red"
                                               
                        
                      }}
                    >
                      {name || "عبدوالوهاب عبدالعزيز"}
                    </span>
                  </div>
                </button>

                {/* تصميم 6: الكرة الأرضية مع الأطفال - نص في الأعلى */}
                <button
                  onClick={() => handleDesignSelect(5)}
                  className={`relative glass-input rounded-2xl p-0 border min-h-[300px] overflow-hidden transition-all duration-200 hover:scale-105 ${
                    selectedDesign === 5
                      ? "border-blue-400 border-2"
                      : "border-white/30"
                  }`}
                >
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2Ff31aa0067f7240bca8b84a2d6d209919%2F86886dbec71c4db7bac2e1c32e664c91?format=webp&width=800"
                    alt="تصميم الكرة الأرضية مع الأطف��ل"
                    className="w-full h-full object-cover rounded-2xl mx-auto"
                  />
                  <div
                    className="absolute top-[25%] left-[48%] transform -translate-x-1/2"
                    style={{
                      paddingLeft: "-5px",
                    }}
                  >
                    <span
                      style={{
                        color: "#FFF",
                        fontFamily:
                          "KO Aynama, Amiri, Scheherazade New, Noto Naskh Arabic, Cairo, system-ui, sans-serif",
                        fontSize: "16px",
                        fontWeight: "500",
                        fontStyle: "normal",
                        // border:"solid 1px red",
                        
                      }}
                    >
                      {name || "عبدوالوهاب عبدالعزيز"}
                    </span>
                  </div>
                </button>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-center gap-4 pt-4">
                {/* Back Button */}
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
