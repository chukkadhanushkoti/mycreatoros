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
  },
  {
    "id": "quiet-gold",
    "name": "Quiet Gold",
    "category": "Premium",
    "colors": {
      "backgroundColor": "#F5F0E5",
      "textColor": "#302C21",
      "cardColor": "#F5F0E5",
      "buttonColor": "#80652C",
      "buttonTextColor": "#FFFFFF",
      "accentColor": "#80652C",
      "mutedColor": "#80652C"
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
    "id": "ink-studio",
    "name": "Ink Studio",
    "category": "Premium",
    "colors": {
      "backgroundColor": "#12161C",
      "textColor": "#EDF1F5",
      "cardColor": "#12161C",
      "buttonColor": "#ADC0D4",
      "buttonTextColor": "#FFFFFF",
      "accentColor": "#ADC0D4",
      "mutedColor": "#ADC0D4"
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
    "id": "olive-atelier",
    "name": "Olive Atelier",
    "category": "Premium",
    "colors": {
      "backgroundColor": "#ECEEE3",
      "textColor": "#263123",
      "cardColor": "#ECEEE3",
      "buttonColor": "#4D6041",
      "buttonTextColor": "#FFFFFF",
      "accentColor": "#4D6041",
      "mutedColor": "#4D6041"
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
    "id": "clay-house",
    "name": "Clay House",
    "category": "Premium",
    "colors": {
      "backgroundColor": "#F2E6DF",
      "textColor": "#372823",
      "cardColor": "#F2E6DF",
      "buttonColor": "#935D49",
      "buttonTextColor": "#FFFFFF",
      "accentColor": "#935D49",
      "mutedColor": "#935D49"
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
    "id": "blue-hour",
    "name": "Blue Hour",
    "category": "Premium",
    "colors": {
      "backgroundColor": "#182431",
      "textColor": "#E6EDF5",
      "cardColor": "#182431",
      "buttonColor": "#86A8C6",
      "buttonTextColor": "#FFFFFF",
      "accentColor": "#86A8C6",
      "mutedColor": "#86A8C6"
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
    "id": "studio-paper",
    "name": "Studio Paper",
    "minPlan": "pro",
    "category": "Curated",
    "colors": {
      "backgroundColor": "#F5F1E8",
      "textColor": "#292820",
      "cardColor": "#FFFFFF",
      "buttonColor": "#403B32",
      "buttonTextColor": "#403B32",
      "accentColor": "#81745C",
      "mutedColor": "#292820"
    },
    "typography": {
      "fontFamily": "Inter",
      "headingFont": "DM Serif Display"
    },
    "styles": {
      "buttonStyle": "outline",
      "spacing": "comfortable",
      "shadowStyle": "soft",
      "buttonRadius": 0,
      "cardRadius": 0,
      "avatarBorder": 2,
      "iconStyle": "outline",
      "bgEffect": "none"
    }
  },
  {
    "id": "sage-bubble",
    "name": "Sage Bubble",
    "minPlan": "pro",
    "category": "Curated",
    "colors": {
      "backgroundColor": "#E9F0E8",
      "textColor": "#243D32",
      "cardColor": "#F9FCF7",
      "buttonColor": "#355846",
      "buttonTextColor": "#FFFFFF",
      "accentColor": "#5A8467",
      "mutedColor": "#243D32"
    },
    "typography": {
      "fontFamily": "Figtree",
      "headingFont": "Fraunces"
    },
    "styles": {
      "buttonStyle": "filled",
      "spacing": "comfortable",
      "shadowStyle": "soft",
      "buttonRadius": 32,
      "cardRadius": 32,
      "avatarBorder": 2,
      "iconStyle": "outline",
      "bgEffect": "blobs"
    }
  },
  {
    "id": "cobalt-grid",
    "name": "Cobalt Grid",
    "minPlan": "max",
    "category": "Curated",
    "colors": {
      "backgroundColor": "#121E31",
      "textColor": "#E8EEF7",
      "cardColor": "#1D2D46",
      "buttonColor": "#D6E4F7",
      "buttonTextColor": "#162944",
      "accentColor": "#88ADD9",
      "mutedColor": "#E8EEF7"
    },
    "typography": {
      "fontFamily": "Inter",
      "headingFont": "Space Grotesk"
    },
    "styles": {
      "buttonStyle": "filled",
      "spacing": "comfortable",
      "shadowStyle": "soft",
      "buttonRadius": 4,
      "cardRadius": 4,
      "avatarBorder": 2,
      "iconStyle": "outline",
      "bgEffect": "grid"
    }
  },
  {
    "id": "rose-milk",
    "name": "Rose Milk",
    "minPlan": "max",
    "category": "Curated",
    "colors": {
      "backgroundColor": "#F4E9EA",
      "textColor": "#4A343C",
      "cardColor": "#FFFAFA",
      "buttonColor": "#825C69",
      "buttonTextColor": "#FFFFFF",
      "accentColor": "#A77C89",
      "mutedColor": "#4A343C"
    },
    "typography": {
      "fontFamily": "DM Sans",
      "headingFont": "Fraunces"
    },
    "styles": {
      "buttonStyle": "filled",
      "spacing": "comfortable",
      "shadowStyle": "soft",
      "buttonRadius": 32,
      "cardRadius": 32,
      "avatarBorder": 2,
      "iconStyle": "outline",
      "bgEffect": "none"
    }
  },
  {
    "id": "graphite-editorial",
    "name": "Graphite Editorial",
    "minPlan": "max",
    "category": "Curated",
    "colors": {
      "backgroundColor": "#ECECEC",
      "textColor": "#222526",
      "cardColor": "#FFFFFF",
      "buttonColor": "#303436",
      "buttonTextColor": "#FFFFFF",
      "accentColor": "#5C656A",
      "mutedColor": "#222526"
    },
    "typography": {
      "fontFamily": "Inter",
      "headingFont": "Space Grotesk"
    },
    "styles": {
      "buttonStyle": "filled",
      "spacing": "comfortable",
      "shadowStyle": "soft",
      "buttonRadius": 0,
      "cardRadius": 0,
      "avatarBorder": 2,
      "iconStyle": "outline",
      "bgEffect": "none"
    }
  },
  {
    "id": "champagne-atelier",
    "name": "Champagne Atelier",
    "minPlan": "ultra",
    "category": "Curated",
    "colors": {
      "backgroundColor": "#F1EBDF",
      "textColor": "#423B2E",
      "cardColor": "#FAF8F0",
      "buttonColor": "#65593E",
      "buttonTextColor": "#65593E",
      "accentColor": "#9B885E",
      "mutedColor": "#423B2E"
    },
    "typography": {
      "fontFamily": "DM Sans",
      "headingFont": "DM Serif Display"
    },
    "styles": {
      "buttonStyle": "outline",
      "spacing": "comfortable",
      "shadowStyle": "soft",
      "buttonRadius": 8,
      "cardRadius": 8,
      "avatarBorder": 3,
      "iconStyle": "outline",
      "bgEffect": "stars"
    }
  },
  {
    "id": "orbit-bubbles",
    "name": "Orbit Bubbles",
    "minPlan": "ultra",
    "category": "Curated",
    "colors": {
      "backgroundColor": "#151D29",
      "textColor": "#E8EEF5",
      "cardColor": "#202D40",
      "buttonColor": "#D8E7F1",
      "buttonTextColor": "#182B3A",
      "accentColor": "#85A7BB",
      "mutedColor": "#E8EEF5"
    },
    "typography": {
      "fontFamily": "Inter",
      "headingFont": "Space Grotesk"
    },
    "styles": {
      "buttonStyle": "filled",
      "spacing": "comfortable",
      "shadowStyle": "soft",
      "buttonRadius": 32,
      "cardRadius": 32,
      "avatarBorder": 3,
      "iconStyle": "outline",
      "bgEffect": "bubbles"
    }
  },
  {
    "id": "porcelain-line",
    "name": "Porcelain Line",
    "minPlan": "ultra",
    "category": "Curated",
    "colors": {
      "backgroundColor": "#F5F6F3",
      "textColor": "#293733",
      "cardColor": "#FFFFFF",
      "buttonColor": "#365B4B",
      "buttonTextColor": "#365B4B",
      "accentColor": "#638474",
      "mutedColor": "#293733"
    },
    "typography": {
      "fontFamily": "Figtree",
      "headingFont": "Fraunces"
    },
    "styles": {
      "buttonStyle": "outline",
      "spacing": "comfortable",
      "shadowStyle": "soft",
      "buttonRadius": 0,
      "cardRadius": 0,
      "avatarBorder": 3,
      "iconStyle": "outline",
      "bgEffect": "none"
    }
  },
  {
    "id": "journal-sage",
    "name": "Sage Journal",
    "minPlan": "max",
    "category": "Signature layouts",
    "colors": {
      "backgroundColor": "#F1F2E9",
      "textColor": "#283F35",
      "cardColor": "#FFFFFF",
      "buttonColor": "#345749",
      "buttonTextColor": "#FFFFFF",
      "accentColor": "#789580",
      "mutedColor": "#61766A"
    },
    "typography": {
      "fontFamily": "Inter",
      "headingFont": "DM Serif Display"
    },
    "styles": {
      "layout": "editorial",
      "buttonStyle": "filled",
      "spacing": "comfortable",
      "shadowStyle": "soft",
      "buttonRadius": 0,
      "cardRadius": 0,
      "avatarBorder": 1,
      "iconStyle": "outline",
      "bgEffect": "none"
    }
  },
  {
    "id": "terracotta-grid",
    "name": "Terracotta Grid",
    "minPlan": "max",
    "category": "Signature layouts",
    "colors": {
      "backgroundColor": "#F5EAE2",
      "textColor": "#4D332A",
      "cardColor": "#FBEFDF",
      "buttonColor": "#DFC1AD",
      "buttonTextColor": "#442E26",
      "accentColor": "#AD765B",
      "mutedColor": "#80695C"
    },
    "typography": {
      "fontFamily": "Inter",
      "headingFont": "Space Grotesk"
    },
    "styles": {
      "layout": "bento",
      "buttonStyle": "filled",
      "spacing": "comfortable",
      "shadowStyle": "soft",
      "buttonRadius": 18,
      "cardRadius": 18,
      "avatarBorder": 1,
      "iconStyle": "outline",
      "bgEffect": "none"
    }
  },
  {
    "id": "cobalt-studio",
    "name": "Cobalt Studio",
    "minPlan": "max",
    "category": "Signature layouts",
    "colors": {
      "backgroundColor": "#121D2D",
      "textColor": "#EBF1F7",
      "cardColor": "#1F3046",
      "buttonColor": "#C4DAEF",
      "buttonTextColor": "#15283B",
      "accentColor": "#779BBD",
      "mutedColor": "#A7BACD"
    },
    "typography": {
      "fontFamily": "Inter",
      "headingFont": "Space Grotesk"
    },
    "styles": {
      "layout": "spotlight",
      "buttonStyle": "filled",
      "spacing": "comfortable",
      "shadowStyle": "soft",
      "buttonRadius": 8,
      "cardRadius": 8,
      "avatarBorder": 1,
      "iconStyle": "outline",
      "bgEffect": "none"
    }
  },
  {
    "id": "ivory-editorial",
    "name": "Ivory Editorial",
    "minPlan": "ultra",
    "category": "Signature layouts",
    "colors": {
      "backgroundColor": "#F5F1E9",
      "textColor": "#302B26",
      "cardColor": "#FFFDF7",
      "buttonColor": "#3B332D",
      "buttonTextColor": "#F8F3E9",
      "accentColor": "#9F896C",
      "mutedColor": "#80776B"
    },
    "typography": {
      "fontFamily": "Inter",
      "headingFont": "DM Serif Display"
    },
    "styles": {
      "layout": "editorial",
      "buttonStyle": "filled",
      "spacing": "comfortable",
      "shadowStyle": "soft",
      "buttonRadius": 0,
      "cardRadius": 0,
      "avatarBorder": 3,
      "iconStyle": "outline",
      "bgEffect": "none"
    }
  },
  {
    "id": "midnight-gallery",
    "name": "Midnight Gallery",
    "minPlan": "ultra",
    "category": "Signature layouts",
    "colors": {
      "backgroundColor": "#151725",
      "textColor": "#F3EFF8",
      "cardColor": "#25263A",
      "buttonColor": "#DDD1EE",
      "buttonTextColor": "#29223D",
      "accentColor": "#B59ACC",
      "mutedColor": "#B1A8C5"
    },
    "typography": {
      "fontFamily": "Inter",
      "headingFont": "Space Grotesk"
    },
    "styles": {
      "layout": "bento",
      "buttonStyle": "filled",
      "spacing": "comfortable",
      "shadowStyle": "soft",
      "buttonRadius": 28,
      "cardRadius": 28,
      "avatarBorder": 3,
      "iconStyle": "outline",
      "bgEffect": "stars"
    }
  },
  {
    "id": "champagne-spotlight",
    "name": "Champagne Spotlight",
    "minPlan": "ultra",
    "category": "Signature layouts",
    "colors": {
      "backgroundColor": "#24201C",
      "textColor": "#F5ECDF",
      "cardColor": "#36302A",
      "buttonColor": "#E2CCAB",
      "buttonTextColor": "#33291E",
      "accentColor": "#C1A27C",
      "mutedColor": "#B9AA98"
    },
    "typography": {
      "fontFamily": "Inter",
      "headingFont": "Space Grotesk"
    },
    "styles": {
      "layout": "spotlight",
      "buttonStyle": "filled",
      "spacing": "comfortable",
      "shadowStyle": "soft",
      "buttonRadius": 4,
      "cardRadius": 4,
      "avatarBorder": 3,
      "iconStyle": "outline",
      "bgEffect": "none"
    }
  },
  {
    "id": "moss-portfolio",
    "name": "Moss Portfolio",
    "minPlan": "ultra",
    "category": "Signature layouts",
    "colors": {
      "backgroundColor": "#142724",
      "textColor": "#EEF5EE",
      "cardColor": "#203D36",
      "buttonColor": "#B6D7C2",
      "buttonTextColor": "#17362B",
      "accentColor": "#89B49B",
      "mutedColor": "#A3C0B1"
    },
    "typography": {
      "fontFamily": "Inter",
      "headingFont": "Space Grotesk"
    },
    "styles": {
      "layout": "bento",
      "buttonStyle": "filled",
      "spacing": "comfortable",
      "shadowStyle": "soft",
      "buttonRadius": 4,
      "cardRadius": 4,
      "avatarBorder": 3,
      "iconStyle": "outline",
      "bgEffect": "none"
    }
  },
  {
    "id": "rose-journal",
    "name": "Rose Journal",
    "minPlan": "ultra",
    "category": "Signature layouts",
    "colors": {
      "backgroundColor": "#F6EFF0",
      "textColor": "#49333F",
      "cardColor": "#FFF9FA",
      "buttonColor": "#684351",
      "buttonTextColor": "#FFF1F4",
      "accentColor": "#AD7D8E",
      "mutedColor": "#8E7480"
    },
    "typography": {
      "fontFamily": "Inter",
      "headingFont": "DM Serif Display"
    },
    "styles": {
      "layout": "editorial",
      "buttonStyle": "filled",
      "spacing": "comfortable",
      "shadowStyle": "soft",
      "buttonRadius": 18,
      "cardRadius": 18,
      "avatarBorder": 3,
      "iconStyle": "outline",
      "bgEffect": "none"
    }
  },
  {
    "id": "pearl-orbit",
    "name": "Pearl Orbit",
    "minPlan": "ultra",
    "category": "Signature",
    "colors": {
      "backgroundColor": "#F3F0EC",
      "textColor": "#24323D",
      "cardColor": "#F3F0EC",
      "buttonColor": "#466779",
      "buttonTextColor": "#FFFFFF",
      "accentColor": "#466779",
      "mutedColor": "#466779"
    },
    "typography": {
      "fontFamily": "Inter",
      "headingFont": "Inter"
    },
    "styles": {
      "layout": "spotlight",
      "buttonStyle": "glass",
      "spacing": "comfortable",
      "shadowStyle": "soft",
      "buttonRadius": 28,
      "cardRadius": 28,
      "avatarBorder": 3,
      "iconStyle": "outline",
      "bgEffect": "blobs"
    },
    "enabled": true
  },
  {
    "id": "graphite-grid",
    "name": "Graphite Grid",
    "minPlan": "max",
    "category": "Signature",
    "colors": {
      "backgroundColor": "#151C24",
      "textColor": "#E8EEF4",
      "cardColor": "#151C24",
      "buttonColor": "#416882",
      "buttonTextColor": "#FFFFFF",
      "accentColor": "#416882",
      "mutedColor": "#416882"
    },
    "typography": {
      "fontFamily": "Space Grotesk",
      "headingFont": "Space Grotesk"
    },
    "styles": {
      "layout": "bento",
      "buttonStyle": "filled",
      "spacing": "comfortable",
      "shadowStyle": "soft",
      "buttonRadius": 6,
      "cardRadius": 6,
      "avatarBorder": 3,
      "iconStyle": "outline",
      "bgEffect": "grid"
    },
    "enabled": true
  },
  {
    "id": "linen-journal",
    "name": "Linen Journal",
    "minPlan": "max",
    "category": "Signature",
    "colors": {
      "backgroundColor": "#F5EFE5",
      "textColor": "#3A322C",
      "cardColor": "#F5EFE5",
      "buttonColor": "#78604D",
      "buttonTextColor": "#FFFFFF",
      "accentColor": "#78604D",
      "mutedColor": "#78604D"
    },
    "typography": {
      "fontFamily": "Inter",
      "headingFont": "Inter"
    },
    "styles": {
      "layout": "editorial",
      "buttonStyle": "filled",
      "spacing": "comfortable",
      "shadowStyle": "soft",
      "buttonRadius": 4,
      "cardRadius": 4,
      "avatarBorder": 3,
      "iconStyle": "outline",
      "bgEffect": "none"
    },
    "enabled": true
  },
  {
    "id": "violet-night",
    "name": "Violet Night",
    "minPlan": "ultra",
    "category": "Signature",
    "colors": {
      "backgroundColor": "#171325",
      "textColor": "#F1EBFF",
      "cardColor": "#171325",
      "buttonColor": "#7D5DAD",
      "buttonTextColor": "#FFFFFF",
      "accentColor": "#7D5DAD",
      "mutedColor": "#7D5DAD"
    },
    "typography": {
      "fontFamily": "Inter",
      "headingFont": "Inter"
    },
    "styles": {
      "layout": "spotlight",
      "buttonStyle": "filled",
      "spacing": "comfortable",
      "shadowStyle": "soft",
      "buttonRadius": 24,
      "cardRadius": 24,
      "avatarBorder": 3,
      "iconStyle": "outline",
      "bgEffect": "stars"
    },
    "enabled": true
  },
  {
    "id": "mint-gallery",
    "name": "Mint Gallery",
    "minPlan": "ultra",
    "category": "Signature",
    "colors": {
      "backgroundColor": "#EEF5F1",
      "textColor": "#193F36",
      "cardColor": "#EEF5F1",
      "buttonColor": "#3E7966",
      "buttonTextColor": "#FFFFFF",
      "accentColor": "#3E7966",
      "mutedColor": "#3E7966"
    },
    "typography": {
      "fontFamily": "Inter",
      "headingFont": "Inter"
    },
    "styles": {
      "layout": "bento",
      "buttonStyle": "glass",
      "spacing": "comfortable",
      "shadowStyle": "soft",
      "buttonRadius": 22,
      "cardRadius": 22,
      "avatarBorder": 3,
      "iconStyle": "outline",
      "bgEffect": "blobs"
    },
    "enabled": true
  },
  {
    "id": "copper-notes",
    "name": "Copper Notes",
    "minPlan": "max",
    "category": "Signature",
    "colors": {
      "backgroundColor": "#241C1A",
      "textColor": "#F8EDE4",
      "cardColor": "#241C1A",
      "buttonColor": "#986B52",
      "buttonTextColor": "#FFFFFF",
      "accentColor": "#986B52",
      "mutedColor": "#986B52"
    },
    "typography": {
      "fontFamily": "Inter",
      "headingFont": "Inter"
    },
    "styles": {
      "layout": "editorial",
      "buttonStyle": "filled",
      "spacing": "comfortable",
      "shadowStyle": "soft",
      "buttonRadius": 10,
      "cardRadius": 10,
      "avatarBorder": 3,
      "iconStyle": "outline",
      "bgEffect": "grid"
    },
    "enabled": true
  }
];
