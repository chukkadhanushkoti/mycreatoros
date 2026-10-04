// GENERATED FILE - DO NOT EDIT MANUALLY
// Run: node sync_themes.js (in the repo root) to update.
export interface BioStoreTheme {
  minPlan?: string;
  enabled?: boolean;
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
    layout?: "classic" | "editorial" | "bento" | "spotlight";
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
    "category": "Standard",
    "colors": {
      "backgroundColor": "#F3F8FA",
      "textColor": "#183042",
      "cardColor": "#FFFFFF",
      "buttonColor": "#215B75",
      "buttonTextColor": "#FFFFFF",
      "accentColor": "#286E85",
      "mutedColor": "#4D6776"
    },
    "typography": {
      "fontFamily": "Inter",
      "headingFont": "Space Grotesk"
    },
    "styles": {
      "buttonStyle": "filled",
      "spacing": "comfortable",
      "shadowStyle": "sm",
      "buttonRadius": 16,
      "cardRadius": 20,
      "avatarBorder": 2,
      "iconStyle": "solid",
      "bgEffect": "none"
    }
  },
  {
    "id": "forest",
    "name": "Forest",
    "category": "Standard",
    "colors": {
      "backgroundColor": "#EDF3EC",
      "textColor": "#203A2C",
      "cardColor": "#FFFFFF",
      "buttonColor": "#27543A",
      "buttonTextColor": "#FFFFFF",
      "accentColor": "#376D4B",
      "mutedColor": "#587061"
    },
    "typography": {
      "fontFamily": "Figtree",
      "headingFont": "Fraunces"
    },
    "styles": {
      "buttonStyle": "filled",
      "spacing": "comfortable",
      "shadowStyle": "soft",
      "buttonRadius": 14,
      "cardRadius": 18,
      "avatarBorder": 2,
      "iconStyle": "solid",
      "bgEffect": "none"
    }
  },
  {
    "id": "midnight",
    "name": "Midnight",
    "category": "Standard",
    "colors": {
      "backgroundColor": "#111827",
      "textColor": "#F9FAFB",
      "cardColor": "#1F2937",
      "buttonColor": "#E5E7EB",
      "buttonTextColor": "#111827",
      "accentColor": "#D1D5DB",
      "mutedColor": "#CBD2DC"
    },
    "typography": {
      "fontFamily": "Inter",
      "headingFont": "Space Grotesk"
    },
    "styles": {
      "buttonStyle": "filled",
      "spacing": "comfortable",
      "shadowStyle": "sm",
      "buttonRadius": 14,
      "cardRadius": 18,
      "avatarBorder": 0,
      "iconStyle": "solid",
      "bgEffect": "none"
    }
  },
  {
    "id": "mono",
    "name": "Mono",
    "category": "Standard",
    "colors": {
      "backgroundColor": "#F8F7F4",
      "textColor": "#242424",
      "cardColor": "#FFFFFF",
      "buttonColor": "#242424",
      "buttonTextColor": "#242424",
      "accentColor": "#242424",
      "mutedColor": "#595955"
    },
    "typography": {
      "fontFamily": "DM Sans",
      "headingFont": "DM Serif Display"
    },
    "styles": {
      "buttonStyle": "outline",
      "spacing": "spacious",
      "shadowStyle": "none",
      "buttonRadius": 12,
      "cardRadius": 18,
      "avatarBorder": 0,
      "iconStyle": "outline",
      "bgEffect": "none"
    }
  },
  {
    "id": "sand",
    "name": "Sand",
    "category": "Standard",
    "colors": {
      "backgroundColor": "#F7F2E8",
      "textColor": "#362B24",
      "cardColor": "#FFFCF7",
      "buttonColor": "#76503A",
      "buttonTextColor": "#FFFFFF",
      "accentColor": "#76503A",
      "mutedColor": "#6E625B"
    },
    "typography": {
      "fontFamily": "Figtree",
      "headingFont": "Fraunces"
    },
    "styles": {
      "buttonStyle": "filled",
      "spacing": "comfortable",
      "shadowStyle": "sm",
      "buttonRadius": 18,
      "cardRadius": 20,
      "avatarBorder": 2,
      "iconStyle": "solid",
      "bgEffect": "none"
    }
  },
  {
    "id": "cherry",
    "name": "Cherry",
    "category": "Aesthetic",
    "colors": {
      "backgroundColor": "#291820",
      "textColor": "#FFF1F3",
      "cardColor": "#3A232D",
      "buttonColor": "#F2B4BF",
      "buttonTextColor": "#341B25",
      "accentColor": "#F2B4BF",
      "mutedColor": "#E0C6CC"
    },
    "typography": {
      "fontFamily": "Inter",
      "headingFont": "Playfair Display"
    },
    "styles": {
      "buttonStyle": "filled",
      "spacing": "comfortable",
      "shadowStyle": "soft",
      "buttonRadius": 20,
      "cardRadius": 24,
      "avatarBorder": 3,
      "iconStyle": "solid",
      "bgEffect": "none"
    }
  },
  {
    "id": "emerald",
    "name": "Emerald",
    "category": "Aesthetic",
    "colors": {
      "backgroundColor": "#E9F4EF",
      "textColor": "#1D3D30",
      "cardColor": "#FFFFFF",
      "buttonColor": "#22644A",
      "buttonTextColor": "#FFFFFF",
      "accentColor": "#22644A",
      "mutedColor": "#587267"
    },
    "typography": {
      "fontFamily": "Figtree",
      "headingFont": "Fraunces"
    },
    "styles": {
      "buttonStyle": "filled",
      "spacing": "comfortable",
      "shadowStyle": "sm",
      "buttonRadius": 20,
      "cardRadius": 24,
      "avatarBorder": 2,
      "iconStyle": "solid",
      "bgEffect": "none"
    }
  },
  {
    "id": "lavender",
    "name": "Lavender",
    "category": "Aesthetic",
    "colors": {
      "backgroundColor": "#F5F2FA",
      "textColor": "#2D2744",
      "cardColor": "#FFFFFF",
      "buttonColor": "#59477C",
      "buttonTextColor": "#FFFFFF",
      "accentColor": "#59477C",
      "mutedColor": "#6E687C"
    },
    "typography": {
      "fontFamily": "Plus Jakarta Sans",
      "headingFont": "Plus Jakarta Sans"
    },
    "styles": {
      "buttonStyle": "outline",
      "spacing": "comfortable",
      "shadowStyle": "none",
      "buttonRadius": 22,
      "cardRadius": 24,
      "avatarBorder": 3,
      "iconStyle": "solid",
      "bgEffect": "none"
    }
  },
  {
    "id": "ocean",
    "name": "Ocean",
    "category": "Aesthetic",
    "colors": {
      "backgroundColor": "#EAF4F3",
      "textColor": "#153B43",
      "cardColor": "#FFFFFF",
      "buttonColor": "#176373",
      "buttonTextColor": "#FFFFFF",
      "accentColor": "#176373",
      "mutedColor": "#506E73"
    },
    "typography": {
      "fontFamily": "Inter",
      "headingFont": "Outfit"
    },
    "styles": {
      "buttonStyle": "filled",
      "spacing": "comfortable",
      "shadowStyle": "soft",
      "buttonRadius": 18,
      "cardRadius": 22,
      "avatarBorder": 2,
      "iconStyle": "solid",
      "bgEffect": "none"
    }
  },
  {
    "id": "rose",
    "name": "Rose",
    "category": "Aesthetic",
    "colors": {
      "backgroundColor": "#FFF4F4",
      "textColor": "#452B32",
      "cardColor": "#FFFFFF",
      "buttonColor": "#8E455C",
      "buttonTextColor": "#FFFFFF",
      "accentColor": "#8E455C",
      "mutedColor": "#745E65"
    },
    "typography": {
      "fontFamily": "Figtree",
      "headingFont": "Fraunces"
    },
    "styles": {
      "buttonStyle": "filled",
      "spacing": "comfortable",
      "shadowStyle": "soft",
      "buttonRadius": 22,
      "cardRadius": 24,
      "avatarBorder": 3,
      "iconStyle": "solid",
      "bgEffect": "none"
    }
  },
  {
    "id": "brutal",
    "name": "Brutal",
    "category": "Bold",
    "colors": {
      "backgroundColor": "#F7F1DC",
      "textColor": "#151515",
      "cardColor": "#FFFFFF",
      "buttonColor": "#E7C45B",
      "buttonTextColor": "#171717",
      "accentColor": "#9F3B24",
      "mutedColor": "#504A42"
    },
    "typography": {
      "fontFamily": "Space Grotesk",
      "headingFont": "Space Grotesk"
    },
    "styles": {
      "buttonStyle": "filled",
      "spacing": "comfortable",
      "shadowStyle": "hard",
      "buttonRadius": 4,
      "cardRadius": 6,
      "avatarBorder": 4,
      "iconStyle": "solid",
      "bgEffect": "none"
    }
  },
  {
    "id": "candy",
    "name": "Candy",
    "category": "Bold",
    "colors": {
      "backgroundColor": "#FFF0E8",
      "textColor": "#4C2D3A",
      "cardColor": "#FFFFFF",
      "buttonColor": "#985069",
      "buttonTextColor": "#FFFFFF",
      "accentColor": "#985069",
      "mutedColor": "#775B64"
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
      "cardRadius": 28,
      "avatarBorder": 3,
      "iconStyle": "solid",
      "bgEffect": "none"
    }
  },
  {
    "id": "cyberpunk",
    "name": "Cyberpunk",
    "category": "Bold",
    "colors": {
      "backgroundColor": "#151C2D",
      "textColor": "#F6F7FB",
      "cardColor": "#243047",
      "buttonColor": "#8ED7D1",
      "buttonTextColor": "#102A2D",
      "accentColor": "#A3DFDA",
      "mutedColor": "#CBD4E0"
    },
    "typography": {
      "fontFamily": "Inter",
      "headingFont": "Space Grotesk"
    },
    "styles": {
      "buttonStyle": "filled",
      "spacing": "comfortable",
      "shadowStyle": "glow",
      "buttonRadius": 10,
      "cardRadius": 16,
      "avatarBorder": 2,
      "iconStyle": "solid",
      "bgEffect": "grid"
    }
  },
  {
    "id": "fire",
    "name": "Fire",
    "category": "Bold",
    "colors": {
      "backgroundColor": "#2C1E19",
      "textColor": "#FFF2E9",
      "cardColor": "#443026",
      "buttonColor": "#F0B66D",
      "buttonTextColor": "#402212",
      "accentColor": "#F0B66D",
      "mutedColor": "#E5C6B6"
    },
    "typography": {
      "fontFamily": "Inter",
      "headingFont": "Syne"
    },
    "styles": {
      "buttonStyle": "filled",
      "spacing": "comfortable",
      "shadowStyle": "md",
      "buttonRadius": 14,
      "cardRadius": 18,
      "avatarBorder": 2,
      "iconStyle": "solid",
      "bgEffect": "none"
    }
  },
  {
    "id": "neon",
    "name": "Neon",
    "category": "Bold",
    "colors": {
      "backgroundColor": "#111024",
      "textColor": "#F7F4FF",
      "cardColor": "#211B38",
      "buttonColor": "#C5F273",
      "buttonTextColor": "#172112",
      "accentColor": "#C5F273",
      "mutedColor": "#CFC7DE"
    },
    "typography": {
      "fontFamily": "Inter",
      "headingFont": "Syne"
    },
    "styles": {
      "buttonStyle": "filled",
      "spacing": "comfortable",
      "shadowStyle": "glow",
      "buttonRadius": 16,
      "cardRadius": 20,
      "avatarBorder": 2,
      "iconStyle": "solid",
      "bgEffect": "none"
    }
  },
  {
    "id": "aurora",
    "name": "Aurora",
    "category": "Signature",
    "colors": {
      "backgroundColor": "linear-gradient(180deg, #141F2D 0%, #233A43 100%)",
      "textColor": "#F6FBF8",
      "cardColor": "rgba(255,255,255,0.09)",
      "buttonColor": "#D4E9D9",
      "buttonTextColor": "#193027",
      "accentColor": "#B7DDC4",
      "mutedColor": "#D1E0D9"
    },
    "typography": {
      "fontFamily": "Inter",
      "headingFont": "Sora"
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
  },
  {
    "id": "galaxy",
    "name": "Galaxy",
    "category": "Signature",
    "colors": {
      "backgroundColor": "linear-gradient(180deg, #19162B 0%, #30233F 100%)",
      "textColor": "#FAF7FF",
      "cardColor": "rgba(255,255,255,0.09)",
      "buttonColor": "#D9CAE9",
      "buttonTextColor": "#2C213C",
      "accentColor": "#DCC8ED",
      "mutedColor": "#D3CADC"
    },
    "typography": {
      "fontFamily": "Inter",
      "headingFont": "Sora"
    },
    "styles": {
      "buttonStyle": "filled",
      "spacing": "comfortable",
      "shadowStyle": "soft",
      "buttonRadius": 22,
      "cardRadius": 24,
      "avatarBorder": 3,
      "iconStyle": "solid",
      "bgEffect": "stars"
    }
  },
  {
    "id": "glass",
    "name": "Glass",
    "category": "Signature",
    "colors": {
      "backgroundColor": "#1F2E34",
      "textColor": "#F6FAF9",
      "cardColor": "rgba(255,255,255,0.10)",
      "buttonColor": "rgba(255,255,255,0.18)",
      "buttonTextColor": "#F6FAF9",
      "accentColor": "#C5E2DA",
      "mutedColor": "#D1DEDB"
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
      "avatarBorder": 2,
      "iconStyle": "solid",
      "bgEffect": "none"
    }
  },
  {
    "id": "royal",
    "name": "Royal",
    "category": "Signature",
    "colors": {
      "backgroundColor": "#20233C",
      "textColor": "#F8F6F1",
      "cardColor": "#303652",
      "buttonColor": "#DFC99B",
      "buttonTextColor": "#322A20",
      "accentColor": "#E6D2A8",
      "mutedColor": "#D1CFD3"
    },
    "typography": {
      "fontFamily": "Inter",
      "headingFont": "Playfair Display"
    },
    "styles": {
      "buttonStyle": "filled",
      "spacing": "comfortable",
      "shadowStyle": "md",
      "buttonRadius": 14,
      "cardRadius": 20,
      "avatarBorder": 3,
      "iconStyle": "solid",
      "bgEffect": "none"
    }
  },
  {
    "id": "sunset",
    "name": "Sunset",
    "category": "Signature",
    "colors": {
      "backgroundColor": "linear-gradient(180deg, #FAF0E8 0%, #F1DED7 100%)",
      "textColor": "#492F2E",
      "cardColor": "#FFF9F4",
      "buttonColor": "#895348",
      "buttonTextColor": "#FFFFFF",
      "accentColor": "#895348",
      "mutedColor": "#755B57"
    },
    "typography": {
      "fontFamily": "Inter",
      "headingFont": "Outfit"
    },
    "styles": {
      "buttonStyle": "filled",
      "spacing": "comfortable",
      "shadowStyle": "soft",
      "buttonRadius": 24,
      "cardRadius": 26,
      "avatarBorder": 3,
      "iconStyle": "solid",
      "bgEffect": "none"
    }
  }
];
