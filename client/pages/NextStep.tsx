import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function NextStep() {
  const location = useLocation();
  const navigate = useNavigate();
  const name = location.state?.name || "";
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleBack = () => {
    navigate("/");
  };

  const handleNext = () => {
    if (!selectedOption) return;

    // Navigate based on selection
    if (selectedOption === "نادي الذكاء الاصطناعي") {
      navigate("/ai-club", { state: { name, selectedOption } });
    } else if (selectedOption === "غير ذالك") {
      navigate("/other-designs", { state: { name, selectedOption } });
    }
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
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
        <div className="w-full max-w-2xl mx-auto px-4 sm:px-6">
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
                    paddingRight: "-4px",
                    paddingLeft: "-4px",
                  }}
                >
                  هل انت من مستفيدين/ اعضاء
                </h1>
              </div>

              {/* Options */}
              <div className="space-y-4">
                {/* AI Club Option */}
                <button
                  onClick={() => handleOptionSelect("نادي الذكاء الاصطناعي")}
                  className={`w-full glass-input rounded-full px-6 py-4 md:px-8 md:py-5 border transition-all duration-200 ${
                    selectedOption === "نادي الذكاء الاصطناعي"
                      ? "border-white/60 bg-white/25"
                      : "border-white/60 hover:border-white/45 hover:bg-white/20"
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
                    نادي الذكاء الاصطناعي
                  </span>
                </button>

                {/* Other Option */}
                <button
                  onClick={() => handleOptionSelect("غير ذالك")}
                  className={`w-full glass-input rounded-full px-6 py-4 md:px-8 md:py-5 border transition-all duration-200 ${
                    selectedOption === "غير ذالك"
                      ? "border-white/60 bg-white/25"
                      : "border-white/60 hover:border-white/45 hover:bg-white/20"
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
                    غير ذالك
                  </span>
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
                      fontFamily:"The Year of The Camel, Scheherazade New, Noto Naskh Arabic, Amiri, Cairo, system-ui, sans-serif",
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
                  disabled={!selectedOption}
                  className={`glass-button rounded-full px-8 py-3 sm:px-12 sm:py-3 md:px-16 md:py-4 border border-white/30 transition-all duration-200 active:scale-95 touch-manipulation min-h-[48px] min-w-[120px] ${
                    selectedOption
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
