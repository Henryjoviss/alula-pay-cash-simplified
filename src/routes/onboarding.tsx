import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Landmark, MapPin, ShieldCheck, Timer, Zap, CircleCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PhoneFrame } from "@/components/PhoneFrame";
import { useApp } from "@/lib/app-state";
import screen1 from "@/assets/onboarding-screen-1.png.asset.json";
import screen2 from "@/assets/onboarding-screen-2.png.asset.json";
import screen3 from "@/assets/onboarding-screen-3.png.asset.json";
import screen4 from "@/assets/onboarding-screen-4.png.asset.json";
import screen5 from "@/assets/onboarding-screen-5.png.asset.json";
import screen6 from "@/assets/onboarding-screen-6.png.asset.json";
import hero1 from "@/assets/onb-hero-1.jpg";
import hero2 from "@/assets/onb-hero-2.jpg";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Get started with Alula Pay" },
      { name: "description", content: "Set up Alula Pay in a few simple steps." },
      { property: "og:title", content: "Get started with Alula Pay" },
      { property: "og:description", content: "Set up Alula Pay in a few simple steps." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700&display=swap",
      },
    ],
  }),
  component: Onboarding,
});

const screens = [screen1.url, screen2.url, screen3.url, screen4.url, screen5.url, screen6.url];
const screenRatios = [853 / 1844, 852 / 1846, 853 / 1844, 852 / 1332, 843 / 1866, 852 / 1846];
const SCREEN_ALT = "Alula Pay onboarding screen";

const FONT = "'Manrope', system-ui, -apple-system, sans-serif";

type Slide = {
  image: string;
  title: string;
  body: string;
  features: { icon: LucideIcon; label: string }[];
};

const slides: Slide[] = [
  {
    image: hero1,
    title: "Send money to any bank in seconds",
    body: "Fast, secure and made for the way you live.",
    features: [
      { icon: Zap, label: "Fast Transfers" },
      { icon: ShieldCheck, label: "Secure & Trusted" },
      { icon: Landmark, label: "Any Bank. Anytime." },
    ],
  },
  {
    image: hero2,
    title: "Find vouchers near you",
    body: "From local shops to trusted partners. Get one in seconds.",
    features: [
      { icon: MapPin, label: "Near You" },
      { icon: Timer, label: "Quick & Easy" },
      { icon: CircleCheck, label: "Trusted Partners" },
    ],
  },
];

