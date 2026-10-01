// GENERATED FILE - DO NOT EDIT MANUALLY
// Run: node sync_themes.js (in the repo root) to update.
export interface BioStoreTheme {
  id: string;
  name: string;
  category: string;
  colors: {
    backgroundColor: string;
    textColor: string;
    cardColor: string;
    buttonColor: string;
    buttonTextColor: string;
    accentColor?: string;
    mutedColor?: string;
  };
  typography: {
    fontFamily: string;
    headingFont?: string;
  };
  styles: {
    buttonStyle: "filled" | "outline" | "glass";
    spacing: string;
    shadowStyle: string;
    buttonRadius: number;
    cardRadius: number;
    avatarBorder: number;
    iconStyle: string;
    bgEffect: string;
  };
}

export const bioStoreThemes: BioStoreTheme[] = [
  {
    "id": "arctic",
    "name": "Arctic",
    "category": "Light",
    "colors": {
      "backgroundColor": "linear-gradient(180deg, #ffffff 0%, #eef3f9 100%)",
      "textColor": "#0f172a",
      "cardColor": "rgba(15, 23, 42, 0.04)",
      "buttonColor": "linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)",
      "buttonTextColor": "#ffffff",
      "accentColor": "#0ea5e9",
      "mutedColor": "#64748b"
    },
    "typography": {
      "fontFamily": "Inter",
      "headingFont": "Space Grotesk"
    },
    "styles": {
      "buttonStyle": "filled",
      "spacing": "comfortable",
      "shadowStyle": "soft",
      "buttonRadius": 16,
      "cardRadius": 20,
      "avatarBorder": 3,
      "iconStyle": "solid",
      "bgEffect": "snow"
    }
  },
  {
    "id": "aurora",
    "name": "Aurora",
    "category": "Dark",
    "colors": {
      "backgroundColor": "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
      "textColor": "#e0f7fa",
      "cardColor": "rgba(224, 247, 250, 0.08)",
      "buttonColor": "linear-gradient(135deg, #00e5ff 0%, #2979ff 100%)",
      "buttonTextColor": "#06121f",
      "accentColor": "#00e5ff",
      "mutedColor": "#9fb3c8"
    },
    "typography": {
      "fontFamily": "Inter",
      "headingFont": "Sora"
    },
    "styles": {
      "buttonStyle": "filled",
      "spacing": "comfortable",
      "shadowStyle": "glow",
      "buttonRadius": 18,
      "cardRadius": 20,
      "avatarBorder": 2,
      "iconStyle": "solid",
      "bgEffect": "blobs"
    }
  },
  {
    "id": "brutal",
    "name": "Brutal",
    "category": "Solid",
    "colors": {
      "backgroundColor": "#fdf4df",
      "textColor": "#000000",
      "cardColor": "#ffffff",
      "buttonColor": "#facc15",
      "buttonTextColor": "#000000",
      "accentColor": "#ff5a1f",
      "mutedColor": "#44403c"
    },
    "typography": {
      "fontFamily": "Space Grotesk",
      "headingFont": "Space Grotesk"
    },
    "styles": {
      "buttonStyle": "filled",
      "spacing": "comfortable",
      "shadowStyle": "hard",
      "buttonRadius": 0,
      "cardRadius": 0,
      "avatarBorder": 4,
      "iconStyle": "solid",
      "bgEffect": "none"
    }
  },
  {
    "id": "candy",
    "name": "Candy",
    "category": "Vibrant",
    "colors": {
      "backgroundColor": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "textColor": "#ffffff",
      "cardColor": "rgba(255, 255, 255, 0.18)",
      "buttonColor": "#ffffff",
      "buttonTextColor": "#d6336c",
      "accentColor": "#ffe066",
      "mutedColor": "rgba(255, 255, 255, 0.82)"
    },
    "typography": {
      "fontFamily": "Inter",
      "headingFont": "Unbounded"
    },
    "styles": {
      "buttonStyle": "filled",
      "spacing": "comfortable",
      "shadowStyle": "soft",
      "buttonRadius": 28,
      "cardRadius": 24,
      "avatarBorder": 3,
      "iconStyle": "solid",
      "bgEffect": "bubbles"
    }
  },
  {
    "id": "cherry",
    "name": "Cherry",
    "category": "Dark",
    "colors": {
      "backgroundColor": "linear-gradient(160deg, #1a0a0f 0%, #2d0b16 100%)",
      "textColor": "#ffe4ec",
      "cardColor": "rgba(255, 228, 236, 0.06)",
      "buttonColor": "linear-gradient(135deg, #ff4d6d 0%, #c9184a 100%)",
      "buttonTextColor": "#ffffff",
      "accentColor": "#ff4d6d",
      "mutedColor": "#c08497"
    },
    "typography": {
      "fontFamily": "Inter",
      "headingFont": "Playfair Display"
    },
    "styles": {
      "buttonStyle": "filled",
      "spacing": "comfortable",
      "shadowStyle": "glow",
      "buttonRadius": 24,
      "cardRadius": 20,
      "avatarBorder": 2,
      "iconStyle": "solid",
      "bgEffect": "blobs"
    }
  },
  {
    "id": "cyberpunk",
    "name": "Cyberpunk",
    "category": "Dark",
    "colors": {
      "backgroundColor": "linear-gradient(135deg, #0d0221 0%, #190b2e 100%)",
      "textColor": "#e0faff",
      "cardColor": "rgba(0, 240, 255, 0.05)",
      "buttonColor": "linear-gradient(135deg, #00f0ff 0%, #ff00e5 100%)",
      "buttonTextColor": "#05010a",
      "accentColor": "#00f0ff",
      "mutedColor": "#8aa0b2"
    },
    "typography": {
      "fontFamily": "Inter",
      "headingFont": "Space Grotesk"
    },
    "styles": {
      "buttonStyle": "filled",
      "spacing": "comfortable",
      "shadowStyle": "neon",
      "buttonRadius": 6,
      "cardRadius": 10,
      "avatarBorder": 2,
      "iconStyle": "solid",
      "bgEffect": "grid"
    }
  },
  {
    "id": "emerald",
    "name": "Emerald",
    "category": "Dark",
    "colors": {
      "backgroundColor": "linear-gradient(160deg, #021b12 0%, #064e3b 100%)",
      "textColor": "#d1fae5",
      "cardColor": "rgba(209, 250, 229, 0.07)",
      "buttonColor": "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      "buttonTextColor": "#022c22",
      "accentColor": "#34d399",
      "mutedColor": "#8bbfa8"
    },
    "typography": {
      "fontFamily": "Figtree",
      "headingFont": "Fraunces"
    },
    "styles": {
      "buttonStyle": "filled",
      "spacing": "comfortable",
      "shadowStyle": "glow",
      "buttonRadius": 18,
      "cardRadius": 20,
      "avatarBorder": 2,
      "iconStyle": "solid",
      "bgEffect": "blobs"
    }
  },
  {
    "id": "fire",
    "name": "Fire",
    "category": "Vibrant",
    "colors": {
      "backgroundColor": "linear-gradient(160deg, #1a0600 0%, #2b0a00 100%)",
      "textColor": "#fff0e6",
      "cardColor": "rgba(255, 120, 40, 0.08)",
      "buttonColor": "linear-gradient(135deg, #f83600 0%, #fe8c00 100%)",
      "buttonTextColor": "#1a0600",
      "accentColor": "#ff6b00",
      "mutedColor": "#c99a86"
    },
    "typography": {
      "fontFamily": "Inter",
      "headingFont": "Syne"
    },
    "styles": {
      "buttonStyle": "filled",
      "spacing": "comfortable",
      "shadowStyle": "neon",
      "buttonRadius": 14,
      "cardRadius": 16,
      "avatarBorder": 2,
      "iconStyle": "solid",
      "bgEffect": "particles"
    }
  },
  {
    "id": "forest",
    "name": "Forest",
    "category": "Nature",
    "colors": {
      "backgroundColor": "linear-gradient(160deg, #0b2818 0%, #14432a 100%)",
      "textColor": "#eafaf1",
      "cardColor": "rgba(234, 250, 241, 0.06)",
      "buttonColor": "linear-gradient(135deg, #2d6a4f 0%, #40916c 100%)",
      "buttonTextColor": "#f0fff4",
      "accentColor": "#95d5b2",
      "mutedColor": "#9bb8a9"
    },
    "typography": {
      "fontFamily": "Figtree",
      "headingFont": "Fraunces"
    },
    "styles": {
      "buttonStyle": "filled",
      "spacing": "comfortable",
      "shadowStyle": "soft",
      "buttonRadius": 16,
      "cardRadius": 20,
      "avatarBorder": 2,
      "iconStyle": "solid",
      "bgEffect": "blobs"
    }
  },
  {
    "id": "galaxy",
    "name": "Galaxy",
    "category": "Dark",
    "colors": {
      "backgroundColor": "linear-gradient(160deg, #0b0033 0%, #1b0a4e 60%, #2d1b4e 100%)",
      "textColor": "#ede9fe",
      "cardColor": "rgba(237, 233, 254, 0.07)",
      "buttonColor": "linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)",
      "buttonTextColor": "#ffffff",
      "accentColor": "#a78bfa",
      "mutedColor": "#a39bc8"
    },
    "typography": {
      "fontFamily": "Inter",
      "headingFont": "Sora"
    },
    "styles": {
      "buttonStyle": "filled",
      "spacing": "comfortable",
      "shadowStyle": "glow",
      "buttonRadius": 16,
      "cardRadius": 20,
      "avatarBorder": 2,
      "iconStyle": "solid",
      "bgEffect": "stars"
    }
  },
  {
    "id": "glass",
    "name": "Glass",
    "category": "Dark",
    "colors": {
      "backgroundColor": "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
      "textColor": "#f8fafc",
      "cardColor": "rgba(255, 255, 255, 0.08)",
      "buttonColor": "rgba(255, 255, 255, 0.14)",
      "buttonTextColor": "#f8fafc",
      "accentColor": "#818cf8",
      "mutedColor": "#94a3b8"
    },
    "typography": {
      "fontFamily": "Inter",
      "headingFont": "Sora"
    },
    "styles": {
      "buttonStyle": "glass",
      "spacing": "comfortable",
      "shadowStyle": "glass",
      "buttonRadius": 20,
      "cardRadius": 24,
      "avatarBorder": 1,
      "iconStyle": "solid",
      "bgEffect": "blobs"
    }
  },
  {
    "id": "lavender",
    "name": "Lavender",
    "category": "Soft",
    "colors": {
      "backgroundColor": "linear-gradient(180deg, #f5f3ff 0%, #ede9fe 100%)",
      "textColor": "#3b0764",
      "cardColor": "rgba(59, 7, 100, 0.05)",
      "buttonColor": "linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)",
      "buttonTextColor": "#ffffff",
      "accentColor": "#8b5cf6",
      "mutedColor": "#7c6a93"
    },
    "typography": {
      "fontFamily": "Plus Jakarta Sans",
      "headingFont": "Plus Jakarta Sans"
    },
    "styles": {
      "buttonStyle": "filled",
      "spacing": "comfortable",
      "shadowStyle": "soft",
      "buttonRadius": 24,
      "cardRadius": 22,
      "avatarBorder": 3,
      "iconStyle": "solid",
      "bgEffect": "blobs"
    }
  },
  {
    "id": "midnight",
    "name": "Midnight",
    "category": "Dark",
    "colors": {
      "backgroundColor": "linear-gradient(180deg, #0a0a0f 0%, #111118 100%)",
      "textColor": "#fafafa",
      "cardColor": "rgba(255, 255, 255, 0.05)",
      "buttonColor": "#fafafa",
      "buttonTextColor": "#0a0a0f",
      "accentColor": "#6366f1",
      "mutedColor": "#a1a1aa"
    },
    "typography": {
      "fontFamily": "Inter",
      "headingFont": "Space Grotesk"
    },
    "styles": {
      "buttonStyle": "filled",
      "spacing": "comfortable",
      "shadowStyle": "soft",
      "buttonRadius": 14,
      "cardRadius": 16,
      "avatarBorder": 0,
      "iconStyle": "solid",
      "bgEffect": "grid"
    }
  },
  {
    "id": "mono",
    "name": "Mono",
    "category": "Light",
    "colors": {
      "backgroundColor": "#ffffff",
      "textColor": "#111111",
      "cardColor": "rgba(0, 0, 0, 0.04)",
      "buttonColor": "#111111",
      "buttonTextColor": "#ffffff",
      "accentColor": "#111111",
      "mutedColor": "#6b7280"
    },
    "typography": {
      "fontFamily": "DM Sans",
      "headingFont": "DM Serif Display"
    },
    "styles": {
      "buttonStyle": "filled",
      "spacing": "spacious",
      "shadowStyle": "none",
      "buttonRadius": 8,
      "cardRadius": 12,
      "avatarBorder": 0,
      "iconStyle": "outline",
      "bgEffect": "none"
    }
  },
  {
    "id": "neon",
    "name": "Neon",
    "category": "Dark",
    "colors": {
      "backgroundColor": "linear-gradient(135deg, #0a0014 0%, #120024 100%)",
      "textColor": "#f0f0ff",
      "cardColor": "rgba(247, 37, 133, 0.06)",
      "buttonColor": "linear-gradient(135deg, #f72585 0%, #7209b7 100%)",
      "buttonTextColor": "#ffffff",
      "accentColor": "#f72585",
      "mutedColor": "#9a8fb0"
    },
    "typography": {
      "fontFamily": "Inter",
      "headingFont": "Syne"
    },
    "styles": {
      "buttonStyle": "filled",
      "spacing": "comfortable",
      "shadowStyle": "neon",
      "buttonRadius": 12,
      "cardRadius": 16,
      "avatarBorder": 2,
      "iconStyle": "solid",
      "bgEffect": "grid"
    }
  },
  {
    "id": "ocean",
    "name": "Ocean",
    "category": "Gradient",
    "colors": {
      "backgroundColor": "linear-gradient(160deg, #0b486b 0%, #2193b0 100%)",
      "textColor": "#f0fbff",
      "cardColor": "rgba(255, 255, 255, 0.1)",
      "buttonColor": "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)",
      "buttonTextColor": "#ffffff",
      "accentColor": "#00c6ff",
      "mutedColor": "#bcdfe9"
    },
    "typography": {
      "fontFamily": "Inter",
      "headingFont": "Outfit"
    },
    "styles": {
      "buttonStyle": "filled",
      "spacing": "comfortable",
      "shadowStyle": "soft",
      "buttonRadius": 20,
      "cardRadius": 22,
      "avatarBorder": 3,
      "iconStyle": "solid",
      "bgEffect": "bubbles"
    }
  },
  {
    "id": "rose",
    "name": "Rose",
    "category": "Light",
    "colors": {
      "backgroundColor": "linear-gradient(180deg, #fff1f2 0%, #ffe4e6 100%)",
      "textColor": "#4c0519",
      "cardColor": "rgba(76, 5, 25, 0.05)",
      "buttonColor": "linear-gradient(135deg, #fb7185 0%, #e11d48 100%)",
      "buttonTextColor": "#ffffff",
      "accentColor": "#e11d48",
      "mutedColor": "#9f5a6b"
    },
    "typography": {
      "fontFamily": "Figtree",
      "headingFont": "Fraunces"
    },
    "styles": {
      "buttonStyle": "filled",
      "spacing": "comfortable",
      "shadowStyle": "soft",
      "buttonRadius": 24,
      "cardRadius": 24,
      "avatarBorder": 3,
      "iconStyle": "solid",
      "bgEffect": "blobs"
    }
  },
  {
    "id": "royal",
    "name": "Royal",
    "category": "Dark",
    "colors": {
      "backgroundColor": "linear-gradient(160deg, #1a0b2e 0%, #2d1b4e 100%)",
      "textColor": "#f3e8ff",
      "cardColor": "rgba(243, 232, 255, 0.07)",
      "buttonColor": "linear-gradient(135deg, #a855f7 0%, #6d28d9 100%)",
      "buttonTextColor": "#ffffff",
      "accentColor": "#fbbf24",
      "mutedColor": "#b3a3c9"
    },
    "typography": {
      "fontFamily": "Inter",
      "headingFont": "Playfair Display"
    },
    "styles": {
      "buttonStyle": "filled",
      "spacing": "comfortable",
      "shadowStyle": "glow",
      "buttonRadius": 16,
      "cardRadius": 20,
      "avatarBorder": 2,
      "iconStyle": "solid",
      "bgEffect": "stars"
    }
  },
  {
    "id": "sand",
    "name": "Sand",
    "category": "Light",
    "colors": {
      "backgroundColor": "linear-gradient(180deg, #faf3e0 0%, #f0e2c4 100%)",
      "textColor": "#3d2b1f",
      "cardColor": "rgba(61, 43, 31, 0.05)",
      "buttonColor": "linear-gradient(135deg, #d99a6c 0%, #a85b3b 100%)",
      "buttonTextColor": "#fff8ef",
      "accentColor": "#c2714f",
      "mutedColor": "#8a7461"
    },
    "typography": {
      "fontFamily": "Figtree",
      "headingFont": "Fraunces"
    },
    "styles": {
      "buttonStyle": "filled",
      "spacing": "comfortable",
      "shadowStyle": "soft",
      "buttonRadius": 18,
      "cardRadius": 20,
      "avatarBorder": 2,
      "iconStyle": "solid",
      "bgEffect": "none"
    }
  },
  {
    "id": "sunset",
    "name": "Sunset",
    "category": "Warm",
    "colors": {
      "backgroundColor": "linear-gradient(160deg, #ff512f 0%, #dd2476 100%)",
      "textColor": "#fff5f0",
      "cardColor": "rgba(255, 255, 255, 0.12)",
      "buttonColor": "#ffffff",
      "buttonTextColor": "#dd2476",
      "accentColor": "#ffd166",
      "mutedColor": "rgba(255, 245, 240, 0.78)"
    },
    "typography": {
      "fontFamily": "Inter",
      "headingFont": "Outfit"
    },
    "styles": {
      "buttonStyle": "filled",
      "spacing": "comfortable",
      "shadowStyle": "soft",
      "buttonRadius": 22,
      "cardRadius": 24,
      "avatarBorder": 3,
      "iconStyle": "solid",
      "bgEffect": "blobs"
    }
  }
];
