/* =============================================================
   data/images.js — Verified Artifact Images
   Source: Metropolitan Museum of Art Open Access (Public Domain)
   All URLs tested and confirmed loading before inclusion.
   ============================================================= */

export const ARTIFACT_IMAGES = {
  sumerian:     { url: 'https://images.metmuseum.org/CRDImages/an/original/DP293243.jpg',       caption: 'Proto-Cuneiform Tablet · c.3100–2900 BCE · The Met' },
  babylonian:   { url: 'https://images.metmuseum.org/CRDImages/an/original/DT891.jpg',          caption: 'Panel with Striding Lion · Neo-Babylonian c.604–562 BCE · The Met' },
  canaanite:    { url: 'https://images.metmuseum.org/CRDImages/an/original/DP137934.jpg',       caption: 'Enthroned Deity · Canaanite c.14th–13th century BCE · The Met' },
  egyptian:     { url: 'https://images.metmuseum.org/CRDImages/eg/original/DP244339.jpg',       caption: 'Book of the Dead Papyrus · Chapters 100 & 129 · The Met' },
  osiris:       { url: 'https://images.metmuseum.org/CRDImages/eg/original/41.6.4_EGDP015853.jpg', caption: 'Osiris · Bronze · c.1070–664 BCE · The Met' },
  hebrew:       { url: 'https://images.metmuseum.org/CRDImages/is/original/DP251989.jpg',       caption: 'Seal with Hebrew Inscription · 10th–11th century · The Met' },
  zoroastrian:  { url: 'https://images.metmuseum.org/CRDImages/an/original/DP226593.jpg',       caption: 'Achaemenid Relief · c.358–338 BCE · The Met' },
  greek:        { url: 'https://images.metmuseum.org/CRDImages/gr/original/DP265183.jpg',       caption: 'Marble Head of Zeus Ammon · Roman c.120–160 CE · The Met' },
  hindu:        { url: 'https://images.metmuseum.org/CRDImages/as/original/DT5233.jpg',         caption: 'Brahma with Attendants · India · The Met' },
  hindu2:       { url: 'https://images.metmuseum.org/CRDImages/as/original/1978_253_F_sf.jpg',  caption: 'Shiva with Uma · India, Bihar · 10th century · The Met' },
  buddhist:     { url: 'https://images.metmuseum.org/CRDImages/as/original/DP-17101-002.jpg',   caption: 'Buddhist Sutra Calligraphy · 14th century · The Met' },
  taoist:       { url: 'https://images.metmuseum.org/CRDImages/as/original/DP153705.jpg',       caption: 'Night-Shining White · Chinese · c.750 CE · The Met' },
  shinto:       { url: 'https://images.metmuseum.org/CRDImages/as/original/DP-23231-001.jpg',   caption: 'Female Shinto Deity · Japan · c.11th–12th century · The Met' },
  norse:        { url: 'https://images.metmuseum.org/CRDImages/aa/original/DT758.jpg',          caption: 'Viking Sword · Scandinavian · The Met' },
  yoruba:       { url: 'https://images.metmuseum.org/CRDImages/ao/original/DP-30070-001.jpg',   caption: 'Equestrian Figure · Yoruba · 15th–19th century · The Met' },
  mesoamerican: { url: 'https://images.metmuseum.org/CRDImages/ao/original/DP-26146-001.jpg',   caption: 'Eagle Head Labret · Mexica (Aztec) · 1325–1521 CE · The Met' },
  andean:       { url: 'https://images.metmuseum.org/CRDImages/ao/original/DP-13440-014.jpg',   caption: 'Miniature Male Effigy · Inca · 1400–1535 CE · The Met' },
  native:       { url: 'https://images.metmuseum.org/CRDImages/mi/original/DP158912.jpg',       caption: 'Lakota Courting Flute · c.1850–1900 · The Met' },
};

/** Get image data by key, falls back to 'sumerian' */
export function getImage(key) {
  return ARTIFACT_IMAGES[key] ?? ARTIFACT_IMAGES.sumerian;
}