function SlideView({ index, onNext }: { index: number; onNext: () => void }) {
  const slide = slides[index];
  return (
    <div
      className="flex h-full w-full flex-col overflow-y-auto bg-white"
      style={{ fontFamily: FONT }}
    >
      <img src={slide.image} alt="" className="block h-auto w-full select-none" />

      <div className="px-6 pt-6">
        <h1
          className="text-balance text-left"
          style={{
            fontFamily: FONT,
            fontWeight: 700,
            fontSize: 28,
            lineHeight: "34px",
            letterSpacing: "-0.5px",
            color: "#101828",
          }}
        >
          {slide.title}
        </h1>
        <p
          className="mt-2 text-left"
          style={{
            fontFamily: FONT,
            fontWeight: 400,
            fontSize: 16,
            lineHeight: "24px",
            letterSpacing: 0,
            color: "#667085",
          }}
        >
          {slide.body}
        </p>

        <div className="mt-6 grid grid-cols-3 gap-2 rounded-3xl bg-[#F4F7FC] px-2 py-4">
          {slide.features.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2358E6]">
                <Icon className="h-5 w-5 text-white" strokeWidth={2} />
              </div>
              <span
                style={{
                  fontFamily: FONT,
                  fontWeight: 600,
                  fontSize: 14,
                  lineHeight: "20px",
                  letterSpacing: "-0.1px",
                  color: "#101828",
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between pb-8">
          <div className="flex items-center gap-2" aria-hidden="true">
            {[0, 1, 2].map((dot) => (
              <span
                key={dot}
                style={{
                  height: 8,
                  width: dot === index ? 32 : 8,
                  borderRadius: 4,
                  backgroundColor: dot === index ? "#2358E6" : "#EDF2F8",
                }}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={onNext}
            className="inline-flex h-[52px] min-w-[112px] items-center justify-center gap-3 rounded-full px-5 shadow-[0_10px_24px_-8px_rgba(35,88,230,0.55)]"
            style={{
              backgroundColor: "#2358E6",
              color: "#FFFFFF",
              fontFamily: FONT,
              fontWeight: 600,
              fontSize: 18,
              lineHeight: "24px",
              letterSpacing: 0,
            }}
          >
            Next
            <ArrowRight className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}

function Onboarding() {
  const navigate = useNavigate();
  const { setOnboarded } = useApp();
  const [screen, setScreen] = useState(0);
  const [googleEmail, setGoogleEmail] = useState("");
  const [hypePhase, setHypePhase] = useState(0);

  useEffect(() => {
    if (screen !== 3) return;
    const interval = window.setInterval(() => setHypePhase((phase) => (phase + 1) % 4), 450);
    const timeout = window.setTimeout(() => setScreen(4), 5000);
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, [screen]);

  const goToSignup = () => {
    if (googleEmail.trim()) {
      window.sessionStorage.setItem("alula-google-email", googleEmail.trim());
    }
    setOnboarded(true);
    navigate({ to: "/signup" });
  };

  const next = () => {
    if (screen < 2) setScreen((current) => current + 1);
    else if (screen === 2) setScreen(3);
  };

  const backToAccountChoices = () => {
    setGoogleEmail("");
    setScreen(4);
  };

  if (screen < slides.length) {
    return (
      <PhoneFrame>
        <SlideView index={screen} onNext={next} />
      </PhoneFrame>
    );
  }

  return (
    <PhoneFrame>
      <div className="relative flex h-full min-h-full items-center justify-center overflow-hidden bg-background">
        {screen < 4 && (
          <>
            <img
              src={screens[screen]}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover object-top opacity-55 blur-[32px]"
            />
            <div className="pointer-events-none absolute inset-0 bg-background/25" />
          </>
        )}
        {screen === 4 && <div className="pointer-events-none absolute inset-0 bg-gold" />}
        <div
          className={screen === 3
            ? "relative h-full w-full"
            : "relative z-10 max-h-[calc(100%+12px)] max-w-full -translate-y-1.5 overflow-hidden shadow-[0_32px_90px_-18px_rgba(0,0,0,0.55),0_12px_32px_-10px_rgba(0,0,0,0.28)]"}
          style={screen === 3 ? undefined : {
            aspectRatio: `${screenRatios[screen]}`,
            width: `min(100%, calc((min(100dvh, 860px) + 12px) * ${screenRatios[screen]}))`,
          }}
        >
          <img
            src={screens[screen]}
            alt={SCREEN_ALT}
            className={screen < 3
              ? "absolute -left-[2%] top-0 block h-auto w-[104%] max-w-none select-none"
              : `absolute inset-0 block h-full w-full select-none ${screen === 3 ? "object-cover object-bottom" : "object-contain"}`}
            style={screen === 3 ? {
              filter: `hue-rotate(${[-4, 8, -7, 5][hypePhase]}deg) saturate(${[1, 1.08, 0.94, 1.06][hypePhase]})`,
              transition: "filter 420ms ease-in-out",
            } : undefined}
          />

          {screen < 3 && (
            <>
              <Button
                type="button"
                variant="ghost"
                aria-label={screen === 2 ? "Get started" : "Next"}
                onClick={next}
                className="absolute left-[7.5%] top-[90.5%] h-[6.8%] w-[85%] rounded-full bg-transparent p-0 text-transparent shadow-none hover:bg-transparent"
              />
            </>
          )}

          {screen === 4 && (
            <>
              <Button
                type="button"
                variant="ghost"
                aria-label="Open an account"
                onClick={() => navigate({ to: "/signup" })}
                className="absolute left-[8%] top-[60.1%] h-[6.6%] w-[46%] rounded-full bg-transparent p-0 text-transparent shadow-none hover:bg-transparent"
              />
              <Button
                type="button"
                variant="ghost"
                aria-label="I already have an account"
                onClick={() => navigate({ to: "/login" })}
                className="absolute right-[8%] top-[60.1%] h-[6.6%] w-[34%] rounded-full bg-transparent p-0 text-transparent shadow-none hover:bg-transparent"
              />
              <Button
                type="button"
                variant="ghost"
                aria-label="Continue with Google"
                onClick={() => setScreen(5)}
                className="absolute left-[8%] top-[75.9%] h-[7%] w-[84%] rounded-full bg-transparent p-0 text-transparent shadow-none hover:bg-transparent"
              />
              <Button
                type="button"
                variant="ghost"
                aria-label="Continue with Apple"
                onClick={() => navigate({ to: "/signup" })}
                className="absolute left-[8%] top-[84.5%] h-[7%] w-[84%] rounded-full bg-transparent p-0 text-transparent shadow-none hover:bg-transparent"
              />
            </>
          )}

          {screen === 5 && (
            <>
              <input
                aria-label="Email or phone"
                type="email"
                value={googleEmail}
                onChange={(event) => setGoogleEmail(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && googleEmail.trim()) goToSignup();
                }}
                className="absolute left-[9.5%] top-[40.1%] h-[6.4%] w-[81%] rounded-lg px-6 text-[16px] text-[#202124] outline-none"
                style={{ backgroundColor: googleEmail ? "#FBFBFB" : "transparent" }}
              />

              <Button
                type="button"
                variant="ghost"
                aria-label="Continue with email"
                disabled={!googleEmail.trim()}
                onClick={goToSignup}
                className="absolute left-[9.5%] top-[70.4%] h-[7%] w-[82%] rounded-full bg-transparent p-0 text-transparent shadow-none hover:bg-transparent disabled:opacity-100"
              />
              <Button
                type="button"
                variant="ghost"
                aria-label="Back to account choices"
                onClick={backToAccountChoices}
                className="absolute left-[4%] top-[8%] h-[7%] w-[12%] bg-transparent p-0 text-transparent shadow-none hover:bg-transparent"
              />
            </>
          )}
        </div>
      </div>
    </PhoneFrame>
  );
       }
