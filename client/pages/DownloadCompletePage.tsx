import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DownloadCompletePage() {
  const navigate = useNavigate();

  // Dynamically update isMobile on resize
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth <= 600
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cardStyle = {
    marginTop: isMobile ? 40 : 150,
    background: "rgba(255,255,255,0.25)",
    borderRadius: 24,
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    border: "1px solid rgba(255,255,255,0.18)",
    width: isMobile ? "92vw" : 500,
    height: isMobile ? "auto" : 400,
    padding: isMobile ? "20px 6px" : "32px 16px",
    textAlign: "center",
  };

  const logoStyle = {
    height: isMobile ? 50 : 80,
    width: "auto",
    maxWidth: "90vw",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #1e6bb8 0%, #0a3d62 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "0",
      }}
    >
      {/* Logos Row */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          padding: isMobile ? "16px 0 0 0" : "32px 0 0 0",
        }}
      >
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/44601a5eb5d1394f281854f475784406e2daf9df?width=1009"
          alt="Logo"
          style={logoStyle}
        />
      </div>

      {/* Glassy Card */}
      <div style={cardStyle}>
        <div
          style={{
            color: "#fff",
            fontSize: isMobile ? 24 : 37,
            fontWeight: 700,
            marginBottom: 12,
            marginTop: isMobile ? 20 : 50,
            fontFamily: "Arial, sans-serif",
          }}
        >
          كل عام وأنت إلى الخير 🤍
        </div>
        <div
          style={{
            color: "#fff",
            fontSize: isMobile ? 13 : 16,
            fontWeight: 400,
            marginBottom: 8,
            fontFamily: "Arial, sans-serif",
          }}
        >
          إدارة الذكاء الاصطناعي
        </div>
        <div
          style={{
            color: "#fff",
            fontSize: isMobile ? 11 : 14,
            fontWeight: 400,
            fontFamily: "Arial, sans-serif",
            opacity: 0.85,
            marginBottom: 24,
          }}
        >
          مع تحيات فريق نادي الذكاء الاصطناعي🤖
        </div>
        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: 16,
            padding: isMobile ? "10px 18px" : "12px 32px",
            borderRadius: 24,
            border: "none",
            background: "rgba(255, 255, 255, 0.25)",
            color: "#fff",
            fontSize: isMobile ? 15 : 18,
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(30,107,184,0.15)",
            transition: "background 0.2s",
          }}
        >
          العودة للصفحة الرئيسية
        </button>
      </div>
    </div>
  );
}