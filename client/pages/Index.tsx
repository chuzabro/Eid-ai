import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const [name, setName] = useState("");
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const isArabicText = (text: string) => {
    if (!text) return true; // Empty text is valid
    // Arabic Unicode ranges: U+0600-U+06FF (Arabic), U+0750-U+077F (Arabic Supplement)
    const arabicRegex = /^[\u0600-\u06FF\u0750-\u077F\s]+$/;
    return arabicRegex.test(text);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);

    if (value && !isArabicText(value)) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      return; // Don't submit if name is empty
    }
    if (!isArabicText(name)) {
      setShowError(true);
      return;
    }
    // Navigate to next step with the name
    navigate("/next", { state: { name } });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://cdn.builder.io/api/v1/image/assets%2Ff31aa0067f7240bca8b84a2d6d209919%2Fc705ee0fddff46eaaf94e055c0ae079a?format=webp&width=800')",
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-3 sm:px-4 py-6 sm:py-8"
        style={{ marginTop: "-4px" }}
      >
        {/* Logo */}
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/85715676f15b8c93b0373cad75c744ef44dc219f?width=1009"
          alt="Logo"
          className="h-12 sm:h-16 md:h-20 lg:h-22 w-auto object-contain max-w-[90vw]"
          style={{ marginTop: "-2px" }}
        />
        <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20"></div>

        {/* Main Card */}
        <div className="w-full max-w-2xl mx-auto px-4 sm:px-6">
          <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 border border-white/20 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Main Heading */}
              <div className="text-center">
                <h1
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
                  style={{
                    color: "#FFF",
                    textAlign: "center",
                    fontFamily:
                      "The Year of The Camel, Scheherazade New, Noto Naskh Arabic, Amiri, Cairo, system-ui, sans-serif",
                    fontStyle: "normal",
                    fontWeight: "900",
                    lineHeight: "normal",
                  }}
                >
                  <span style={{ whiteSpace: "preserve" }}>
                    أدخل الاسم الثنائي
                  </span>
                </h1>
              </div>

              {/* Input Field */}
              <div className="space-y-4">
                <div className="glass-input rounded-full px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 border border-white/30">
                  <input
                    type="text"
                    value={name}
                    onChange={handleInputChange}
                    placeholder="اسمك يهمنا!"
                    className="w-full bg-transparent border-none outline-none text-white placeholder-white/75 font-arabic text-base sm:text-lg md:text-xl text-right min-h-[2rem] touch-manipulation"
                    dir="rtl"
                    autoComplete="name"
                    inputMode="text"
                  />
                </div>
                {showError && (
                  <div className="text-center">
                    <p
                      style={{
                        color: "#DF0000",
                        fontFamily:
                          "The Year of The Camel, Scheherazade New, Noto Naskh Arabic, Amiri, Cairo, system-ui, sans-serif",
                        fontSize: "20px",
                        fontStyle: "normal",
                        fontWeight: "500",
                        lineHeight: "100.909%",
                      }}
                    >
                      يا حياتي انقليش 🥺
                    </p>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="glass-button rounded-full px-8 py-3 sm:px-12 sm:py-3 md:px-16 md:py-4 border border-white/30 transition-all duration-200 hover:bg-white/20 active:scale-95 touch-manipulation min-h-[48px] min-w-[120px]"
                >
                  <span className="text-white/75 font-arabic font-medium text-base sm:text-lg md:text-xl">
                    التالي
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
